import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { LensDto } from './dto/create-lens.dto';
import { LensModel } from './lens.entity';
@Injectable()
export class LensService {
  constructor() {}

  async createLens(lensDto: LensDto, product: ProductModel, qr: QueryRunner) {
    const lensRepo = qr.manager.getRepository(LensModel);

    const lens = lensRepo.create({
      ...lensDto,
      product,
    });

    return lensRepo.save(lens);
  }

  async updateLens(lensDto: LensDto, id: number, qr: QueryRunner) {
    const lensRepo = qr.manager.getRepository(LensModel);

    const lens = await lensRepo.findOne({
      where: { product: { id } },
    });
    if (!lens) {
      throw new Error('Lens not found');
    }

    const updatedLens = lensRepo.merge(lens, lensDto);
    return lensRepo.save(updatedLens);
  }
}
