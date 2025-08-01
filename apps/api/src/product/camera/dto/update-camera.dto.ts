import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseCameraDto } from './base-camera.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCameraDto extends PartialType(BaseCameraDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
