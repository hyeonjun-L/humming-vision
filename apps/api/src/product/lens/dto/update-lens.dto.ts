import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { BaseLensDto } from './base-lens.dto';

export class UpdateLensDto extends PartialType(BaseLensDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
