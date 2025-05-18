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

  @ValidateNested()
  @Type(() => CreateCameraDto)
  @IsOptional()
  camera?: CreateCameraDto;
}
