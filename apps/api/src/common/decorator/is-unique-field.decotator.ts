import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueFieldConstraint } from '../validator/is-unique-field.validator';

export function IsUnique(
  entity: Function,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueFieldConstraint,
    });
  };
}
