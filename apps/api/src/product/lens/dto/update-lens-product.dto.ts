import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUpdateProductDto } from 'src/product/dto/base-update-product.dto';
import { UpdateLensDto } from './update-lens.dto';

export class UpdateLensProductDto extends BaseUpdateProductDto {
  @ValidateNested()
  @Type(() => UpdateLensDto)
  lens?: UpdateLensDto;
}
