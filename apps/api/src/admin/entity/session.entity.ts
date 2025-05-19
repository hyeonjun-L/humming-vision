import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AdminModel } from './admin.entity';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class SessionModel extends BaseModel {
  @OneToOne(() => AdminModel, (admin) => admin.session)
  @JoinColumn()
  admin: AdminModel;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  token: string;

  @Column({ nullable: false })
  @IsDate()
  @Type(() => Date)
  expiresAt: Date;
}
