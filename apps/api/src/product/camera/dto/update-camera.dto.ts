import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCameraDto } from './create-camera.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCameraDto extends PartialType(CreateCameraDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
