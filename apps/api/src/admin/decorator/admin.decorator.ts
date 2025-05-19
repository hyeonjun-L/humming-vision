import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { AdminModel } from '../entity/admin.entity';
import { AdminRequest } from '../types/interfaces.types';

export const Admin = createParamDecorator(
  (data: keyof AdminModel | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<AdminRequest>();

    const admin = req.admin;

    if (!admin) {
      throw new InternalServerErrorException(
        'Admin 데코레이터는 AccessTokenGuard와 함께 사용해야합니다. Request에 admin 프로퍼티가 존재하지 않습니다!',
      );
    }

    if (data) {
      return admin[data];
    }

    return admin;
  },
);
