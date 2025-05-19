import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { QueryRunnerRequest } from '../types/interface.types';

export const QueryRunner = createParamDecorator(
  (data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<QueryRunnerRequest>();

    if (!req.queryRunner) {
      throw new InternalServerErrorException(
        `QueryRunner Decorator를 사용하려면 TransactionInterceptor를 적용해야 합니다.`,
      );
    }

    return req.queryRunner;
  },
);
