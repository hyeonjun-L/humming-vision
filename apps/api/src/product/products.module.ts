import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';
import { ProductImagesService } from './image/images.service';
import { ImageModel } from './image/image.entity';
import { CameraService } from './camera/camera.service';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { LensService } from './lens/lens.service';
import { SoftwareService } from './software/software.service';
import { CommonService } from 'src/common/common.service';
import { LightService } from './light/light.service';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, ImageModel])],
  controllers: [ProductsController],
  providers: [
    LightService,
    CameraService,
    FrameGrabberService,
    ProductsService,
    IsUniqueFieldConstraint,
    ProductImagesService,
    LensService,
    SoftwareService,
    CommonService,
  ],
})
export class ProductsModule {}
