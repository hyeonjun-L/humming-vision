import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { LightModel } from './light.entity';
import { CreateLightDto } from './dto/create-light.dto';
import { UpdateLightDto } from './dto/update-light.dto';

@Injectable()
export class LightService {
  constructor() {}

  async createLight(
    lightDto: CreateLightDto,
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

  async updateLight(lightDto: UpdateLightDto, id: number, qr: QueryRunner) {
    const lightRepo = qr.manager.getRepository(LightModel);

    const ligth = await lightRepo.findOne({
      where: { id: lightDto.id, product: { id } },
    });

    if (!ligth) {
      throw new NotFoundException('Light not found');
    }

    const updatedLens = lightRepo.merge(ligth, lightDto);
    return lightRepo.save(updatedLens);
  }
}
