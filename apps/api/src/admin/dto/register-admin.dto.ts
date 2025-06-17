import { AdminModel } from '../entity/admin.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { RolesEnum } from '@humming-vision/shared';

export class RegisterAdminDto {
  @IsUnique(() => AdminModel, 'email', {
    message: '이미 존재하는 이메일입니다.',
  })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  role: RolesEnum = RolesEnum.ADMIN;
}
