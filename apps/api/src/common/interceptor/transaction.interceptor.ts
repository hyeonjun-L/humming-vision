import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, finalize, from } from 'rxjs';
import { DataSource } from 'typeorm';
import { QueryRunnerRequest } from '../types/interface.types';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<QueryRunnerRequest>();

    const qr = this.dataSource.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    req.queryRunner = qr;

    return next.handle().pipe(
      catchError((e) => {
        return from(
          (async () => {
            await qr.rollbackTransaction();
            await qr.release();
            throw e;
          })(),
        );
      }),
      finalize(() => {
        void (async () => {
          await qr.commitTransaction();
          await qr.release();
        })();
      }),
    );
  }
}
