import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueFieldConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [entityGetter, field] = args.constraints as [
      () => EntityTarget<object>,
      string,
    ];

    const EntityClass = entityGetter();

    const repo = this.dataSource.getRepository(EntityClass);

    const object = args.object as { id?: number };

    const existing = await repo.findOne({
      where: { [field]: value } as Record<string, unknown>,
    });

    if (!existing) return true;

    if (object?.id && (existing as { id?: number }).id === object.id)
      return true;

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const [, field] = args.constraints as [EntityTarget<object>, string];
    return `${field} 값이 이미 존재합니다.`;
  }
}
