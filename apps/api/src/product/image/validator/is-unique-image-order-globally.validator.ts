import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { ImageModel } from '../image.entity';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UpdateImageDto } from '../dto/update-image.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

@ValidatorConstraint({ name: 'IsValidImageOrderGlobally', async: true })
@Injectable()
export class IsValidImageOrderGloballyConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly dataSource: DataSource) {}

  async validate(
    images: UpdateImageDto[],
    args: ValidationArguments,
  ): Promise<boolean> {
    const dto = args.object as UpdateProductDto;

    if (!images || images.length === 0) return true;

    for (const image of images) {
      const count = await this.dataSource.getRepository(ImageModel).count({
        where: {
          product: { id: dto.id },
          type: image.type,
          order: image.order,
          id: Not(image.id),
        },
      });

      if (count > 0) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(): string {
    return '이미 해당 type에서 order가 중복된 이미지가 존재합니다.';
  }
}
