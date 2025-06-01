import { IsEnum, IsOptional } from 'class-validator';
import { BasePaginateProductDto } from 'src/product/dto/paginate-product.dto';
import { FrameGrabberModelMaker } from '../frame-grabber.const';
import { InterfaceEnum } from 'src/product/const/interface.const';

export class PaginateFrameGrabberDto extends BasePaginateProductDto {
  @IsOptional()
  @IsEnum(FrameGrabberModelMaker)
  frameGrabber__maker__equal: FrameGrabberModelMaker;

  @IsOptional()
  @IsEnum(InterfaceEnum)
  frameGrabber__interface__equal: InterfaceEnum;
}
