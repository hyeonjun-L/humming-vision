import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateSoftwareDto } from './create-software';

export class UpdateSoftwareDto extends PartialType(CreateSoftwareDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
