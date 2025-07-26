import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductModel } from '../product.entity';

@Entity()
export class LightModel {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  catalogUrl: string;

  @OneToOne(() => ProductModel, (product) => product.light, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductModel;
}
