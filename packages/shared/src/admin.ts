import { components } from "./schema";

export interface Admin
  extends Pick<
    components["schemas"]["AdminModel"],
    "id" | "email" | "name" | "role" | "createdAt" | "updatedAt"
  > {}

export enum RolesEnum {
  SUPER = "SUPER",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface DeleteS3Response {
  deletedKeys: string[];
  totalDeleted: number;
}
