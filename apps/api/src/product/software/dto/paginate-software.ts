import { IsEnum, IsOptional } from 'class-validator';
import { BasePaginateProductDto } from 'src/product/dto/paginate-product.dto';
import { SoftwareModelMaker } from '../software.const';

export class PaginateSoftwareDto extends BasePaginateProductDto {
  @IsOptional()
  @IsEnum(SoftwareModelMaker)
  software__maker__equal?: SoftwareModelMaker;
}
