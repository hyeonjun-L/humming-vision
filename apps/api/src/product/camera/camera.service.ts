import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CameraModel } from './camera.entity';
import { AbstractProductService } from '../service/abstract-product.service';
import { ProductImagesService } from '../image/images.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { BaseCameraDto } from './dto/base-camera.dto';

@Injectable()
export class CameraService extends AbstractProductService<
  CreateCameraProductDto,
  UpdateCameraProductDto
> {
  constructor(
    imagesService: ProductImagesService,
    @InjectRepository(ProductModel)
    repo: Repository<ProductModel>,
  ) {
    super(repo, imagesService);
  }

  protected async createCategorySpecific(
    dto: CreateCameraProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.createCamera(dto.camera, product, qr);
  }

  protected async updateCategorySpecific(
    dto: UpdateCameraProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.updateCamera(dto, product.id, qr);
  }

  async createCamera(
    cameraDto: BaseCameraDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const cameraRepo = qr.manager.getRepository(CameraModel);

    const camera = cameraRepo.create({
      ...cameraDto,
      product,
    });

    return cameraRepo.save(camera);
  }

  async updateCamera(
    cameraDto: UpdateCameraProductDto,
    productId: number,
    qr: QueryRunner,
  ) {
    const cameraRepo = qr.manager.getRepository(CameraModel);

    const camera = await cameraRepo.findOne({
      where: { product: { id: productId } },
    });
    if (!camera) {
      throw new NotFoundException('Camera not found');
    }

    const updatedCamera = cameraRepo.merge(camera, cameraDto);
    return cameraRepo.save(updatedCamera);
  }
}
