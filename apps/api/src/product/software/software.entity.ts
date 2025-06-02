import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductModel } from '../product.entity';
import { SoftwareModelMaker } from './software.const';

@Entity()
export class SoftwareModel {
  @Column({ primary: true, generated: true })
  id: number;

  @OneToOne(() => ProductModel, (product) => product.software, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductModel;

  @Column({ enum: Object.values(SoftwareModelMaker), nullable: false })
  maker: SoftwareModelMaker;
}
