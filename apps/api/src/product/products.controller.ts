import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  create(@Body() createProductDto: CreateProductDto, @QueryRunner() qr: QR) {
    return this.productsService.create(createProductDto, qr);
  }
}
