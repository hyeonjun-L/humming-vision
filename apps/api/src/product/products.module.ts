import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';
import { ProductImagesService } from './image/images.service';
import { ImageModel } from './image/image.entity';
import { CameraModel } from './camera/camera.entity';
import { CameraService } from './camera/camera.service';
import { FrameGrabberModel } from './frame-grabber/frame-grabber.entity';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { LensService } from './lens/lens.service';
import { SoftwareService } from './software/software.service';
import { IsValidImageOrderGloballyConstraint } from './validator/is-unique-image-order-globally.validator';

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
    IsValidImageOrderGloballyConstraint,
    LensService,
    SoftwareService,
  ],
})
export class ProductsModule {}
