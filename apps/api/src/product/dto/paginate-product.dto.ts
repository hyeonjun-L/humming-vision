import { IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class PaginateProductDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  where__name__i_like?: string;
}
