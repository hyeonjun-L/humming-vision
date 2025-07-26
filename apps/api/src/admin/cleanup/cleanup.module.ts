import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleanupController } from './cleanup.controller';
import { CleanupService } from './cleanup.service';
import { ProductModel } from 'src/product/product.entity';
import { AwsService } from 'src/common/aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  controllers: [CleanupController],
  providers: [CleanupService, AwsService],
})
export class CleanupModule {}
