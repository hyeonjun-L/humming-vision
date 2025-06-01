import { IsEnum } from 'class-validator';
import { SoftwareModelMaker } from '../software.const.dto';

export class CreateSoftwareDto {
  @IsEnum(SoftwareModelMaker)
  maker: SoftwareModelMaker;
}
