import { components, operations } from "./schema";

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

export type GetContactQuery =
  operations["ContactController_getContacts"]["parameters"]["query"];

// ContactController_getContacts
