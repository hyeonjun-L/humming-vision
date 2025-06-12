import { IsEnum, IsNumber, IsString } from 'class-validator';
import { LensModelMount, LensModelType } from '../lens.const';

export class BaseLensDto {
  @IsEnum(LensModelType)
  type: LensModelType;

  @IsEnum(LensModelMount)
  mount: LensModelMount;

  @IsString()
  maker: string;

  @IsNumber()
  resolution: number;

  @IsString()
  numericAperture: string;

  @IsString()
  fNumnber: string;

  @IsNumber()
  focalLength: number;

  @IsNumber()
  formatSize: number;
}
