import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { CatagoriesEnum } from '../const/categories.const';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.validator';
import { Type } from 'class-transformer';
import { UpdateImageDto } from '../image/dto/update-image.dto';
import { UpdateCameraDto } from '../camera/dto/update-camera.dto';
import { UpdateLensDto } from '../lens/dto/update-lens.dto';
import { IsValidImageOrderGlobally } from '../decorator/is-unique-image-order.decorator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['images', 'camera', 'lens'] as const),
) {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  @IsUniqueImageOrderInArray()
  @IsValidImageOrderGlobally()
  images?: UpdateImageDto[];

  @ValidateNested()
  @Type(() => UpdateCameraDto)
  camera?: UpdateCameraDto;

  // @ValidateNested()
  // @Type(() => FrameGrabberDto)
  // frameGrabber?: FrameGrabberDto;

  @ValidateNested()
  @Type(() => UpdateLensDto)
  lens?: UpdateLensDto;

  // @ValidateNested()
  // @Type(() => SoftwareDto)
  // @IsOptional()
  // software?: SoftwareDto;
}
