import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './product.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';
import { ProductImagesService } from './image/images.service';
import { AwsService } from 'src/common/aws/aws.service';
import { ImageModel } from './image/image.entity';
import { IsUniqueImageOrderConstraint } from './image/validator/is-unique-image-order.validator';
import { CameraModel } from './camera/camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, CameraModel, ImageModel])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    IsUniqueFieldConstraint,
    ProductImagesService,
    AwsService,
    IsUniqueImageOrderConstraint,
  ],
})
export class ProductsModule {}
