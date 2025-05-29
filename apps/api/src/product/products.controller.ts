import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  Patch,
  ParseIntPipe,
  Get,
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
}
