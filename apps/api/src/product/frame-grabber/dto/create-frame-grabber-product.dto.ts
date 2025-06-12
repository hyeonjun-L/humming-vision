import { ValidateNested } from 'class-validator';
import { BaseProductDto } from 'src/product/dto/base-product.dto';
import { Type } from 'class-transformer';
import { BaseFrameGrabberDto } from './base-frame-grabber.dto';

export class CreateFrameGrabberProductDto extends BaseProductDto {
  @ValidateNested()
  @Type(() => BaseFrameGrabberDto)
  frameGrabber: BaseFrameGrabberDto;
}
