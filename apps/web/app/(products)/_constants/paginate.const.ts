export const TAKE = 12;

export type FieldConfig =
  | { type: "enum"; values: string[] }
  | { type: "between" }
  | { type: "like" }
  | { type: "order" }
  | { type: "number" };
