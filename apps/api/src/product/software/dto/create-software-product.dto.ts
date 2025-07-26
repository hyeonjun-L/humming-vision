import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseProductDto } from 'src/product/dto/base-product.dto';
import { BaseSoftwareDto } from './base-software.dto';

export class CreateSoftwareProductDto extends BaseProductDto {
  @ValidateNested()
  @Type(() => BaseSoftwareDto)
  software: BaseSoftwareDto;
}
