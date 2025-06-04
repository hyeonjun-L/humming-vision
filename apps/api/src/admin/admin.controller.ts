import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { Roles } from './decorator/roles.decorator';
import { RolesEnum } from './const/role.const';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { Admin } from './decorator/admin.decorator';
import { AdminModel } from './entity/admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async tokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, true);
    const newAccessToken = this.adminService.rotateToken(token, false);
    const newRefreshToken = this.adminService.rotateToken(token, true);
    await this.adminService.updateSessionByAdminId(newRefreshToken);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async tokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, true);
    const newToken = this.adminService.rotateToken(token, true);
    await this.adminService.updateSessionByAdminId(newToken);
    return {
      refreshToken: newToken,
    };
  }

  @Post('register')
  @Roles(RolesEnum.SUPER)
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.adminService.registerAdminWithEmail(registerAdminDto);
  }

  @Post('login')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  async postLoginEmail(@Headers('authorization') rawToken: string) {
    const token = this.adminService.extractTokenFromHeader(rawToken, false);
    const credentials = this.adminService.decodeBasicToken(token);
    const { accessToken, refreshToken, admin } =
      await this.adminService.loginWithEmail(credentials);

    await this.adminService.upsertSession(admin.id, refreshToken);

    return { accessToken, refreshToken, admin };
  }

  @Post('logout')
  postLogout(@Admin() admin: AdminModel) {
    return this.adminService.deleteSessionByAdminId(admin.id);
  }

  // @Delete('delete')
  // @Roles(RolesEnum.SUPER)
  // deleteAdmin(@Body('id') id: number, @Admin() admin: AdminModel) {
  //   return this.adminService.deleteAdminById(id, admin.id);
  // }
}
