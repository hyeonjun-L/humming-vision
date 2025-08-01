import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { InterfaceEnum } from '../../const/interface.const';
import {
  CameraModelColor,
  CameraModelMaker,
  CameraModelType,
} from '../camera.const';

export class BaseCameraDto {
  @IsEnum(InterfaceEnum)
  interface: InterfaceEnum;

  @IsEnum(CameraModelType)
  type: CameraModelType;

  @IsEnum(CameraModelColor)
  color: CameraModelColor;

  @IsEnum(CameraModelMaker)
  maker: CameraModelMaker;

  @IsInt()
  @Min(1)
  resolutionX: number;

  @IsInt()
  @Min(1)
  resolutionY: number;

  @IsInt()
  speed: number;

  @IsOptional()
  @IsNumber()
  pixelSize?: number;

  @IsString()
  formatSize: string;

  @IsString()
  mountType: string;

  @IsString()
  sensor: string;
}
