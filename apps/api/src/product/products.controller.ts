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
import { CategoriesEnum } from './const/categories.const';
import { ParseCategoryPipe } from './pipe/category-pipe.pipe';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { PaginateCameraDto } from './camera/dto/paginate-camera.dto';
import { PaginateLensDto } from './lens/dto/paginate-lens.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginateFrameGrabberDto } from './frame-grabber/dto/paginate-frame-grabber.dto';
import { PaginateSoftwareDto } from './software/dto/paginate-software.dto';
import { CreateCameraProductDto } from './camera/dto/create-camera-product.dto';
import { CameraService } from './camera/camera.service';
import { UpdateCameraProductDto } from './camera/dto/update-camera-product.dto';
import { FrameGrabberService } from './frame-grabber/frame-grabber.service';
import { UpdateFrameGrabberProductDto } from './frame-grabber/dto/update-fame-grabber-product.dto';
import { CreateFrameGrabberProductDto } from './frame-grabber/dto/create-frame-grabber-product.dto';
import { CreateLensProductDto } from './lens/dto/create-lens-product.dto';
import { LensService } from './lens/lens.service';
import { UpdateLensProductDto } from './lens/dto/update-lens-product.dto';
import { SoftwareService } from './software/software.service';
import { CreateSoftwareProductDto } from './software/dto/create-software-product.dto';
import { UpdateSoftwareProductDto } from './software/dto/update-software-product.dto';
import { LightService } from './light/light.service';
import { CreateLightProductDto } from './light/dto/create-light-product.dto';
import { UpdateLightProductDto } from './light/dto/update-light-product.dto';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cameraService: CameraService,
    private readonly frameGrabberService: FrameGrabberService,
    private readonly lensService: LensService,
    private readonly softwareService: SoftwareService,
    private readonly lightService: LightService,
  ) {}

  @Post('camera')
  @UseInterceptors(TransactionInterceptor)
  createCamera(@Body() dto: CreateCameraProductDto, @QueryRunner() qr: QR) {
    return this.cameraService.createProduct(dto, CategoriesEnum.CAMERA, qr);
  }

  @Patch('camera/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateCamera(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateCameraProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.cameraService.updateProduct(
      dto.id,
      CategoriesEnum.CAMERA,
      dto,
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
    @Body() dto: UpdateFrameGrabberProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.frameGrabberService.updateProduct(
      dto.id,
      CategoriesEnum.FRAMEGRABBER,
      dto,
      qr,
    );
  }

  @Post('lens')
  @UseInterceptors(TransactionInterceptor)
  async createLens(@Body() dto: CreateLensProductDto, @QueryRunner() qr: QR) {
    return this.lensService.createProduct(dto, CategoriesEnum.LENS, qr);
  }

  @Patch('lens/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateLens(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateLensProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.lensService.updateProduct(dto.id, CategoriesEnum.LENS, dto, qr);
  }

  @Post('software')
  @UseInterceptors(TransactionInterceptor)
  async createSoftware(
    @Body() dto: CreateSoftwareProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.softwareService.createProduct(dto, CategoriesEnum.SOFTWARE, qr);
  }

  @Patch('software/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateSoftware(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateSoftwareProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.softwareService.updateProduct(
      dto.id,
      CategoriesEnum.SOFTWARE,
      dto,
      qr,
    );
  }

  @Post('light')
  @UseInterceptors(TransactionInterceptor)
  async createLightProduct(
    @Body() createLightProductDto: CreateLightProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.lightService.createProduct(
      createLightProductDto,
      CategoriesEnum.LIGHT,
      qr,
    );
  }

  @Patch('light/:productId')
  @UseInterceptors(TransactionInterceptor)
  async updateLightProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateLightProductDto,
    @QueryRunner() qr: QR,
  ) {
    return this.lightService.updateProduct(
      dto.id,
      CategoriesEnum.LIGHT,
      dto,
      qr,
    );
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
