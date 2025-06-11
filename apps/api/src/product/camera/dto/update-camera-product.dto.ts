import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUpdateProductDto } from 'src/product/dto/base-update-product.dto';
import { UpdateCameraDto } from './update-camera.dto';

export class UpdateCameraProductDto extends BaseUpdateProductDto {
  @ValidateNested()
  @Type(() => UpdateCameraDto)
  camera?: UpdateCameraDto;
}
