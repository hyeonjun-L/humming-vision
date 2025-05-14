import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { SessionModel } from './session.entity';
import { LogModel } from './log.entity';

export enum AdminModelRole {
  SUPER = 'SUPER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

@Entity()
export class AdminModel extends BaseModel {
  @OneToOne(() => SessionModel, (session) => session.admin)
  session?: SessionModel;

  @Column({ enum: Object.values(AdminModelRole), nullable: false })
  role: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => LogModel, (log) => log.admin, { nullable: true })
  log?: LogModel;
}
