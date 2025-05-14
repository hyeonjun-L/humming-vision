import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CatagoriesEnum } from '../const/categories.const';
import { ImageModel } from 'src/common/entity/image.entity';
import { CameraModel } from './camera.entity';
import { LensModel } from './lens.entity';
import { FrameGrabberModel } from './frame-grabber.entity';
import { SoftwareModel } from './software.entity';

@Entity()
export class ProductModel extends BaseModel {
  @Column({
    enum: Object.values(CatagoriesEnum),
  })
  categories: CatagoriesEnum;

  @Column({
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({ type: 'text', nullable: false })
  mainFeature: string;

  @Column()
  datasheetUrl: string;

  @Column()
  drawingUrl: string;

  @Column()
  manualUrl: string;

  @OneToMany((type) => ImageModel, (image) => image.product)
  images: ImageModel[];

  @OneToOne(() => CameraModel, (camera) => camera.product, { nullable: true })
  camera?: CameraModel;

  @OneToOne(() => LensModel, (lens) => lens.product, { nullable: true })
  lens?: LensModel;

  @OneToOne(() => FrameGrabberModel, (fg) => fg.product, { nullable: true })
  frameGrabber?: FrameGrabberModel;

  @OneToOne(() => SoftwareModel, (sw) => sw.product, { nullable: true })
  software?: SoftwareModel;
}
