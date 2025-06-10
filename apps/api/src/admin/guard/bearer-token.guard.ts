import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/common/decorator/is-public.decorator';
import { AdminService } from '../admin.service';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from '../types/interfaces.types';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    const rawToken = req.headers['authorization'] as string | undefined;

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다!');
    }

    const token = this.adminService.extractTokenFromHeader(rawToken, true);

    const result = await this.adminService.verifyToken(token);

    const admin = await this.adminService.getAdminByEmail(result.email);

    if (!admin) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    req.admin = admin;
    req.token = token;
    req.tokenType = result.type;

    return true;
  }
}

@Injectable()
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reflector = new Reflector();
    const isPublic: boolean | undefined = reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    const req = context.switchToHttp().getRequest<AuthRequest>();

    if (isPublic) {
      return true;
    }

    await super.canActivate(context);

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest<AuthRequest>();

    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }

    return true;
  }
}
