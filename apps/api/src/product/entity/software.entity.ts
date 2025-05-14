import { Column, Entity, OneToOne } from 'typeorm';
import { ProductModel } from './product.entity';

enum SoftwareModelMaker {
  MATROX = 'MATROX',
  EURESYS = 'EURESYS',
}

@Entity()
export class SoftwareModel {
  @OneToOne(() => ProductModel, (product) => product.software)
  product: ProductModel;

  @Column({ enum: Object.values(SoftwareModelMaker), nullable: false })
  maker: SoftwareModelMaker;
}
