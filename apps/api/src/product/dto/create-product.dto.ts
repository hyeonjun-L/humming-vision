import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CatagoriesEnum } from '../const/categories.const';
import { CreateCameraDto } from './create-camera.dto';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { ProductModel } from '../entity/product.entity';
import { CreateImageDto } from './create-image.dto';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.validator';

export class CreateProductDto {
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @IsNotEmpty()
  @IsUnique(ProductModel, 'name', { message: '이미 존재하는 제품명입니다.' })
  name: string;

  @IsNotEmpty()
  mainFeature: string;

  @IsOptional()
  datasheetUrl?: string;

  @IsOptional()
  drawingUrl?: string;

  @IsOptional()
  manualUrl?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  @IsNotEmpty()
  @IsUniqueImageOrderInArray({
    message: '이미지 배열 내에 같은 type과 order 조합이 중복되었습니다.',
  })
  images: CreateImageDto[];

  @ValidateNested()
  @Type(() => CreateCameraDto)
  @IsOptional()
  camera?: CreateCameraDto;
}
