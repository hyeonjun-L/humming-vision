import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ImageModel } from '../image.entity';
import { CreateImageDto } from '../dto/create-image.dto';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueImageOrderConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const dto = args.object as CreateImageDto;
    const count = await this.dataSource.getRepository(ImageModel).count({
      where: {
        // product: { id: dto.productId },
        type: dto.type,
        order: value,
      },
    });
    return count === 0;
  }

  defaultMessage() {
    return '이미 해당 type에서 order가 중복된 이미지가 존재합니다.';
  }
}
