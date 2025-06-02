import { AdminModel } from '../entity/admin.entity';

export interface AdminRequest extends Request {
  admin: AdminModel;
}

export interface AuthRequest extends AdminRequest {
  token: string;
  tokenType: string;
}
