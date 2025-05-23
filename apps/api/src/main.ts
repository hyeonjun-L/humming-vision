import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  if (process.env.NODE_ENV === 'production') {
    console.log('NODE_ENV is production');
    await AppDataSource.initialize()
      .then(() => console.log('DataSource initialized'))
      .then(() => AppDataSource.runMigrations())
      .then(() => console.log('Migrations executed'))
      .catch((err) => console.error('Migration error:', err));
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints ?? {}).join(', '),
        }));

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
