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
