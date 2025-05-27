import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { LensDto } from './dto/lens.dto';
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
}
