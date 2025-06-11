import { IsNotEmpty, IsUrl } from 'class-validator';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { ProductModel } from 'src/product/product.entity';

export class CreateLightDto {
  @IsNotEmpty()
  @IsUnique(ProductModel, 'name', { message: '이미 존재하는 제품명입니다.' })
  name: string;

  @IsNotEmpty()
  @IsUrl()
  catalogUrl: string;
}
