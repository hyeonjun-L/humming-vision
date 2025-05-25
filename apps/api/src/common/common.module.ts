import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { AwsService } from './aws/aws.service';
import { AwsController } from './aws/aws.controller';

@Module({
  controllers: [CommonController, AwsController],
  providers: [CommonService, AwsService],
  exports: [CommonService, AwsService],
})
export class CommonModule {}
