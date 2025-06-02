import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { CreateLensDto } from './dto/create-lens.dto';
import { LensModel } from './lens.entity';
import { UpdateLensDto } from './dto/update-lens.dto';
@Injectable()
export class LensService {
  constructor() {}

  async createLens(
    lensDto: CreateLensDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const lensRepo = qr.manager.getRepository(LensModel);

    const lens = lensRepo.create({
      ...lensDto,
      product,
    });

    return lensRepo.save(lens);
  }

  async updateLens(lensDto: UpdateLensDto, id: number, qr: QueryRunner) {
    const lensRepo = qr.manager.getRepository(LensModel);

    const lens = await lensRepo.findOne({
      where: { id: lensDto.id, product: { id } },
    });
    if (!lens) {
      throw new NotFoundException('Lens not found');
    }

    const updatedLens = lensRepo.merge(lens, lensDto);
    return lensRepo.save(updatedLens);
  }
}
