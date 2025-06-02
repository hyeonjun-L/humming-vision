import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsValidImageOrderGloballyConstraint } from '../validator/is-unique-image-order-globally.validator';

export function IsValidImageOrderGlobally(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidImageOrderGlobally',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidImageOrderGloballyConstraint,
    });
  };
}
