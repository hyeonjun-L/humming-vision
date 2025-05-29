import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { ProductModel } from './product.entity';
import { CategoriesEnum, CategoryRelationMap } from './const/categories.const';
import { ProductImagesService } from './image/images.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CameraService } from './camera/camera.service';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { LensService } from './lens/lens.service';
import { SoftwareService } from './software/software.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productImagesService: ProductImagesService,
    private readonly cameraService: CameraService,
    private readonly frameGrabberService: FrameGrabberService,
    private readonly lensService: LensService,
    private readonly softwareService: SoftwareService,
  ) {}

  private async handleCategoryUpdate(
    category: CategoriesEnum,
    updateProductDto: UpdateProductDto,
    id: number,
    qr: QueryRunner,
  ) {
    switch (category) {
      case CategoriesEnum.CAMERA:
        if (updateProductDto.camera) {
          await this.cameraService.updateCamera(
            updateProductDto.camera,
            id,
            qr,
          );
        }
        break;
      case CategoriesEnum.FRAMEGRABBER:
        if (updateProductDto.frameGrabber) {
          await this.frameGrabberService.updateFrameGrabber(
            updateProductDto.frameGrabber,
            id,
            qr,
          );
        }
        break;
      case CategoriesEnum.LENS:
        if (updateProductDto.lens) {
          await this.lensService.updateLens(updateProductDto.lens, id, qr);
        }
        break;
      case CategoriesEnum.SOFTWARE:
        if (updateProductDto.software) {
          await this.softwareService.updateSoftware(
            updateProductDto.software,
            id,
            qr,
          );
        }
        break;
    }
  }

  private async handleCategoryCreate(
    category: CategoriesEnum,
    createProductDto: CreateProductDto,
    savedProduct: ProductModel,
    qr: QueryRunner,
  ) {
    switch (category) {
      case CategoriesEnum.CAMERA:
        if (createProductDto.camera) {
          await this.cameraService.createCamera(
            createProductDto.camera,
            savedProduct,
            qr,
          );
        }
        break;
      case CategoriesEnum.FRAMEGRABBER:
        if (createProductDto.frameGrabber) {
          await this.frameGrabberService.createFrameGrabber(
            createProductDto.frameGrabber,
            savedProduct,
            qr,
          );
        }
        break;
      case CategoriesEnum.LENS:
        if (createProductDto.lens) {
          await this.lensService.createLens(
            createProductDto.lens,
            savedProduct,
            qr,
          );
        }
        break;
      case CategoriesEnum.SOFTWARE:
        if (createProductDto.software) {
          await this.softwareService.createSoftware(
            createProductDto.software,
            savedProduct,
            qr,
          );
        }
        break;
    }
  }

  async updateProduct(
    id: number,
    category: CategoriesEnum,
    updateProductDto: UpdateProductDto,
    qr: QueryRunner,
  ) {
    const productRepository =
      qr.manager.getRepository<ProductModel>(ProductModel);

    const product = await productRepository.findOne({
      where: { id },
      relations: {
        [CategoryRelationMap[category]]: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = productRepository.merge(product, updateProductDto);
    const savedProduct = await productRepository.save(updatedProduct);

    if (updateProductDto.images && updateProductDto.images.length > 0) {
      await Promise.all(
        updateProductDto.images.map((image) =>
          this.productImagesService.updateImage(image, id, qr),
        ),
      );
    }

    await this.handleCategoryUpdate(category, updateProductDto, id, qr);

    return productRepository.findOne({
      where: { id: savedProduct.id },
      relations: {
        [CategoryRelationMap[category]]: true,
        images: true,
      },
    });
  }

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

    await this.handleCategoryCreate(
      createProductDto.categories,
      createProductDto,
      savedProduct,
      qr,
    );

    return productRepository.findOne({
      where: { id: savedProduct.id },
      relations: {
        [CategoryRelationMap[createProductDto.categories]]: true,
        images: true,
      },
    });
  }
}
