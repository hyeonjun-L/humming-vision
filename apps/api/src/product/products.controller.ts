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
  Delete,
  HttpCode,
  ValidationPipe,
  BadRequestException,
  DefaultValuePipe,
  Inject,
} from '@nestjs/common';
import {
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiExtraModels } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import {
  CREATE_CATEGORY_DTO_MAPPING,
  UPDATE_CATEGORY_DTO_MAPPING,
} from './const/categories.const';
import { ParseCategoryPipe } from './pipe/category-pipe.pipe';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { PaginateCameraDto } from './camera/dto/paginate-camera.dto';
import { PaginateLensDto } from './lens/dto/paginate-lens.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { PaginateFrameGrabberDto } from './frame-grabber/dto/paginate-frame-grabber.dto';
import { PaginateSoftwareDto } from './software/dto/paginate-software.dto';
import { ManualValidationBadRequestException } from 'src/common/exception/manual-validation-bad-request.exception';
import { CreateCameraProductDto } from './camera/dto/create-camera-product.dto';
import { CreateFrameGrabberProductDto } from './frame-grabber/dto/create-frame-grabber-product.dto';
import { CreateLensProductDto } from './lens/dto/create-lens-product.dto';
import { CreateSoftwareProductDto } from './software/dto/create-software-product.dto';
import { CreateLightProductDto } from './light/dto/create-light-product.dto';
import { UpdateCameraProductDto } from './camera/dto/update-camera-product.dto';
import { UpdateFrameGrabberProductDto } from './frame-grabber/dto/update-fame-grabber-product.dto';
import { UpdateLensProductDto } from './lens/dto/update-lens-product.dto';
import { UpdateSoftwareProductDto } from './software/dto/update-software-product.dto';
import { UpdateLightProductDto } from './light/dto/update-light-product.dto';
import { CategoriesEnum } from '@humming-vision/shared';
import {
  CreateCategoryDtoMap,
  UpdateCategoryDtoMap,
} from './types/category-dto.type';
import { PaginateLightDto } from './light/dto/paginate-light.dto';
import { ProductModel } from './product.entity';

@Controller('product')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post(':category')
  @UseInterceptors(TransactionInterceptor)
  @ApiExtraModels(
    CreateCameraProductDto,
    CreateFrameGrabberProductDto,
    CreateLensProductDto,
    CreateSoftwareProductDto,
    CreateLightProductDto,
  )
  async createProduct<K extends CategoriesEnum>(
    @Param('category', ParseCategoryPipe) category: K,
    @Body(new ValidationPipe({ transform: true }))
    dto: unknown,
    @QueryRunner() qr: QR,
  ) {
    const DtoClass = CREATE_CATEGORY_DTO_MAPPING[
      category
    ] as new () => CreateCategoryDtoMap[K];

    const mappedDto = plainToInstance(DtoClass, dto, {
      enableImplicitConversion: true,
    });

    const errors = await validate(mappedDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new ManualValidationBadRequestException(errors);
    }

    return this.productsService.createGenericProduct(category, mappedDto, qr);
  }

  @Patch(':category/:productId')
  @UseInterceptors(TransactionInterceptor)
  @ApiExtraModels(
    UpdateCameraProductDto,
    UpdateFrameGrabberProductDto,
    UpdateLensProductDto,
    UpdateSoftwareProductDto,
    UpdateLightProductDto,
  )
  async updateProduct<K extends CategoriesEnum>(
    @Param('category', ParseCategoryPipe) category: K,
    @Body() dto: any,
    @QueryRunner() qr: QR,
  ) {
    const DtoClass = UPDATE_CATEGORY_DTO_MAPPING[
      category
    ] as new () => UpdateCategoryDtoMap[K];

    const mappedDto = plainToInstance(DtoClass, dto, {
      enableImplicitConversion: true,
    });

    const errors = await validate(mappedDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new ManualValidationBadRequestException(errors);
    }

    const result = await this.productsService.updateGenericProduct(
      category,
      mappedDto,
      qr,
    );

    const categoryLower = category.toLowerCase();
    const productCacheKey = `/product/${categoryLower}/${mappedDto.id}`;
    await this.cacheManager.del(productCacheKey);

    return result;
  }

  @Get(':category/:productId')
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  async getProduct(
    @Param('productId', ParseIntPipe) id: number,
    @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  ) {
    const product = await this.productsService.getProductById(id, category);
    return product;
  }

  @Get(':category')
  @ApiExtraModels(
    PaginateCameraDto,
    PaginateLensDto,
    PaginateFrameGrabberDto,
    PaginateSoftwareDto,
    PaginateLightDto,
  )
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60000)
  async paginateProducts(
    @Query() query: Record<string, any>,
    @Param('category', ParseCategoryPipe) category: CategoriesEnum,
  ) {
    let dto:
      | PaginateCameraDto
      | PaginateLensDto
      | PaginateFrameGrabberDto
      | PaginateSoftwareDto
      | PaginateLightDto;
    if (category === CategoriesEnum.CAMERA) {
      dto = plainToInstance(PaginateCameraDto, query, {
        enableImplicitConversion: true,
      });
    } else if (category === CategoriesEnum.LENS) {
      dto = plainToInstance(PaginateLensDto, query, {
        enableImplicitConversion: true,
      });
    } else if (category === CategoriesEnum.FRAMEGRABBER) {
      dto = plainToInstance(PaginateFrameGrabberDto, query, {
        enableImplicitConversion: true,
      });
    } else if (category === CategoriesEnum.SOFTWARE) {
      dto = plainToInstance(PaginateSoftwareDto, query, {
        enableImplicitConversion: true,
      });
    } else if (category === CategoriesEnum.LIGHT) {
      dto = plainToInstance(PaginateLightDto, query, {
        enableImplicitConversion: true,
      });
    } else {
      throw new BadRequestException('유효하지 않은 카테고리입니다.');
    }

    const errors = await validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new ManualValidationBadRequestException(errors);
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
    const deletedProduct = await this.productsService.deleteProduct(id, qr);

    const categoryLower = deletedProduct.category.toLowerCase();
    const cacheKey = `/product/${categoryLower}/${deletedProduct.id}`;
    await this.cacheManager.del(cacheKey);
  }

  @Get('camera/by-sensor/:sensor')
  @IsPublic()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300000)
  async camerasBySensor(
    @Param('sensor') sensor: string,
    @Query('take', new DefaultValuePipe(3), ParseIntPipe) take: number,
    @Query('skipId', ParseIntPipe) skipId: number,
  ): Promise<ProductModel[]> {
    return this.productsService.getCamerasBySensor(sensor, take, skipId);
  }
}
