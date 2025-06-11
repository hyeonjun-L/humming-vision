import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { LightModel } from './light.entity';
import { CreateLightProductDto } from './dto/create-light-product.dto';

@Injectable()
export class LightService {
  constructor() {}

  async createLight(
    lightDto: CreateLightProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const lightRepo = qr.manager.getRepository(LightModel);

    const light = lightRepo.create({
      ...lightDto,
      product,
    });

    return lightRepo.save(light);
  }
}
