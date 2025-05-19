import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModel } from './entity/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { SessionModel } from './entity/session.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([AdminModel, SessionModel]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
