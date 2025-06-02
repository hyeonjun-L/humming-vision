import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateProductDto } from '../dto/create-product.dto';
import { CategoriesEnum } from '../const/categories.const';

@ValidatorConstraint({ name: 'CategoryFieldConsistency', async: false })
export class CategoryFieldConsistency implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    const dto = args.object as CreateProductDto;

    switch (dto.categories) {
      case CategoriesEnum.CAMERA:
        return !!dto.camera && !dto.lens && !dto.frameGrabber && !dto.software;
      case CategoriesEnum.LENS:
        return !!dto.lens && !dto.camera && !dto.frameGrabber && !dto.software;
      case CategoriesEnum.FRAMEGRABBER:
        return !!dto.frameGrabber && !dto.camera && !dto.lens && !dto.software;
      case CategoriesEnum.SOFTWARE:
        return !!dto.software && !dto.camera && !dto.lens && !dto.frameGrabber;
      default:
        return false;
    }
  }

  defaultMessage() {
    return `선택된 categories에 맞지 않는 필드가 포함되어 있습니다.`;
  }
}
