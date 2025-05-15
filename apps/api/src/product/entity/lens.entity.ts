import { Column, Entity, OneToOne } from 'typeorm';
import { ProductModel } from './product.entity';

enum LensModelType {
  CCTV = 'CCTV',
  TCL = 'TCL',
}

enum LensModelMount {
  C = 'C',
  CS = 'CS',
  F = 'F',
  M = 'M',
}

@Entity()
export class LensModel {
  @Column({ primary: true, generated: true })
  id: number;

  @OneToOne(() => ProductModel, (product) => product.lens)
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
