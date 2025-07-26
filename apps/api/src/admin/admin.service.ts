import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  ENV_HASH_ROUNDS_KEY,
  ENV_JWT_ACCESS_EXPIRES,
  ENV_JWT_REFRESH_EXPIRES,
  ENV_JWT_SECRET_KEY,
} from 'src/common/const/env-kets.const';
import { AdminModel } from './entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SessionModel } from './entity/session.entity';
import { JwtPayload } from './types/jwt-payload.types';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminModel)
    private readonly adminRepository: Repository<AdminModel>,
    @InjectRepository(SessionModel)
    private readonly sessionRepository: Repository<SessionModel>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginWithEmail(user: Pick<AdminModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return await this.loginAdmin(existingUser);
  }

  async authenticateWithEmailAndPassword(
    admin: Pick<AdminModel, 'email' | 'password'>,
  ) {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: admin.email },
    });

    if (!existingAdmin) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    const passOk = await bcrypt.compare(admin.password, existingAdmin.password);

    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return existingAdmin;
  }

  async loginAdmin(admin: AdminModel) {
    const accessToken = this.signToken(admin, false);
    const refreshToken = this.signToken(admin, true);
    await this.upsertSession(admin.id, refreshToken);
    return {
      admin,
      accessToken,
      refreshToken,
    };
  }

  signToken(admin: Pick<AdminModel, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: admin.email,
      sub: admin.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      expiresIn: isRefreshToken
        ? Number(this.configService.get(ENV_JWT_REFRESH_EXPIRES))
        : Number(this.configService.get(ENV_JWT_ACCESS_EXPIRES)),
    });
  }

  async registerAdminWithEmail(admin: RegisterAdminDto) {
    const saltRounds = Number(this.configService.get(ENV_HASH_ROUNDS_KEY));
    const hash = await bcrypt.hash(admin.password, saltRounds);

    const newAdmin = this.adminRepository.create({
      ...admin,
      password: hash,
    });

    return await this.adminRepository.save(newAdmin);
  }

  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const token = splitToken[1];

    return token;
  }

  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다.');
    }

    const email = split[0];
    const password = split[1];

    return {
      email,
      password,
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      });

      if (decoded.type === 'refresh') {
        await this.validateRefreshTokenSession(token, decoded.sub);
      }

      return decoded;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException('verifyToken error', message);
    }
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify<JwtPayload>(token, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
    });

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다!',
      );
    }

    const newToken = this.signToken(
      {
        email: decoded.email,
        id: decoded.sub,
      },
      isRefreshToken,
    );

    return newToken;
  }

  async getAdminByEmail(email: string) {
    return this.adminRepository.findOne({
      where: {
        email,
      },
    });
  }

  async upsertSession(adminId: number, token: string) {
    const refreshExpiresMs = Number(
      this.configService.get(ENV_JWT_REFRESH_EXPIRES),
    );
    const expiresAt = new Date(Date.now() + refreshExpiresMs * 1000);

    const session = await this.getSessionByAdminId(adminId);

    if (session) {
      return this.sessionRepository.update(
        { admin: { id: adminId } },
        { token, expiresAt },
      );
    } else {
      return this.sessionRepository.save({
        admin: { id: adminId },
        token,
        expiresAt,
      });
    }
  }

  async getSessionByAdminId(adminId: number) {
    return await this.sessionRepository.findOne({
      where: { admin: { id: adminId } },
    });
  }

  async deleteSessionByAdminId(adminId: number) {
    const result = await this.sessionRepository.delete({
      admin: { id: adminId },
    });

    if (result.affected === 0) {
      throw new BadRequestException(
        '이미 로그아웃 되었거나 세션이 존재하지 않습니다.',
      );
    }

    return;
  }

  async updateSessionByAdminId(token: string) {
    const payload: unknown = this.jwtService.decode(token);
    if (!payload || typeof payload !== 'object' || !('email' in payload)) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    const { email } = payload as { email: string; sub: number; type: string };
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });
    if (!existingAdmin) {
      throw new UnauthorizedException('존재하지 않는 관리자입니다.');
    }
    return await this.upsertSession(existingAdmin.id, token);
  }

  async validateRefreshTokenSession(token: string, id: number) {
    const session = await this.getSessionByAdminId(id);

    if (!session || token !== session.token) {
      await this.deleteSessionByAdminId(id);
      throw new UnauthorizedException('validateRefreshTokenSession error');
    }

    if (session.expiresAt && session.expiresAt.getTime() < Date.now()) {
      await this.deleteSessionByAdminId(id);
      throw new UnauthorizedException('refresh token 세션이 만료되었습니다.');
    }

    return true;
  }

  async deleteAdminById(id: number, adminId: number) {
    if (id === adminId) {
      throw new UnauthorizedException('자신의 계정을 삭제할 수 없습니다.');
    }

    const result = await this.adminRepository.delete({ id });

    if (result.affected === 0) {
      throw new BadRequestException('존재하지 않는 관리자입니다.');
    }

    return;
  }
}
