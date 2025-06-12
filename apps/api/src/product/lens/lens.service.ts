import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseLensDto } from './dto/base-lens.dto';
import { LensModel } from './lens.entity';
import { AbstractProductService } from '../service/abstract-product.service';
import { CreateLensProductDto } from './dto/create-lens-product.dto';
import { UpdateLensProductDto } from './dto/update-lens-product.dto';
import { ProductImagesService } from '../image/images.service';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LensService extends AbstractProductService<
  CreateLensProductDto,
  UpdateLensProductDto
> {
  constructor(
    imagesService: ProductImagesService,
    @InjectRepository(ProductModel)
    repo: Repository<ProductModel>,
  ) {
    super(repo, imagesService);
  }

  protected async createCategorySpecific(
    dto: CreateLensProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.createLens(dto.lens, product, qr);
  }

  protected async updateCategorySpecific(
    dto: UpdateLensProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.updateLens(dto, product.id, qr);
  }

  async createLens(
    lensDto: BaseLensDto,
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

  async updateLens(lensDto: UpdateLensProductDto, id: number, qr: QueryRunner) {
    const lensRepo = qr.manager.getRepository(LensModel);

    const lens = await lensRepo.findOne({
      where: { id: lensDto.lens?.id, product: { id } },
    });
    if (!lens) {
      throw new NotFoundException('Lens not found');
    }

    const updatedLens = lensRepo.merge({ ...lens, ...lensDto });
    return lensRepo.save(updatedLens);
  }
}
