import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { CreateProductDto } from './dto/create-product.dto';

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
}
