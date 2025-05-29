import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/common/aws/aws.service';
import {
  ExtendedMulterFile,
  FileRequest,
} from 'src/common/types/interface.types';

import { CommonService } from './common.service';
import { fileTypeFilter } from './utils/file-type.filter';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly awsService: AwsService,
  ) {}

  @Post('asset/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileTypeFilter(),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: FileRequest,
  ) {
    if (!file) {
      throw new BadRequestException(
        '파일이 존재하지 않거나 유효하지 않습니다.',
      );
    }

    const fileType = req.fileType;
    const url = await this.awsService.uploadFile(file, fileType);
    return { url };
  }

  @Post('asset/upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: fileTypeFilter(),
    }),
  )
  async uploadMultiple(@UploadedFiles() files: ExtendedMulterFile[]) {
    const urls = await Promise.all(
      files.map((file) => this.awsService.uploadFile(file, file.fileType)),
    );
    return { urls };
  }
}
