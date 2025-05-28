import { registerDecorator, ValidationOptions } from 'class-validator';
import { CategoryFieldConsistency } from '../validator/category-field.validator';

export function IsCategoryFieldConsistent(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCategoryFieldConsistent',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: CategoryFieldConsistency,
    });
  };
}
