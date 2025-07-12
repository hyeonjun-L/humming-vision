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

export type ContactSearchFields = Extract<
  keyof GetContactQuery,
  `where__${string}__i_like`
>;

export enum ContactSearchFieldEnum {
  NAME = "where__name__i_like",
  EMAIL = "where__email__i_like",
  SUBJECT = "where__subject__i_like",
  COMPANY = "where__company__i_like",
}

export type GetContactResponse = {
  data: Contact[];
  total: number;
};

export type CreateContactDto = components["schemas"]["CreateContactDto"];
