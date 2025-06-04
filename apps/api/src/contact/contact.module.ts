import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModel } from './entity/contact.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactModel])],
  controllers: [ContactController],
  providers: [ContactService, CommonService],
})
export class ContactModule {}
