import { IsIn, IsOptional, IsString } from 'class-validator';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class BasePaginateContactDto extends BasePaginationDto {
  @IsOptional()
  @IsString()
  where__name__i_like?: string;

  @IsOptional()
  @IsString()
  where__email__i_like?: string;

  @IsOptional()
  @IsString()
  where__subject__i_like?: string;

  @IsOptional()
  @IsString()
  where__company__i_like?: string;

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createdAt: 'ASC' | 'DESC' = 'DESC';
}
