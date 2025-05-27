import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './entity/product.entity';
import { CameraModel } from './entity/camera.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';
import { ProductImagesService } from './image/images.service';
import { AwsService } from 'src/common/aws/aws.service';
import { ImageModel } from './entity/image.entity';
import { ImagesController } from './image/images.controller';
import { IsUniqueImageOrderConstraint } from './validator/is-unique-image-order.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, CameraModel, ImageModel])],
  controllers: [ProductsController, ImagesController],
  providers: [
    ProductsService,
    IsUniqueFieldConstraint,
    ProductImagesService,
    AwsService,
    IsUniqueImageOrderConstraint,
  ],
})
export class ProductsModule {}
