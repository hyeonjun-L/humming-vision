import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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

@Module({
  imports: [
    ProductsModule,
    AdminModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
  ],
})
export class AppModule {}
