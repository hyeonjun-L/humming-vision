import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CategoriesEnum } from './const/categories.const';
import { LensModel } from './lens/lens.entity';
import { FrameGrabberModel } from './frame-grabber/frame-grabber.entity';
import { LogModel } from 'src/admin/entity/log.entity';
import { ImageModel } from './image/image.entity';
import { CameraModel } from './camera/camera.entity';
import { SoftwareModel } from './software/software.entity';

@Entity()
export class ProductModel extends BaseModel {
  @Column({
    enum: Object.values(CategoriesEnum),
  })
  categories: CategoriesEnum;

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

  @OneToMany(() => ImageModel, (image) => image.product, {
    cascade: ['remove'],
  })
  images: ImageModel[];

  @OneToOne(() => CameraModel, (camera) => camera.product, {
    nullable: true,
    cascade: ['remove'],
  })
  camera?: CameraModel;

  @OneToOne(() => LensModel, (lens) => lens.product, {
    nullable: true,
    cascade: ['remove'],
  })
  lens?: LensModel;

  @OneToOne(() => FrameGrabberModel, (fg) => fg.product, {
    nullable: true,
    cascade: ['remove'],
  })
  frameGrabber?: FrameGrabberModel;

  @OneToOne(() => SoftwareModel, (sw) => sw.product, {
    nullable: true,
    cascade: ['remove'],
  })
  software?: SoftwareModel;

  @OneToOne(() => LogModel, (log) => log.product, {
    nullable: true,
    cascade: ['remove'],
  })
  log?: LogModel;
}
