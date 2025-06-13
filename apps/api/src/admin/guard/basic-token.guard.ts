import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin.service';
import { AdminRequest } from '../types/interfaces.types';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AdminRequest>();

    const rawToken = req.headers['authorization'] as string | undefined;

    if (!rawToken) {
      throw new UnauthorizedException('Basic 토큰이 없습니다.');
    }

    const token = this.adminService.extractTokenFromHeader(rawToken, false);

    const { email, password } = this.adminService.decodeBasicToken(token);

    const admin = await this.adminService.authenticateWithEmailAndPassword({
      email,
      password,
    });

    req.admin = admin;

    return true;
  }
}
