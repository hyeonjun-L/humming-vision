import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../const/role.const';

export const ROLES_KEY = 'user_roles';

// @Roles(RolesEnum.ADMIN)
export const Roles = (role: RolesEnum) => SetMetadata(ROLES_KEY, role);
