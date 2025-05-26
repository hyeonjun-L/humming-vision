import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { AwsService } from 'src/common/aws/aws.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService,
  ) {}

  @Post('create')
  @UseInterceptors(TransactionInterceptor)
  async create(
    @Body() createProductDto: CreateProductDto,
    @QueryRunner() qr: QR,
  ) {
    const product = await this.productsService.create(createProductDto, qr);

    return product;
  }
}
