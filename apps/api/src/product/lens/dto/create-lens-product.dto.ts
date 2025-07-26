import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseProductDto } from 'src/product/dto/base-product.dto';
import { BaseLensDto } from './base-lens.dto';

export class CreateLensProductDto extends BaseProductDto {
  @ValidateNested()
  @Type(() => BaseLensDto)
  lens: BaseLensDto;
}
