import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './entity/product.entity';
import { CameraModel } from './entity/camera.entity';
import { IsUniqueFieldConstraint } from 'src/common/validator/is-unique-field.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel, CameraModel])],
  controllers: [ProductsController],
  providers: [ProductsService, IsUniqueFieldConstraint],
})
export class ProductsModule {}
