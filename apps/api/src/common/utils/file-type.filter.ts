import { BadRequestException } from '@nestjs/common';
import {
  ExtendedMulterFile,
  FileRequest,
} from 'src/common/types/interface.types';
import { FileType } from '../const/aws.const';

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
    if (file.mimetype.startsWith('image/')) {
      req.fileType = FileType.IMAGE;
      (file as ExtendedMulterFile).fileType = FileType.IMAGE;
      return cb(null, true);
    }

    if (file.mimetype === 'application/pdf') {
      req.fileType = FileType.PDF;
      (file as ExtendedMulterFile).fileType = FileType.PDF;
      return cb(null, true);
    }

    return cb(
      new BadRequestException('이미지 또는 PDF 파일만 업로드할 수 있습니다.'),
      false,
    );
  };
}
