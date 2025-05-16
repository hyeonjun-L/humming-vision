import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CatagoriesEnum } from '../const/categories.const';
import { CreateCameraDto } from './create-camera.dto';

export class CreateProductDto {
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @IsNotEmpty()
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
