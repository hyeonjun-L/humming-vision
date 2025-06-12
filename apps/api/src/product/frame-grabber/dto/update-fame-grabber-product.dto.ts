import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseUpdateProductDto } from 'src/product/dto/base-update-product.dto';
import { UpdateFrameGrabberDto } from './update-frame-grabber.dto';

export class UpdateFrameGrabberProductDto extends BaseUpdateProductDto {
  @ValidateNested()
  @Type(() => UpdateFrameGrabberDto)
  frameGrabber?: UpdateFrameGrabberDto;
}
