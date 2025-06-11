import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseCameraDto } from './base-camera.dto';
import { BaseProductDto } from 'src/product/dto/base-product.dto';

export class CreateCameraProductDto extends BaseProductDto {
  @ValidateNested()
  @Type(() => BaseCameraDto)
  camera: BaseCameraDto;
}
