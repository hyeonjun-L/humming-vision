import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { CameraModel } from './camera.entity';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { CreateCameraDto } from './dto/create-camera.dto';

@Injectable()
export class CameraService {
  constructor() {}

  async createCamera(
    cameraDto: CreateCameraDto,
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

  async updateCamera(cameraDto: UpdateCameraDto, id: number, qr: QueryRunner) {
    const cameraRepo = qr.manager.getRepository(CameraModel);

    const camera = await cameraRepo.findOne({
      where: { id: cameraDto.id, product: { id } },
    });
    if (!camera) {
      throw new NotFoundException('Camera not found');
    }

    const updatedCamera = cameraRepo.merge(camera, cameraDto);
    return cameraRepo.save(updatedCamera);
  }
}
