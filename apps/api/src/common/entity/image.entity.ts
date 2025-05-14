import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { ProductModel } from 'src/product/entity/product.entity';

export enum ImageModelType {
  SPEC = 'SPEC',
  PRODUCT = 'PRODUCT',
}

@Entity()
export class ImageModel extends BaseModel {
  @Column({
    default: 0,
  })
  order: number;

  @Column({
    enum: ImageModelType,
    nullable: false,
  })
  type: ImageModelType;

  @Column()
  path: string;

  @ManyToOne((type) => ProductModel, (product) => product.images)
  product?: ProductModel;
}
