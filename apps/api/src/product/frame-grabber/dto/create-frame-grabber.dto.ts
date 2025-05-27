import { IsEnum, IsInt, IsString } from 'class-validator';
import { InterfaceEnum } from '../../const/interface.const';
import { FrameGrabberModelMaker } from '../frame-grabber.const';

export class FrameGrabberDto {
  @IsEnum(InterfaceEnum)
  interface: InterfaceEnum;

  @IsEnum(FrameGrabberModelMaker)
  maker: FrameGrabberModelMaker;

  @IsInt()
  memory: number;

  @IsString()
  pcSlot: string;

  @IsString()
  connector: string;
}
