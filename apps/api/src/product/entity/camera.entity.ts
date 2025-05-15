import { Column, Entity, In, JoinColumn, OneToOne } from 'typeorm';
import { ProductModel } from './product.entity';
import { InterfaceEnum } from '../const/interface.const';

enum CameraModelType {
  AREA = 'AREA',
  LINE = 'LINE',
}

enum CameraModelColor {
  MONO = 'MONO',
  COLOR = 'COLOR',
}

enum CameraModelMaker {
  CREVIS = 'CREVIS',
  VIEWORKS = 'VIEWORKS',
  BASLER = 'BASLER',
  HIK = 'HIK',
  HUARAY = 'HUARAY',
  JAI = 'JAI',
}

@Entity()
export class CameraModel {
  @Column({ primary: true, generated: true })
  id: number;

  @OneToOne(() => ProductModel, (product) => product.camera)
  @JoinColumn()
  product: ProductModel;

  @Column({
    enum: Object.values(InterfaceEnum),
    nullable: false,
  })
  interface: InterfaceEnum;

  @Column({
    enum: Object.values(CameraModelType),
    nullable: false,
  })
  type: CameraModelType;

  @Column({
    enum: Object.values(CameraModelColor),
    nullable: false,
  })
  color: CameraModelColor;

  @Column({
    enum: Object.values(CameraModelMaker),
    nullable: false,
  })
  maker: CameraModelMaker;

  @Column({ type: 'int', nullable: false })
  resolutionX: number;

  @Column({ type: 'int', nullable: false })
  resolutionY: number;

  @Column({ type: 'int', nullable: false })
  speed: number;

  @Column({ type: 'int' })
  pixelSize: number;

  @Column()
  formatSize: string;

  @Column()
  mountType: string;

  @Column()
  sensor: string;
}
