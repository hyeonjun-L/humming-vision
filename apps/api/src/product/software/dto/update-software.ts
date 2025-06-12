import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseSoftwareDto } from './base-software.dto';

export class UpdateSoftwareDto extends PartialType(BaseSoftwareDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
