import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
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

  async removeImagesByIds(imageIds: number[], qr?: QueryRunner) {
    const imageRepository = this.getImageRepository(qr);
    if (imageIds.length > 0) {
      await imageRepository.delete(imageIds);
    }
  }

  async replaceImages(
    images: UpdateImageDto[],
    productId: number,
    qr?: QueryRunner,
  ) {
    const imageRepository = this.getImageRepository(qr);

    const existingImages = await imageRepository.find({
      where: {
        product: { id: productId },
        type: In(images.map((img) => img.type)),
      },
    });

    if (existingImages.length > 0) {
      const imageIdsToDelete = existingImages.map((img) => img.id);
      await this.removeImagesByIds(imageIdsToDelete, qr);
    }

    const newImages = images.map((img) => {
      return imageRepository.create({
        ...img,
        product: { id: productId },
      });
    });

    return imageRepository.save(newImages);
  }
}
