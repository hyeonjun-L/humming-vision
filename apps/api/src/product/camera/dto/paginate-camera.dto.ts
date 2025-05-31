import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsOptional } from 'class-validator';
import { BasePaginateProductDto } from 'src/product/dto/paginate-product.dto';
import { CameraModelMaker } from '../camera.const';

export class PaginateCameraDto extends BasePaginateProductDto {
  @IsOptional()
  @IsEnum(CameraModelMaker)
  camera__maker__equal?: CameraModelMaker;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => Number)
  camera__resolution__between?: [number, number];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Type(() => Number)
  camera__speed__between?: [number, number];
}
