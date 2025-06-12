import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner, Repository } from 'typeorm';
import { SoftwareModel } from './software.entity';
import { AbstractProductService } from '../service/abstract-product.service';
import { CreateSoftwareProductDto } from './dto/create-software-product.dto';
import { UpdateSoftwareProductDto } from './dto/update-software-product.dto';
import { ProductImagesService } from '../image/images.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseSoftwareDto } from './dto/base-software.dto';
import { UpdateSoftwareDto } from './dto/update-software';

@Injectable()
export class SoftwareService extends AbstractProductService<
  CreateSoftwareProductDto,
  UpdateSoftwareProductDto
> {
  constructor(
    imagesService: ProductImagesService,
    @InjectRepository(ProductModel)
    repo: Repository<ProductModel>,
  ) {
    super(repo, imagesService);
  }

  protected async createCategorySpecific(
    dto: CreateSoftwareProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.createSoftware(dto.software, product, qr);
  }

  protected async updateCategorySpecific(
    dto: UpdateSoftwareProductDto,
    qr: QueryRunner,
  ) {
    if (dto.software) {
      await this.updateSoftware(dto.software, qr);
    }
  }

  async createSoftware(
    softwareDto: BaseSoftwareDto,
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

  async updateSoftware(softwareDto: UpdateSoftwareDto, qr: QueryRunner) {
    const softwareRepo = qr.manager.getRepository(SoftwareModel);

    const software = await softwareRepo.findOne({
      where: { id: softwareDto.id },
    });

    if (!software) {
      throw new NotFoundException('Software not found');
    }

    const updatedSoftware = softwareRepo.merge(software, softwareDto);
    return softwareRepo.save(updatedSoftware);
  }
}
