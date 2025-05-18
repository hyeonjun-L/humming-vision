import { AdminModel } from '../entity/admin.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/common/decorator/is-unique-field.decotator';
import { AdminModelRole } from '../const/role.const';
import { Transform } from 'class-transformer';

export class RegisterAdminDto {
  @IsUnique(AdminModel, 'email', { message: '이미 존재하는 이메일입니다.' })
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(AdminModelRole)
  role: AdminModelRole = AdminModelRole.ADMIN;
}
