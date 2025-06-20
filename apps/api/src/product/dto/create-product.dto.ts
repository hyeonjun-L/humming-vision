import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { CategoriesEnum } from '../const/categories.const';
import { CreateCameraDto } from '../camera/dto/create-camera.dto';
import { ProductModel } from '../product.entity';
import { CreateImageDto } from '../image/dto/create-image.dto';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.decorator';
import { CreateFrameGrabberDto } from '../frame-grabber/dto/create-frame-grabber.dto';
import { CreateLensDto } from '../lens/dto/create-lens.dto';
import { CreateSoftwareDto } from '../software/dto/create-software';
import { IsCategoryFieldConsistent } from '../decorator/is-category-field.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsEnum(CategoriesEnum)
  @IsCategoryFieldConsistent({
    message: '선택된 카테고리와 부적절한 필드가 같이 사용되었습니다.',
  })
  @ApiProperty({ enum: CategoriesEnum, example: CategoriesEnum.CAMERA })
  categories: CategoriesEnum;

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
