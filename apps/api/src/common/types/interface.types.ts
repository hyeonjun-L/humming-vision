import { QueryRunner as TypeOrmQueryRunner } from 'typeorm';

export interface QueryRunnerRequest extends Request {
  queryRunner: TypeOrmQueryRunner;
}
