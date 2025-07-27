import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { Roles } from './decorator/roles.decorator';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { Admin } from './decorator/admin.decorator';
import { AdminModel } from './entity/admin.entity';
import { RolesEnum, TokenResponse } from '@humming-vision/shared';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async tokenAccess(
    @Headers('authorization') rawToken: string,
  ): Promise<TokenResponse> {
    console.log(`Access token requested with header: ${rawToken}`);

    const token = this.adminService.extractTokenFromHeader(rawToken, true);

    console.log(`Access token requested with token: ${token}`);

    const newAccessToken = this.adminService.rotateToken(token, false);
    const newRefreshToken = this.adminService.rotateToken(token, true);

    console.log('Updating session with new refresh token...');

    await this.adminService.updateSessionByAdminId(newRefreshToken);

    console.log(`New access token generated: ${newAccessToken}`);

    console.log(`New refresh token generated: ${newRefreshToken}`);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  @Post('token/refresh')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
  async tokenRefresh(
    @Headers('authorization') rawToken: string,
  ): Promise<Pick<TokenResponse, 'refreshToken'>> {
    const token = this.adminService.extractTokenFromHeader(rawToken, true);
    const newToken = this.adminService.rotateToken(token, true);
    await this.adminService.updateSessionByAdminId(newToken);
    return {
      refreshToken: newToken,
    };
  }

  @Post('register')
  @Roles(RolesEnum.SUPER)
  registerAdmin(
    @Body() registerAdminDto: RegisterAdminDto,
  ): Promise<AdminModel> {
    return this.adminService.registerAdminWithEmail(registerAdminDto);
  }

  @Post('login')
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  async postLoginEmail(
    @Headers('authorization') rawToken: string,
  ): Promise<TokenResponse & { admin: AdminModel }> {
    const token = this.adminService.extractTokenFromHeader(rawToken, false);
    const credentials = this.adminService.decodeBasicToken(token);
    const { accessToken, refreshToken, admin } =
      await this.adminService.loginWithEmail(credentials);

    await this.adminService.upsertSession(admin.id, refreshToken);

    return { accessToken, refreshToken, admin };
  }

  @Delete('logout')
  @HttpCode(204)
  postLogout(@Admin() admin: Pick<AdminModel, 'id'>) {
    return this.adminService.deleteSessionByAdminId(admin.id);
  }

  @Delete(':id')
  @Roles(RolesEnum.SUPER)
  @HttpCode(204)
  deleteAdmin(
    @Admin() admin: Pick<AdminModel, 'id'>,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.adminService.deleteAdminById(id, admin.id);
  }
}
