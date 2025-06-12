import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUpdateProductDto } from 'src/product/dto/base-update-product.dto';
import { UpdateSoftwareDto } from './update-software';

export class UpdateSoftwareProductDto extends BaseUpdateProductDto {
  @ValidateNested()
  @Type(() => UpdateSoftwareDto)
  software?: UpdateSoftwareDto;
}
