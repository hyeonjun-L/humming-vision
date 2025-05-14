import { Column, OneToOne } from 'typeorm';
import { ProductModel } from './product.entity';
import { InterfaceEnum } from '../const/interface.const';

enum FrameGrabberModelMaker {
  MATROX = 'MATROX',
  EURESYS = 'EURESYS',
  ADLINK = 'ADLINK',
  BASLER = 'BASLER',
}

export class FrameGrabberModel {
  @OneToOne(() => ProductModel, (product) => product.frameGrabber)
  product: ProductModel;

  @Column({ enum: Object.values(FrameGrabberModelMaker), nullable: false })
  maker: FrameGrabberModelMaker;

  @Column({ enum: Object.values(InterfaceEnum), nullable: false })
  interface: InterfaceEnum;

  @Column()
  pcSlot: string;

  @Column()
  connector: string;

  @Column({ type: 'int' })
  memory: number;
}
