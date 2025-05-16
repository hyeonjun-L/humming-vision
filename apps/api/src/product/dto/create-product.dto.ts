import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CatagoriesEnum } from '../const/categories.const';
import { CreateCameraDto } from './create-camera.dto';
import { IsUniqueProductName } from '../validator/is-unique-product-name.validator';

export class CreateProductDto {
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @IsNotEmpty()
  @IsUniqueProductName()
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
