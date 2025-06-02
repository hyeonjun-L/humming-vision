import { IsEnum } from 'class-validator';
import { SoftwareModelMaker } from '../software.const';

export class CreateSoftwareDto {
  @IsEnum(SoftwareModelMaker)
  maker: SoftwareModelMaker;
}
