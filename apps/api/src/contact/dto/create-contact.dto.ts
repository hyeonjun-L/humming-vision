import {
  IsString,
  IsEmail,
  IsBoolean,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(180)
  subject?: string;

  @IsString()
  @MaxLength(2000)
  message: string;

  @IsBoolean()
  isRead: boolean = false;
}
