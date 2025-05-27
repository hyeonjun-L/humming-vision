import { Injectable } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { CameraModel } from './camera.entity';

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

  async updateCamera(cameraDto: CreateCameraDto, id: number, qr: QueryRunner) {
    const cameraRepo = qr.manager.getRepository(CameraModel);

    const camera = await cameraRepo.findOne({ where: { product: { id } } });
    if (!camera) {
      throw new Error('Camera not found');
    }

    const updatedCamera = cameraRepo.merge(camera, cameraDto);
    return cameraRepo.save(updatedCamera);
  }
}
