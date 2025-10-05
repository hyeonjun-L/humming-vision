import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModel } from './admin/entity/admin.entity';
import { LogModel } from './admin/entity/log.entity';
import { SessionModel } from './admin/entity/session.entity';
import { ContactModel } from './contact/entity/contact.entity';
import { ProductModel } from './product/product.entity';
import { LensModel } from './product/lens/lens.entity';
import { FrameGrabberModel } from './product/frame-grabber/frame-grabber.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
  ENV_SES_SMTP_HOST_KEY,
  ENV_SES_SMTP_PASS_KEY,
  ENV_SES_SMTP_PORT_KEY,
  ENV_SES_SMTP_USER_KEY,
  NODE_ENV_KEY,
} from './common/const/env-kets.const';
import { ProductsModule } from './product/products.module';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './admin/guard/bearer-token.guard';
import { RolesGuard } from './admin/guard/roles.guard';
import { CommonModule } from './common/common.module';
import { ImageModel } from './product/image/image.entity';
import { CameraModel } from './product/camera/camera.entity';
import { SoftwareModel } from './product/software/software.entity';
import * as fs from 'fs';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { LogMiddleware } from './common/middleware/log.middleware';
import { LightModel } from './product/light/light.entity';
import { CleanupModule } from './admin/cleanup/cleanup.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CleanupModule,
    ProductsModule,
    AdminModule,
    CommonModule,
    ContactModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 40,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: 300000,
      max: 100,
    }),
    TypeOrmModule.forFeature([LogModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: parseInt(process.env[ENV_DB_PORT_KEY] ?? '5432', 10),
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [
        AdminModel,
        LogModel,
        SessionModel,
        ContactModel,
        ProductModel,
        ImageModel,
        CameraModel,
        LensModel,
        LightModel,
        SoftwareModel,
        FrameGrabberModel,
      ],
      synchronize: process.env.NODE_ENV === 'development',
      ssl:
        process.env[NODE_ENV_KEY] === 'development'
          ? { rejectUnauthorized: false }
          : {
              ca: fs.readFileSync(__dirname + '/global-bundle.pem').toString(),
            },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env[ENV_SES_SMTP_HOST_KEY],
        port: parseInt(process.env[ENV_SES_SMTP_PORT_KEY] ?? '587', 10),
        secure: false,
        auth: {
          user: process.env[ENV_SES_SMTP_USER_KEY],
          pass: process.env[ENV_SES_SMTP_PASS_KEY],
        },
      },
      defaults: {
        from: '"HummingVision" <no-reply@hummingvision.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
