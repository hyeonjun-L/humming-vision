import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.registerAdminWithEmail(registerAdminDto);
  }

  @Post('login')
  postLoginEmail(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, false);

    const credentials = this.adminService.decodeBasicToken(token);

    return this.adminService.loginWithEmail(credentials);
  }
}
