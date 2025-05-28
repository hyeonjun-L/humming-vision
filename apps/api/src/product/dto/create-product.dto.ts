import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { CatagoriesEnum } from '../const/categories.const';
import { CreateCameraDto } from '../camera/dto/create-camera.dto';
import { ProductModel } from '../product.entity';
import { CreateImageDto } from '../image/dto/create-image.dto';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.validator';
import { CreateFrameGrabberDto } from '../frame-grabber/dto/create-frame-grabber.dto';
import { CreateLensDto } from '../lens/dto/create-lens.dto';
import { CreateSoftwareDto } from '../software/dto/create-software';

export class CreateProductDto {
  @IsEnum(CatagoriesEnum)
  categories: CatagoriesEnum;

  @IsNotEmpty()
  @IsUnique(ProductModel, 'name', { message: '이미 존재하는 제품명입니다.' })
  name: string;

  @IsNotEmpty()
  mainFeature: string;

  @IsOptional()
  @IsUrl()
  datasheetUrl?: string;

  @IsOptional()
  @IsUrl()
  drawingUrl?: string;

  @IsOptional()
  @IsUrl()
  manualUrl?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  @IsNotEmpty()
  @IsUniqueImageOrderInArray({
    message: '이미지 배열 내에 같은 type과 order 조합이 중복되었습니다.',
  })
  images: CreateImageDto[];

  @ValidateNested()
  @Type(() => CreateCameraDto)
  @IsOptional()
  camera?: CreateCameraDto;

  @ValidateNested()
  @Type(() => CreateFrameGrabberDto)
  @IsOptional()
  frameGrabber?: CreateFrameGrabberDto;

  @ValidateNested()
  @Type(() => CreateLensDto)
  @IsOptional()
  lens?: CreateLensDto;

  @ValidateNested()
  @Type(() => CreateSoftwareDto)
  @IsOptional()
  software?: CreateSoftwareDto;
}
