import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseProductDto } from 'src/product/dto/base-product.dto';
import { BaseLightDto } from './base-light.dto';
import { PickType } from '@nestjs/mapped-types';

export class CreateLightProductDto extends PickType(BaseProductDto, ['name']) {
  @ValidateNested()
  @Type(() => BaseLightDto)
  light: BaseLightDto;
}
