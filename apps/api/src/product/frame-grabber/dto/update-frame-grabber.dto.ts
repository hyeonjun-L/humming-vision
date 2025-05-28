import { PartialType } from '@nestjs/mapped-types';
import { CreateFrameGrabberDto } from './create-frame-grabber.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFrameGrabberDto extends PartialType(CreateFrameGrabberDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
