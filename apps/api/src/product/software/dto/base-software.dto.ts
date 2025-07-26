import { IsEnum } from 'class-validator';
import { SoftwareModelMaker } from '../software.const';

export class BaseSoftwareDto {
  @IsEnum(SoftwareModelMaker)
  maker: SoftwareModelMaker;
}
