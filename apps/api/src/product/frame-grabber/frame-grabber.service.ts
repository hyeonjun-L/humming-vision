import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from '../product.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateFrameGrabberProductDto } from './dto/create-frame-grabber-product.dto';
import { FrameGrabberModel } from './frame-grabber.entity';
import { AbstractProductService } from '../service/abstract-product.service';
import { ProductImagesService } from '../image/images.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseFrameGrabberDto } from './dto/base-frame-grabber.dto';
import { UpdateFrameGrabberProductDto } from './dto/update-fame-grabber-product.dto';
import { UpdateFrameGrabberDto } from './dto/update-frame-grabber.dto';

@Injectable()
export class FrameGrabberService extends AbstractProductService<
  CreateFrameGrabberProductDto,
  UpdateFrameGrabberProductDto
> {
  constructor(
    imagesService: ProductImagesService,
    @InjectRepository(ProductModel)
    repo: Repository<ProductModel>,
  ) {
    super(repo, imagesService);
  }

  protected async createCategorySpecific(
    dto: CreateFrameGrabberProductDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    await this.createFrameGrabber(dto.frameGrabber, product, qr);
  }

  protected async updateCategorySpecific(
    dto: UpdateFrameGrabberProductDto,
    qr: QueryRunner,
  ) {
    if (dto.frameGrabber) {
      await this.updateFrameGrabber(dto.frameGrabber, qr);
    }
  }

  async createFrameGrabber(
    frameGrabberDto: BaseFrameGrabberDto,
    product: ProductModel,
    qr: QueryRunner,
  ) {
    const frameGrabberRepo = qr.manager.getRepository(FrameGrabberModel);

    const frameGrabber = frameGrabberRepo.create({
      ...frameGrabberDto,
      product,
    });

    return frameGrabberRepo.save(frameGrabber);
  }

  async updateFrameGrabber(
    frameGrabberDto: UpdateFrameGrabberDto,
    qr: QueryRunner,
  ) {
    const frameGrabberRepo = qr.manager.getRepository(FrameGrabberModel);

    const frameGrabber = await frameGrabberRepo.findOne({
      where: { id: frameGrabberDto.id },
    });

    if (!frameGrabber) {
      throw new NotFoundException('Frame Grabber not found');
    }

    const updatedFrameGrabber = frameGrabberRepo.merge(
      frameGrabber,
      frameGrabberDto,
    );

    return frameGrabberRepo.save(updatedFrameGrabber);
  }
}
