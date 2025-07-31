import { BadRequestException } from '@nestjs/common';
import {
  ExtendedMulterFile,
  FileRequest,
} from 'src/common/types/interface.types';
import { FileType } from '../const/aws.const';
import { extname } from 'path';

/**
 * fileTypeFilter는 단일/다중 파일 업로드 모두 지원하도록 타입을 분리합니다.
 * - 단일 파일: req(FileRequest)에 fileType 저장
 * - 다중 파일: file(ExtendedMulterFile)에 fileType 저장
 */
export function fileTypeFilter() {
  return (
    req: FileRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file || !file.originalname) {
      return cb(
        new BadRequestException('파일 정보가 유효하지 않습니다.'),
        false,
      );
    }

    const ext = extname(file.originalname).toLowerCase();

    if (file.mimetype.startsWith('image/')) {
      req.fileType = FileType.IMAGE;
      (file as ExtendedMulterFile).fileType = FileType.IMAGE;
      return cb(null, true);
    }

    const allowedExtensions = ['.pdf', '.dwg', '.stp'];

    if (allowedExtensions.includes(ext)) {
      req.fileType = FileType.PDF;
      (file as ExtendedMulterFile).fileType = FileType.PDF;
      return cb(null, true);
    }

    return cb(new BadRequestException('허용되지 않은 파일 형식입니다.'), false);
  };
}
