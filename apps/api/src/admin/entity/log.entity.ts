import { BaseModel } from 'src/common/entity/base.entity';
import { ContactModel } from 'src/contact/entity/contact.entity';
import { ProductModel } from 'src/product/entity/product.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AdminModel } from './admin.entity';

enum actionEnum {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  VIEW_CONTACT = 'VIEW_CONTACT',
  DELECT_CONTACT = 'DELECT_CONTACT',
  CREATE_ADMIN = 'CREATE_ADMIN',
  UPDATE_ADMIN = 'UPDATE_ADMIN',
  DELETE_ADMIN = 'DELETE_ADMIN',
}

@Entity()
export class LogModel extends BaseModel {
  @Column({ enum: Object.values(actionEnum), nullable: false })
  action: actionEnum;

  @OneToOne(() => ProductModel, (product) => product.log)
  @JoinColumn()
  product: ProductModel;

  @OneToOne(() => ContactModel, (contact) => contact.log)
  @JoinColumn()
  contact: ContactModel;

  @OneToOne(() => AdminModel, (admin) => admin.log)
  @JoinColumn()
  admin: AdminModel;
}
