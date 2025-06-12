import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner, Repository } from 'typeorm';
import { LightModel } from './light.entity';
import { BaseLightDto } from './dto/base-light.dto';
import { AbstractProductService } from '../service/abstract-product.service';
import { ProductImagesService } from '../image/images.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLightProductDto } from './dto/create-light-product.dto';
import { UpdateLightProductDto } from './dto/update-light-product.dto';
import { UpdateLightDto } from './dto/update-light.dto';

@Injectable()
export class LightService extends AbstractProductService<
  CreateLightProductDto,
  UpdateLightProductDto
> {
  constructor(
    imagesService: ProductImagesService,
    @InjectRepository(ProductModel)
    repo: Repository<ProductModel>,
  ) {
    super(repo, imagesService);
  }

  protected async createCategorySpecific(
    dto: CreateLightProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.createLight(dto.light, product, qr);
  }

  protected async updateCategorySpecific(
    dto: UpdateLightProductDto,
    qr: QueryRunner,
  ) {
    if (dto.light) {
      await this.updateLight(dto, qr);
    }
  }

  async getLightById(id: number, qr: QueryRunner) {
    const lightRepo = qr.manager.getRepository(LightModel);
    const light = await lightRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!light) {
      throw new NotFoundException('Light not found');
    }
    return light;
  }

  async createLight(
    lightDto: BaseLightDto,
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

  async updateLight(lightDto: UpdateLightDto, qr: QueryRunner) {
    const lightRepo = qr.manager.getRepository(LightModel);

    const ligth = await lightRepo.findOne({
      where: { id: lightDto.id },
    });

    if (!ligth) {
      throw new NotFoundException('Light not found');
    }

    const updatedLens = lightRepo.merge(ligth, lightDto);
    return lightRepo.save(updatedLens);
  }
}
