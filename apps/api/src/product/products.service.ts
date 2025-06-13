import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner, Repository } from 'typeorm';
import { ProductModel } from './product.entity';
import { CategoriesEnum, CategoryRelationMap } from './const/categories.const';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { BasePaginateProductDto } from './dto/paginate-product.dto';
import { CameraService } from './camera/camera.service';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { LensService } from './lens/lens.service';
import { SoftwareService } from './software/software.service';
import { LightService } from './light/light.service';
import { QueryRunner as QR } from 'typeorm';
import { AbstractProductService } from './service/abstract-product.service';
import {
  CreateCategoryDtoMap,
  UpdateCategoryDtoMap,
} from './types/category-dto.type';

@Injectable()
export class ProductsService {
  constructor(
    private readonly cameraService: CameraService,
    private readonly frameGrabberService: FrameGrabberService,
    private readonly lensService: LensService,
    private readonly softwareService: SoftwareService,
    private readonly lightService: LightService,
    private readonly commonService: CommonService,
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  private getCategoryServiceMap() {
    return {
      [CategoriesEnum.CAMERA]: this.cameraService,
      [CategoriesEnum.FRAMEGRABBER]: this.frameGrabberService,
      [CategoriesEnum.LENS]: this.lensService,
      [CategoriesEnum.SOFTWARE]: this.softwareService,
      [CategoriesEnum.LIGHT]: this.lightService,
    };
  }

  async createGenericProduct<K extends CategoriesEnum>(
    category: K,
    dto: CreateCategoryDtoMap[K],
    qr: QR,
  ) {
    const serviceMap = this.getCategoryServiceMap();
    const service = serviceMap[category] as AbstractProductService<
      CreateCategoryDtoMap[K],
      any
    >;

    return service.createProduct(dto, category, qr);
  }

  async updateGenericProduct<K extends CategoriesEnum>(
    category: K,
    dto: UpdateCategoryDtoMap[K],
    qr: QR,
  ) {
    const serviceMap = this.getCategoryServiceMap();
    const service = serviceMap[category] as AbstractProductService<
      any,
      UpdateCategoryDtoMap[K]
    >;

    return service.updateProduct(dto.id, category, dto, qr);
  }

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
