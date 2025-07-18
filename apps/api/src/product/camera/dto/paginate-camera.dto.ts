import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsOptional } from 'class-validator';
import { BasePaginateProductDto } from 'src/product/dto/paginate-product.dto';
import { CameraModelMaker, CameraModelType } from '../camera.const';
import { InterfaceEnum } from 'src/product/const/interface.const';

export class PaginateCameraDto extends BasePaginateProductDto {
  @IsOptional()
  @IsEnum(CameraModelMaker)
  camera__maker__equal?: CameraModelMaker;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string') return value.split(',').map(Number);
    return [];
  })
  _camera__resolution__between?: [number, number];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string') return value.split(',').map(Number);
    return [];
  })
  camera__speed__between?: [number, number];

  @IsOptional()
  @IsEnum(InterfaceEnum)
  camera__interface__equal?: InterfaceEnum;

  @IsOptional()
  @IsEnum(CameraModelType)
  camera__type__equal?: CameraModelType;
}
