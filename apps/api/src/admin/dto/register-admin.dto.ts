import { PickType } from '@nestjs/mapped-types';
import { AdminModel } from '../entity/admin.entity';
import { IsEmail, IsString } from 'class-validator';

export class RegisterAdminDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
