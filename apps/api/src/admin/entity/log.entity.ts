import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from 'src/common/entity/base.entity';
import { AdminModel } from './admin.entity';
import { actionEnum } from '../const/log.const';

@Entity()
export class LogModel extends BaseModel {
  @Column({ type: 'enum', enum: actionEnum })
  action: actionEnum;

  @Column()
  path: string;

  @ManyToOne(() => AdminModel)
  admin: AdminModel;

  @Column({ type: 'text', nullable: true })
  target: string | null;
}
