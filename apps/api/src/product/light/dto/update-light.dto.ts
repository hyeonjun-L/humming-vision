import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { BaseLightDto } from './base-light.dto';

export class UpdateLightDto extends PartialType(BaseLightDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
