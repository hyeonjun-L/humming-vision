import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { LogModel } from 'src/admin/entity/log.entity';
import { actionEnum } from 'src/admin/const/log.const';
import { AdminService } from 'src/admin/admin.service';
import { ACTION_MAP } from '../const/log.const';

interface RequestBody {
  id?: string;
  name?: string;
}

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(LogModel)
    private readonly logRepository: Repository<LogModel>,
    private readonly adminService: AdminService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const rawToken = req.headers['authorization'];
      if (!rawToken) return next();

      const token = this.adminService.extractTokenFromHeader(rawToken, true);
      const result = await this.adminService.verifyToken(token);

      const action = this.extractAction(req);
      if (!action) return next();

      const body = req.body as RequestBody;

      const log = this.logRepository.create({
        action,
        path: req.originalUrl,
        admin: { id: result.sub },
        target: body?.id ?? body?.name ?? null,
      });

      await this.logRepository.save(log);
    } catch (err) {
      console.error('LogMiddleware error:', err);
    }

    next();
  }
  private extractAction(req: Request): actionEnum | undefined {
    const { method, url } = req;
    return ACTION_MAP.find(
      (item) => item.method === method && url.includes(item.urlIncludes),
    )?.action;
  }
}
