import { IsNotEmpty, IsOptional, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { ProductModel } from '../product.entity';
import { CreateImageDto } from '../image/dto/create-image.dto';
import { IsUniqueImageOrderInArray } from '../decorator/is-unique-image-order-in-array.decorator';

export class BaseProductDto {
  @IsNotEmpty()
  @IsUnique(() => ProductModel, 'name', {
    message: '이미 존재하는 제품명입니다.',
  })
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
}
