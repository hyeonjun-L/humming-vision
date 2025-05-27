import { IsEnum } from 'class-validator';
import { SoftwareModelMaker } from '../software.const';

export class SoftwareDto {
  @IsEnum(SoftwareModelMaker)
  maker: SoftwareModelMaker;
}
