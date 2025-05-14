import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AdminModel } from './admin.entity';

@Entity()
export class SessionModel extends BaseModel {
  @OneToOne(() => AdminModel, (admin) => admin.session)
  @JoinColumn()
  admin: AdminModel;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  expiresAt: Date;
}
