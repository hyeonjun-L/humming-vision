import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueImageOrderConstraint } from '../image/validator/is-unique-image-order.validator';

// 추후 이미지 order 업데이트 기능 구현 하면서 수정 예전
export function IsUniqueImageOrder(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueImageOrderConstraint,
    });
  };
}
