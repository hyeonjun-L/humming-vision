import { QueryRunner as TypeOrmQueryRunner } from 'typeorm';
import { FileType } from 'src/common/const/aws.const';

export interface QueryRunnerRequest extends Request {
  queryRunner: TypeOrmQueryRunner;
}

export interface FileRequest extends Request {
  file: Express.Multer.File;
  fileType: FileType;
}

export interface ExtendedMulterFile extends Express.Multer.File {
  fileType: FileType;
}
