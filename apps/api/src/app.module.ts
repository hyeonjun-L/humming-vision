import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModel } from './admin/entity/admin.entity';
import { LogModel } from './admin/entity/log.entity';
import { SessionModel } from './admin/entity/session.entity';
import { ContactModel } from './contact/entity/contact.entity';
import { ProductModel } from './product/entity/product.entity';
import { ImageModel } from './common/entity/image.entity';
import { CameraModel } from './product/entity/camera.entity';
import { LensModel } from './product/entity/lens.entity';
import { SoftwareModel } from './product/entity/software.entity';
import { FrameGrabberModel } from './product/entity/frame-grabber.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from './common/const/env-kets.const';

@Module({
  imports: [
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
