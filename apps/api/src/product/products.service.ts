import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from './entity/product.entity';
import { CatagoriesEnum } from './const/categories.const';
import { CameraModel } from './entity/camera.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>,
    @InjectRepository(CameraModel)
    private cameraRepository: Repository<CameraModel>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);

    const savedProduct = await this.productRepository.save(product);

    switch (createProductDto.categories) {
      case CatagoriesEnum.CAMERA:
        if (createProductDto.camera) {
          const camera = this.cameraRepository.create({
            ...createProductDto.camera,
            product: savedProduct,
          });
          await this.cameraRepository.save(camera);
        }
        break;
    }

    return savedProduct;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
