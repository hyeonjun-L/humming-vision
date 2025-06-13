import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { ProductModel } from './product.entity';
import { CategoriesEnum, CategoryRelationMap } from './const/categories.const';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { BasePaginateProductDto } from './dto/paginate-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async getProductById(
    id: number,
    category: CategoriesEnum,
  ): Promise<ProductModel> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        [CategoryRelationMap[category]]: true,
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async paginateProduct(dto: BasePaginateProductDto, category: CategoriesEnum) {
    return this.commonService.paginate(
      dto,
      this.productRepository,
      {
        relations: {
          [CategoryRelationMap[category]]: true,
          images: true,
        },
      },
      {
        categories: category,
      },
      {
        images: {
          order: 'ASC',
        },
      },
      (qb, dto) => {
        if ('_camera__resolution__between' in dto) {
          const [min, max] = dto._camera__resolution__between! as [
            number,
            number,
          ];

          qb.andWhere(
            'camera.resolutionX * camera.resolutionY BETWEEN :min AND :max',
            {
              min,
              max,
            },
          );
        }
      },
    );
  }

  async deleteProduct(id: number, qr: QueryRunner) {
    const productRepository =
      qr.manager.getRepository<ProductModel>(ProductModel);

    const product = await productRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await productRepository.remove(product);
  }
}
