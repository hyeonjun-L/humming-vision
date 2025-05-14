import { Column, OneToOne } from 'typeorm';
import { ProductModel } from './product.entity';

enum SoftwareModelMaker {
  MATROX = 'MATROX',
  EURESYS = 'EURESYS',
}

export class SoftwareModel {
  @OneToOne(() => ProductModel, (product) => product.software)
  product: ProductModel;

  @Column({ enum: Object.values(SoftwareModelMaker), nullable: false })
  maker: SoftwareModelMaker;
}
