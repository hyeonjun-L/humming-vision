import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.validator';
import { Type } from 'class-transformer';
import { UpdateImageDto } from '../image/dto/update-image.dto';
import { UpdateCameraDto } from '../camera/dto/update-camera.dto';
import { UpdateLensDto } from '../lens/dto/update-lens.dto';
import { IsValidImageOrderGlobally } from '../decorator/is-unique-image-order.decorator';
import { UpdateFrameGrabberDto } from '../frame-grabber/dto/update-frame-grabber.dto';
import { UpdateSoftwareDto } from '../software/dto/update-software';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, [
    'images',
    'camera',
    'lens',
    'frameGrabber',
    'software',
  ] as const),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateImageDto)
  @IsUniqueImageOrderInArray()
  @IsValidImageOrderGlobally()
  images?: UpdateImageDto[];

  @ValidateNested()
  @Type(() => UpdateCameraDto)
  camera?: UpdateCameraDto;

  @ValidateNested()
  @Type(() => UpdateFrameGrabberDto)
  frameGrabber?: UpdateFrameGrabberDto;

  @ValidateNested()
  @Type(() => UpdateLensDto)
  lens?: UpdateLensDto;

  @ValidateNested()
  @Type(() => UpdateSoftwareDto)
  software?: UpdateSoftwareDto;
}
