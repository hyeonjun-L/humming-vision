import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { CatagoriesEnum } from '../const/categories.const';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.validator';
import { Type } from 'class-transformer';
import { UpdateImageDto } from '../image/dto/update-image.dto';
import { UpdateCameraDto } from '../camera/dto/update-camera.dto';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['images', 'camera'] as const),
) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  @IsUniqueImageOrderInArray({
    message: '이미지 배열 내에 같은 type과 order 조합이 중복되었습니다.',
  })
  images?: UpdateImageDto[];

  @ValidateNested()
  @Type(() => UpdateCameraDto)
  camera?: UpdateCameraDto;

  // @ValidateNested()
  // @Type(() => FrameGrabberDto)
  // @IsOptional()
  // frameGrabber?: FrameGrabberDto;

  // @ValidateNested()
  // @Type(() => LensDto)
  // @IsOptional()
  // lens?: LensDto;

  // @ValidateNested()
  // @Type(() => SoftwareDto)
  // @IsOptional()
  // software?: SoftwareDto;
}
