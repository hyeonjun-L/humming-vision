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
// import { ProductsService } from './products.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { CategoriesEnum } from './const/categories.const';
import { ParseCategoryPipe } from './pipe/category-pipe.pipe';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { PaginateCameraDto } from './camera/dto/paginate-camera.dto';
import { PaginateLensDto } from './lens/dto/paginate-lens.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginateFrameGrabberDto } from './frame-grabber/dto/paginate-frame-grabber.dto';
import { PaginateSoftwareDto } from './software/dto/paginate-software';
import { CreateLightDto } from './light/dto/create-light.dto';
import { UpdateLightDto } from './light/dto/update-light.dto';
import { CreateCameraProductDto } from './camera/dto/create-camera-product.dto';
import { CameraService } from './camera/camera.service';
import { UpdateCameraProductDto } from './camera/dto/update-camera-product.dto';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { UpdateFrameGrabberDto } from './frame-grabber/dto/update-frame-grabber.dto';
import { UpdateFrameGrabberProductDto } from './frame-grabber/dto/update-fame-grabber-product.dto';
import { CreateFrameGrabberProductDto } from './frame-grabber/dto/create-frame-grabber-product.dto';

@Controller('product')
export class ProductsController {
  constructor(
    // private readonly productsService: ProductsService,
    private readonly cameraService: CameraService,
    private readonly frameGrabberService: FrameGrabberService,
  ) {}

  // @Post('create')
  // @UseInterceptors(TransactionInterceptor)
  // async create(
  //   @Body() createProductDto: CreateProductDto,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const product = await this.productsService.createProduct(
  //     createProductDto,
  //     qr,
  //   );
  //   return product;
  // }

  //   @Patch('update/:category/:productId')
  // @UseInterceptors(TransactionInterceptor)
  // async update(
  //   @Param('productId', ParseIntPipe) id: number,
  //   @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  //   @Body() updateProductDto: UpdateProductDto,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const product = await this.productsService.updateProduct(
  //     updateProductDto.id || id,
  //     category,
  //     updateProductDto,
  //     qr,
  //   );
  //   return product;
  // }

  @Post('camera')
  @UseInterceptors(TransactionInterceptor)
  createCamera(@Body() dto: CreateCameraProductDto, @QueryRunner() qr: QR) {
    return this.cameraService.createProduct(dto, CategoriesEnum.CAMERA, qr);
  }

  @Patch('camera/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateCamera(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateCameraProductDto: UpdateCameraProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.cameraService.updateProduct(
      productId,
      CategoriesEnum.CAMERA,
      updateCameraProductDto,
      qr,
    );
  }

  @Post('frame-grabber')
  @UseInterceptors(TransactionInterceptor)
  createFrameGrabber(
    @Body() dto: CreateFrameGrabberProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.frameGrabberService.createProduct(
      dto,
      CategoriesEnum.FRAMEGRABBER,
      qr,
    );
  }

  @Patch('frame-grabber/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateFrameGrabber(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateFrameGrabberDto: UpdateFrameGrabberProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.frameGrabberService.updateProduct(
      productId,
      CategoriesEnum.FRAMEGRABBER,
      updateFrameGrabberDto,
      qr,
    );
  }

  @Delete(':productId')
  @HttpCode(204)
  async deleteCamera(@Param('productId', ParseIntPipe) productId: number) {
    return this.cameraService.deleteProduct(productId);
  }

  // @Post('create/light')
  // @UseInterceptors(TransactionInterceptor)
  // async createLightProduct(
  //   @Body() createLightProductDto: CreateLightDto,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const product = await this.productsService.createLightProduct(
  //     createLightProductDto,
  //     qr,
  //   );
  //   return product;
  // }

  // @Patch('update/light/:productId')
  // @UseInterceptors(TransactionInterceptor)
  // async updateLightProduct(
  //   @Param('productId', ParseIntPipe) id: number,
  //   @Body() updateLightProductDto: UpdateLightDto,
  //   @QueryRunner() qr: QR,
  // ) {
  //   const product = await this.productsService.updateLightProduct(
  //     id,
  //     updateLightProductDto,
  //     qr,
  //   );
  //   return product;
  // }

  // @Get(':category/:productId')
  // @IsPublic()
  // async getProduct(
  //   @Param('productId', ParseIntPipe) id: number,
  //   @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  // ) {
  //   const product = await this.productsService.getProductById(id, category);
  //   return product;
  // }

  // @Get(':category')
  // @IsPublic()
  // async paginateProducts(
  //   @Query() query: Record<string, any>,
  //   @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  // ) {
  //   let dto:
  //     | PaginateCameraDto
  //     | PaginateLensDto
  //     | PaginateFrameGrabberDto
  //     | PaginateSoftwareDto;

  //   if (category === CategoriesEnum.CAMERA) {
  //     dto = plainToInstance(PaginateCameraDto, query);
  //   } else if (category === CategoriesEnum.LENS) {
  //     dto = plainToInstance(PaginateLensDto, query);
  //   } else if (category === CategoriesEnum.FRAMEGRABBER) {
  //     dto = plainToInstance(PaginateFrameGrabberDto, query);
  //   } else if (category === CategoriesEnum.SOFTWARE) {
  //     dto = plainToInstance(PaginateFrameGrabberDto, query);
  //   } else {
  //     throw new BadRequestException('유효하지 않은 카테고리입니다.');
  //   }

  //   const errors = await validate(dto);
  //   if (errors.length > 0) {
  //     throw new BadRequestException(errors);
  //   }

  //   return this.productsService.paginateProduct(dto, category);
  // }

  // @Delete(':productId')
  // @UseInterceptors(TransactionInterceptor)
  // @HttpCode(204)
  // async deleteProduct(
  //   @Param('productId', ParseIntPipe) id: number,
  //   @QueryRunner() qr: QR,
  // ) {
  //   return await this.productsService.deleteProduct(id, qr);
  // }
}
