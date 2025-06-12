import { Injectable, NotFoundException } from '@nestjs/common';
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
        id: In(images.map((img) => img.id).filter(Boolean)),
        product: { id: productId },
      },
    });

    const existingMap = new Map<number, ImageModel>();
    for (const img of existingImages) {
      existingMap.set(img.id, img);
    }

    const imageIdsToDelete = images.map((img) => img.id).filter(Boolean);
    await this.removeImagesByIds(imageIdsToDelete, qr);

    const newImages = images.map((img) => {
      const existing = img.id ? existingMap.get(img.id) : undefined;

      return imageRepository.create({
        ...existing,
        ...img,
        product: { id: productId },
      });
    });

    return imageRepository.save(newImages);
  }
}
