import { AdminModel } from '../entity/admin.entity';
import { Request } from 'express';

export interface AdminRequest extends Request {
  admin: AdminModel;
}

export interface AuthRequest extends AdminRequest {
  token: string;
  tokenType: string;
}
