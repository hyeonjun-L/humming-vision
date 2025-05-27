import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (process.env.NODE_ENV === 'production') {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true,
      exceptionFactory: (errors) => {
        const allErrors = errors.flatMap((error) => extractErrors(error));

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: allErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

function extractErrors(
  error: ValidationError,
  parentPath = '',
): { field: string; message: string }[] {
  const fieldPath = parentPath
    ? `${parentPath}.${error.property}`
    : error.property;

  const messages: { field: string; message: string }[] = [];

  if (error.constraints) {
    messages.push({
      field: fieldPath,
      message: Object.values(error.constraints).join(', '),
    });
  }

  if (error.children && error.children.length > 0) {
    error.children.forEach((childError) => {
      messages.push(...extractErrors(childError, fieldPath));
    });
  }

  return messages;
}
