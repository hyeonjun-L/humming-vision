import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { createS3Client, getBucketName } from './s3.client';

@Injectable()
export class AwsService {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = createS3Client(this.configService);
    this.bucketName = getBucketName(this.configService);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `image/${uuid()}${extname(file.originalname)}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}
