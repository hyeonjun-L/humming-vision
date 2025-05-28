import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLensDto } from './create-lens.dto';

export class UpdateLensDto extends PartialType(CreateLensDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
