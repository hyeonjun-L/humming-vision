import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUpdateProductDto } from 'src/product/dto/base-update-product.dto';
import { UpdateLightDto } from './update-light.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateLightProductDto extends PickType(BaseUpdateProductDto, [
  'id',
  'name',
]) {
  @ValidateNested()
  @Type(() => UpdateLightDto)
  light?: UpdateLightDto;
}
