import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageModel } from 'src/common/entity/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ImageModel)
    private readonly imageRepository: Repository<ImageModel>,
  ) {}
}
