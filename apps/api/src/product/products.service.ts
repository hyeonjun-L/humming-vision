import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ProductModel } from './product.entity';
import { CatagoriesEnum } from './const/categories.const';
import { ProductImagesService } from './image/images.service';
import { CameraModel } from './camera/camera.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productImagesService: ProductImagesService) {}

  async createProduct(createProductDto: CreateProductDto, qr: QueryRunner) {
    const productRepository =
      qr.manager.getRepository<ProductModel>(ProductModel);

    const product = productRepository.create(createProductDto);
    const savedProduct = await productRepository.save(product);

    if (createProductDto.images && createProductDto.images.length > 0) {
      await Promise.all(
        createProductDto.images.map((image) =>
          this.productImagesService.createImage(image, savedProduct, qr),
        ),
      );
    }

    switch (createProductDto.categories) {
      case CatagoriesEnum.CAMERA:
        if (createProductDto.camera) {
          const cameraRepo = qr.manager.getRepository<CameraModel>(CameraModel);

          const camera = cameraRepo.create({
            ...createProductDto.camera,
            product: savedProduct,
          });
          await cameraRepo.save(camera);
        }
        break;
      // case CatagoriesEnum.LENS:
    }

    return savedProduct;
  }
}
