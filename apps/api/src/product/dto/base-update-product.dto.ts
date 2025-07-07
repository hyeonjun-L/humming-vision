import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateImageDto } from '../image/dto/update-image.dto';
import { BaseProductDto } from './base-product.dto';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.decorator';

export class BaseUpdateProductDto extends PartialType(
  OmitType(BaseProductDto, ['images'] as const),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  @IsUniqueImageOrderInArray()
  images?: UpdateImageDto[];
}
