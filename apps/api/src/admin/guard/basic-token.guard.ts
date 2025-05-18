import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin.service';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('authorization header is missing');
    }

    const token = this.adminService.extractTokenFromHeader(rawToken, false);

    const { email, password } = this.adminService.decodeBasicToken(token);

    const user = await this.adminService.authenticateWithEmailAndPassword({
      email,
      password,
    });

    req.user = user;

    return true;
  }
}
