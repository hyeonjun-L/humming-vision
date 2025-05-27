import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CatagoriesEnum } from '../const/categories.const';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;
}
