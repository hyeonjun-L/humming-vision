import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateImageDto } from '../dto/create-image.dto';

@ValidatorConstraint({ name: 'IsUniqueImageOrderInArray', async: false })
export class IsUniqueImageOrderInArrayConstraint
  implements ValidatorConstraintInterface
{
  validate(images: CreateImageDto[]): boolean {
    const seen = new Set<string>();

    for (const image of images) {
      const key = `${image.type}-${image.order}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
    }

    return true;
  }

  defaultMessage(): string {
    return '같은 type과 order 조합의 이미지가 중복되었습니다.';
  }
}
