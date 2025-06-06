import { IsEnum, IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { ImageModelType } from '../image.entity';

export class CreateImageDto {
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsEnum(ImageModelType)
  type: ImageModelType;

  @IsNotEmpty()
  @IsUrl()
  path: string;
}
