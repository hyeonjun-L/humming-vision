import {
  IsString,
  IsEmail,
  IsBoolean,
  MaxLength,
  IsOptional,
  Equals,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

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

  // 개인정보 수집·이용 동의. 프론트 검증만 두면 API 직접 호출로 우회되므로
  // 서버에서도 true가 아닌 요청은 거부한다.
  @IsBoolean()
  @Equals(true, { message: '개인정보 수집·이용 동의가 필요합니다.' })
  privacyConsent: boolean;

  @IsBoolean()
  isRead: boolean = false;
}
