import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueImageOrderInArrayConstraint } from '../validator/is-unique-image-order-in-array.validator';

export function IsUniqueImageOrderInArray(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueImageOrderInArrayConstraint,
    });
  };
}
