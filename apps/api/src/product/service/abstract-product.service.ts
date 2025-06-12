import { QueryRunner, Repository } from 'typeorm';
import { ProductModel } from '../product.entity';
import { ProductImagesService } from '../image/images.service';
import { CategoriesEnum, CategoryRelationMap } from '../const/categories.const';
import { BaseProductDto } from '../dto/base-product.dto';
import { NotFoundException } from '@nestjs/common';
import { BaseUpdateProductDto } from '../dto/base-update-product.dto';

export abstract class AbstractProductService<
  CreateDto extends Partial<BaseProductDto>,
  UpdateDto extends BaseUpdateProductDto,
> {
  constructor(
    protected readonly productRepository: Repository<ProductModel>,
    protected readonly imagesService: ProductImagesService,
  ) {}

  protected abstract createCategorySpecific(
    dto: CreateDto,
    product: ProductModel,
    qr: QueryRunner,
  ): Promise<void>;

  protected abstract updateCategorySpecific(
    dto: UpdateDto,
    product: ProductModel,
    qr: QueryRunner,
  ): Promise<void>;

  protected async getProductOrFail(
    id: number,
    category: CategoriesEnum,
    qr?: QueryRunner,
  ): Promise<ProductModel> {
    const productRepository = this.getRepository(qr);
    const product = await productRepository.findOne({
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

  private getRepository(qr?: QueryRunner): Repository<ProductModel> {
    return qr
      ? qr.manager.getRepository<ProductModel>(ProductModel)
      : this.productRepository;
  }

  async createProduct(
    dto: CreateDto,
    category: CategoriesEnum,
    qr: QueryRunner,
  ): Promise<ProductModel> {
    const productRepository =
      qr.manager.getRepository<ProductModel>(ProductModel);

    const product = productRepository.create({
      ...dto,
      categories: category,
    });

    const saved = await productRepository.save(product);

    if ('images' in dto && dto.images) {
      await Promise.all(
        dto.images.map((img) => this.imagesService.createImage(img, saved, qr)),
      );
    }

    await this.createCategorySpecific(dto, saved, qr);

    const savedProduct = await this.getProductOrFail(saved.id, category, qr);
    return savedProduct;
  }

  async updateProduct(
    id: number,
    category: CategoriesEnum,
    updateProductDto: UpdateDto,
    qr: QueryRunner,
  ): Promise<ProductModel> {
    const productRepository =
      qr.manager.getRepository<ProductModel>(ProductModel);

    const product = await this.getProductOrFail(id, category, qr);

    const updatedProduct = productRepository.merge(product, updateProductDto);
    const savedProduct = await productRepository.save(updatedProduct);

    if ('images' in updateProductDto && updateProductDto.images) {
      await Promise.all(
        updateProductDto.images.map((image) =>
          this.imagesService.updateImage(image, id, qr),
        ),
      );
    }

    await this.updateCategorySpecific(updateProductDto, savedProduct, qr);

    return this.getProductOrFail(savedProduct.id, category, qr);
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);
  }
}
