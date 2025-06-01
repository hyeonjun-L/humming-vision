import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_TAKE } from '../const/pagination.cont';
import { Type } from 'class-transformer';

export class BasePaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = DEFAULT_PAGE;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take: number = DEFAULT_TAKE;
}
