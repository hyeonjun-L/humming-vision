import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContactModel extends BaseModel {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  subject: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  // 동의한 개인정보처리방침 버전. 방침 본문이 외부(Notion)에 있어
  // 나중에 개정되면 어느 시점 내용에 동의했는지 추적할 수 없기에 남긴다.
  // 동의 시각은 createdAt으로 갈음한다(동의 없이는 문의 자체가 생성되지 않음).
  // 동의 절차 도입 이전 데이터가 있어 nullable.
  // 유니온 타입은 TypeORM이 컬럼 타입을 Object로 추론하므로 명시해야 한다
  @Column({ type: 'varchar', nullable: true })
  privacyPolicyVersion: string | null;
}
