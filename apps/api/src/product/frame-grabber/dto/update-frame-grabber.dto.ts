import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseFrameGrabberDto } from './base-frame-grabber.dto';

export class UpdateFrameGrabberDto extends PartialType(BaseFrameGrabberDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
