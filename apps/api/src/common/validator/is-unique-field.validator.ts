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

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, field] = args.constraints;

    const repo = this.dataSource.getRepository(
      EntityClass as EntityTarget<any>,
    );

    const exists = await repo.findOne({
      where: { [field]: value },
    });

    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const [, field] = args.constraints;
    return `${field} 값이 이미 존재합니다.`;
  }
}
