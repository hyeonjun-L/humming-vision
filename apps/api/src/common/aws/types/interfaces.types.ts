import { FileType } from 'src/common/const/aws.const';

export interface FileRequest extends Request {
  file: Express.Multer.File;
  fileType: FileType;
}

export interface ExtendedMulterFile extends Express.Multer.File {
  fileType: FileType;
}
