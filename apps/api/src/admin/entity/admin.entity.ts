import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { SessionModel } from './session.entity';
import { LogModel } from './log.entity';
import { RolesEnum } from '@humming-vision/shared';
import { Exclude } from 'class-transformer';

@Entity()
export class AdminModel extends BaseModel {
  @OneToOne(() => SessionModel, (session) => session.admin)
  session?: SessionModel;

  @Column({
    enum: Object.values(RolesEnum),
    nullable: false,
    default: RolesEnum.ADMIN,
  })
  role: RolesEnum;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => LogModel, (log) => log.admin, { nullable: true })
  log?: LogModel;
}
