import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { ImageModel } from './image.entity';
import { ProductModel } from '../product.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ImageModel)
    private readonly imageRepository: Repository<ImageModel>,
  ) {}

  getImageRepository(qr?: QueryRunner): Repository<ImageModel> {
    if (qr) {
      return qr.manager.getRepository<ImageModel>(ImageModel);
    }
    return this.imageRepository;
  }

  async createImage(
    createImageDto: CreateImageDto,
    product: ProductModel,
    qr?: QueryRunner,
  ) {
    const imageRepository = this.getImageRepository(qr);

    const image = imageRepository.create({
      ...createImageDto,
      product,
    });
    return imageRepository.save(image);
  }

  async updateImage(
    updateImageDto: UpdateImageDto,
    id: number,
    qr?: QueryRunner,
  ) {
    const imageRepository = this.getImageRepository(qr);

    const image = await imageRepository.findOne({
      where: { id: updateImageDto.id, product: { id } },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    const updatedImage = imageRepository.merge(image, updateImageDto);
    return imageRepository.save(updatedImage);
  }
}
