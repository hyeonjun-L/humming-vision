import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from './dto/register-admin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_HASH_ROUNDS_KEY } from 'src/common/const/env-kets.const';
import { AdminModel } from './entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminModel)
    private readonly adminRepository: Repository<AdminModel>,
    private readonly configService: ConfigService,
  ) {}

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
}
