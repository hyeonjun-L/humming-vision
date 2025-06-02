import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductModel } from '../product.entity';
import { LensModelMount, LensModelType } from './lens.const';

@Entity()
export class LensModel {
  @Column({ primary: true, generated: true })
  id: number;

  @OneToOne(() => ProductModel, (product) => product.lens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: ProductModel;

  @Column({
    enum: Object.values(LensModelType),
    nullable: false,
  })
  type: LensModelType;

  @Column({
    enum: Object.values(LensModelMount),
    nullable: false,
  })
  mount: LensModelMount;

  @Column()
  maker: string;

  @Column({ type: 'float' })
  resolution: number;

  @Column()
  numericAperture: string;

  @Column()
  fNumnber: string;

  @Column({ type: 'int', nullable: false })
  focalLength: number;

  @Column({ type: 'float', nullable: false })
  formatSize: number;
}
