import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductModel } from '../product.entity';
import { InterfaceEnum } from '../const/interface.const';
import { FrameGrabberModelMaker } from './frame-grabber.const';

@Entity()
export class FrameGrabberModel {
  @Column({ primary: true, generated: true })
  id: number;

  @OneToOne(() => ProductModel, (product) => product.frameGrabber)
  @JoinColumn()
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
