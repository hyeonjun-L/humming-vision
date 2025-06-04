import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContactModel extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column()
  company: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  subject: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;
}
