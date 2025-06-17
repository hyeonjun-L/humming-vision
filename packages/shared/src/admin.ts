export interface Admin {
  createdAt: Date;
  email: string;
  id: number;
  name: string;
  role: RolesEnum;
  updatedAt: Date;
}

export enum RolesEnum {
  SUPER = "SUPER",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
}
