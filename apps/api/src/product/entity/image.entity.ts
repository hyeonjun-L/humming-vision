import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { ProductModel } from 'src/product/entity/product.entity';
import { BaseModel } from 'src/common/entity/base.entity';

export enum ImageModelType {
  SPEC = 'SPEC',
  PRODUCT = 'PRODUCT',
}

@Unique(['product', 'type', 'order'])
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

  @ManyToOne(() => ProductModel, (product) => product.images)
  product?: ProductModel;
}
