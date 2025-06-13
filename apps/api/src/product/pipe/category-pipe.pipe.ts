import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CategoriesEnum } from '../const/categories.const';

@Injectable()
export class ParseCategoryPipe
  implements PipeTransform<string, CategoriesEnum>
{
  private readonly map: Record<string, CategoriesEnum> = {
    software: CategoriesEnum.SOFTWARE,
    camera: CategoriesEnum.CAMERA,
    'frame-grabber': CategoriesEnum.FRAMEGRABBER,
    lens: CategoriesEnum.LENS,
    light: CategoriesEnum.LIGHT,
  };

  transform(value: string): CategoriesEnum {
    const key = value.toLowerCase();
    const result = this.map[key];

    if (!result) {
      const allowed = Object.keys(this.map).join(', ');
      throw new BadRequestException(
        `Invalid category: '${value}'. Allowed values: ${allowed}`,
      );
    }

    return result;
  }
}
