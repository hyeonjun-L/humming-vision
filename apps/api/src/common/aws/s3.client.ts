import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {
  ENV_AWS_ACCESS_KEY_ID_KEY,
  ENV_AWS_REGION_KEY,
  ENV_AWS_S3_BUCKET_KEY,
  ENV_AWS_SECRET_ACCESS_KEY,
} from '../const/env-kets.const';

export function createS3Client(configService: ConfigService): S3Client {
  return new S3Client({
    region: configService.get<string>(ENV_AWS_REGION_KEY),
    credentials: {
      accessKeyId: configService.get<string>(ENV_AWS_ACCESS_KEY_ID_KEY)!,
      secretAccessKey: configService.get<string>(ENV_AWS_SECRET_ACCESS_KEY)!,
    },
  });
}

export function getBucketName(configService: ConfigService): string {
  return configService.get<string>(ENV_AWS_S3_BUCKET_KEY)!;
}
