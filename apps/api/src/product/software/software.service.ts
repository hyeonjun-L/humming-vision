import { Injectable } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { SoftwareDto } from './dto/create-software';
import { SoftwareModel } from './software.entity';

@Injectable()
export class SoftwareService {
  constructor() {}

  async createSoftware(
    softwareDto: SoftwareDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const softwareRepo = qr.manager.getRepository(SoftwareModel);

    const software = softwareRepo.create({
      ...softwareDto,
      product,
    });

    return softwareRepo.save(software);
  }

  async updateSoftware(softwareDto: SoftwareDto, id: number, qr: QueryRunner) {
    const softwareRepo = qr.manager.getRepository(SoftwareModel);

    const software = await softwareRepo.findOne({
      where: { product: { id } },
    });
    if (!software) {
      throw new Error('Software not found');
    }
    const updatedSoftware = softwareRepo.merge(software, softwareDto);
    return softwareRepo.save(updatedSoftware);
  }
}
