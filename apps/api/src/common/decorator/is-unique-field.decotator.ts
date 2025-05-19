import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueFieldConstraint } from '../validator/is-unique-field.validator';
import { EntityTarget } from 'typeorm';

export function IsUnique(
  entity: EntityTarget<any>,
  field: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsUniqueFieldConstraint,
    });
  };
}
