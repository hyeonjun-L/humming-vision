import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('token/access')
  tokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, true);

    const newToken = this.adminService.rotateToken(token, false);

    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  tokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, true);

    const newToken = this.adminService.rotateToken(token, true);

    return {
      refreshToken: newToken,
    };
  }

  @Post('register')
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.registerAdminWithEmail(registerAdminDto);
  }

  @Post('login')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  postLoginEmail(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, false);

    const credentials = this.adminService.decodeBasicToken(token);

    return this.adminService.loginWithEmail(credentials);
  }
}
