import { components } from "./schema";

export interface Contact
  extends Pick<
    components["schemas"]["ContactModel"],
    | "id"
    | "createdAt"
    | "name"
    | "company"
    | "email"
    | "subject"
    | "message"
    | "isRead"
  > {}
