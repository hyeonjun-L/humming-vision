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
    const [EntityClass, field] = args.constraints as [
      EntityTarget<object>,
      string,
    ];

    const repo = this.dataSource.getRepository(EntityClass);

    const exists = await repo.findOne({
      where: { [field]: value } as Record<string, unknown>,
    });

    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const [, field] = args.constraints as [EntityTarget<object>, string];
    return `${field} 값이 이미 존재합니다.`;
  }
}
