import { IsEnum, IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { ImageModel, ImageModelType } from '../entity/image.entity';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';

export class CreateImageDto {
  @IsInt()
  @IsUnique(ImageModel, 'order', {
    message: '이미 존재하는 이미지 순서입니다.',
  })
  order: number;

  @IsEnum(ImageModelType)
  type: ImageModelType;

  @IsNotEmpty()
  @IsUrl()
  path: string;
}
