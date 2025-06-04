import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  Patch,
  ParseIntPipe,
  Get,
  Query,
  BadRequestException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesEnum } from './const/categories.const';
import { ParseCategoryPipe } from './pipe/category-pipe.pipe';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { PaginateCameraDto } from './camera/dto/paginate-camera.dto';
import { PaginateLensDto } from './lens/dto/paginate-lens.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginateFrameGrabberDto } from './frame-grabber/dto/paginate-frame-grabber.dto';
import { PaginateSoftwareDto } from './software/dto/paginate-software';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @UseInterceptors(TransactionInterceptor)
  async create(
    @Body() createProductDto: CreateProductDto,
    @QueryRunner() qr: QR,
  ) {
    const product = await this.productsService.createProduct(
      createProductDto,
      qr,
    );
    return product;
  }

  @Patch('update/:category/:productId')
  @UseInterceptors(TransactionInterceptor)
  async update(
    @Param('productId', ParseIntPipe) id: number,
    @Param('category', ParseCategoryPipe) category: CategoriesEnum,
    @Body() updateProductDto: UpdateProductDto,
    @QueryRunner() qr: QR,
  ) {
    const product = await this.productsService.updateProduct(
      updateProductDto.id || id,
      category,
      updateProductDto,
      qr,
    );
    return product;
  }

  @Get(':category/:productId')
  @IsPublic()
  async getProduct(
    @Param('productId', ParseIntPipe) id: number,
    @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  ) {
    const product = await this.productsService.getProductById(id, category);
    return product;
  }

  @Get(':category')
  @IsPublic()
  async paginateProducts(
    @Query() query: Record<string, any>,
    @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  ) {
    let dto:
      | PaginateCameraDto
      | PaginateLensDto
      | PaginateFrameGrabberDto
      | PaginateSoftwareDto;

    if (category === CategoriesEnum.CAMERA) {
      dto = plainToInstance(PaginateCameraDto, query);
    } else if (category === CategoriesEnum.LENS) {
      dto = plainToInstance(PaginateLensDto, query);
    } else if (category === CategoriesEnum.FRAMEGRABBER) {
      dto = plainToInstance(PaginateFrameGrabberDto, query);
    } else if (category === CategoriesEnum.SOFTWARE) {
      dto = plainToInstance(PaginateFrameGrabberDto, query);
    } else {
      throw new BadRequestException('유효하지 않은 카테고리입니다.');
    }

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.productsService.paginateProduct(dto, category);
  }

  @Delete(':productId')
  @UseInterceptors(TransactionInterceptor)
  @HttpCode(204)
  async deleteProduct(
    @Param('productId', ParseIntPipe) id: number,
    @QueryRunner() qr: QR,
  ) {
    return await this.productsService.deleteProduct(id, qr);
  }
}
