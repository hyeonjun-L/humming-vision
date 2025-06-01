import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsOptional } from 'class-validator';
import { BasePaginateProductDto } from 'src/product/dto/paginate-product.dto';
import { LensModelMount, LensModelType } from '../lens.const';

export class PaginateLensDto extends BasePaginateProductDto {
  @IsEnum(LensModelType)
  lens__type__equal: LensModelType = LensModelType.CCTV;

  @IsOptional()
  @IsEnum(LensModelMount)
  lens__mount__equal?: LensModelMount;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string') return value.split(',').map(Number);
    return [];
  })
  lens__focalLength__between?: [number, number];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string') return value.split(',').map(Number);
    return [];
  })
  lens__formatSize__between?: [number, number];
}
