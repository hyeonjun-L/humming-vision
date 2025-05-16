import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../entity/product.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueProductNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}

  async validate(name: string) {
    const exists = await this.productRepository.findOne({
      where: { name },
    });

    return !exists;
  }

  defaultMessage(args: ValidationArguments) {
    return '이미 존재하는 제품명입니다.';
  }
}

export function IsUniqueProductName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueProductNameConstraint,
    });
  };
}
