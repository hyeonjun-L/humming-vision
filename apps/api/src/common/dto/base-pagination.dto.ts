import { IsNumber, IsOptional } from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_TAKE } from '../const/pagination.cont';

export class BasePaginationDto {
  @IsNumber()
  @IsOptional()
  page: number = DEFAULT_PAGE;

  @IsNumber()
  @IsOptional()
  take: number = DEFAULT_TAKE;
}
