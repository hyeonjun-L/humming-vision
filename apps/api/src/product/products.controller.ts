import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
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

  @Patch('update/:id')
  @UseInterceptors(TransactionInterceptor)
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @QueryRunner() qr: QR,
  ) {
    const product = await this.productsService.updateProduct(
      updateProductDto.id || id,
      updateProductDto,
      qr,
    );
    return product;
  }
}
