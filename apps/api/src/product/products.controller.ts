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
} from '@nestjs/common';
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
import {
  CreateCategoryDtoMap,
  UpdateCategoryDtoMap,
} from './types/category-dto.type';
import { ManualValidationBadRequestException } from 'src/common/exception/manual-validation-bad-request.exception';
import { CategoriesEnum } from '@humming-vision/shared';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':category')
  @UseInterceptors(TransactionInterceptor)
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

    return this.productsService.updateGenericProduct(category, mappedDto, qr);
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
  @ApiExtraModels(
    PaginateCameraDto,
    PaginateLensDto,
    PaginateFrameGrabberDto,
    PaginateSoftwareDto,
  )
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
      dto = plainToInstance(PaginateSoftwareDto, query, {
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
    return await this.productsService.deleteProduct(id, qr);
  }
}
