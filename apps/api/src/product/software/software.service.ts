import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner } from 'typeorm';
import { SoftwareModel } from './software.entity';
import { CreateSoftwareDto } from './dto/create-software';
import { UpdateSoftwareDto } from './dto/update-software';

@Injectable()
export class SoftwareService {
  constructor() {}

  async createSoftware(
    softwareDto: CreateSoftwareDto,
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

  async updateSoftware(
    softwareDto: UpdateSoftwareDto,
    id: number,
    qr: QueryRunner,
  ) {
    const softwareRepo = qr.manager.getRepository(SoftwareModel);

    const software = await softwareRepo.findOne({
      where: { id: softwareDto.id, product: { id } },
    });
    if (!software) {
      throw new NotFoundException('Software not found');
    }
    const updatedSoftware = softwareRepo.merge(software, softwareDto);
    return softwareRepo.save(updatedSoftware);
  }
}
