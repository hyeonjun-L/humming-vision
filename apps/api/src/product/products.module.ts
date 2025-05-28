import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';
import { ProductImagesService } from './image/images.service';
import { AwsService } from 'src/common/aws/aws.service';
import { ImageModel } from './image/image.entity';
import { IsValidImageOrderGloballyConstraint } from './image/validator/is-unique-image-order-globally.validator';
import { CameraModel } from './camera/camera.entity';
import { CameraService } from './camera/camera.service';
import { FrameGrabberModel } from './frame-grabber/frame-grabber.entity';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { LensService } from './lens/lens.service';
import { SoftwareService } from './software/software.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductModel,
      CameraModel,
      ImageModel,
      FrameGrabberModel,
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    CameraService,
    FrameGrabberService,
    ProductsService,
    IsUniqueFieldConstraint,
    ProductImagesService,
    AwsService,
    IsValidImageOrderGloballyConstraint,
    LensService,
    SoftwareService,
  ],
})
export class ProductsModule {}
