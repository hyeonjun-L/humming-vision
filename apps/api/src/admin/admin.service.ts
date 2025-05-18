import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  ENV_HASH_ROUNDS_KEY,
  ENV_JWT_SECRET_KEY,
} from 'src/common/const/env-kets.const';
import { AdminModel } from './entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminModel)
    private readonly adminRepository: Repository<AdminModel>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async loginWithEmail(user: Pick<AdminModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginAdmin(existingUser);
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

  loginAdmin(admin: Pick<AdminModel, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(admin, false),
      refreshToken: this.signToken(admin, true),
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
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  async registerAdminWithEmail(admin: RegisterAdminDto) {
    const saltRounds = Number(this.configService.get(ENV_HASH_ROUNDS_KEY));
    const hash = await bcrypt.hash(admin.password, saltRounds);

    const newAdmin = this.adminRepository.create({
      ...admin,
      password: hash,
    });

    await this.adminRepository.save(newAdmin);

    return newAdmin;
  }

  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다!');
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
}
