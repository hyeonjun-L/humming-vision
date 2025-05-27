import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ProductModel } from './product.entity';
import { CatagoriesEnum } from './const/categories.const';
import { ProductImagesService } from './image/images.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CameraService } from './camera/camera.service';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productImagesService: ProductImagesService,
    private readonly cameraService: CameraService,
    private readonly frameGrabberService: FrameGrabberService,
  ) {}

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
          await this.cameraService.createCamera(
            createProductDto.camera,
            savedProduct,
            qr,
          );
        }
        break;
      case CatagoriesEnum.FRAMEGRABBER:
        if (createProductDto.frameGrabber) {
          await this.frameGrabberService.createFrameGrabber(
            createProductDto.frameGrabber,
            savedProduct,
            qr,
          );
        }
        break;
    }

    return productRepository.findOne({
      where: { id: savedProduct.id },
      relations: {
        [createProductDto.categories.toLocaleLowerCase()]: true,
        images: true,
      },
    });
  }
}
