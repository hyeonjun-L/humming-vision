import { IsIn, IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class BasePaginateProductDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  where__name__i_like?: string;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__name?: 'ASC' | 'DESC';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt?: 'ASC' | 'DESC';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__id?: 'ASC' | 'DESC';
}
