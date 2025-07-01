import { components } from "./schema";

export type GetLensQuery = components["schemas"]["PaginateLensDto"];
export type GetLensResponse = components["schemas"]["LensModel"];

export type LensType = components["schemas"]["LensModel"]["type"];
export type LensMount = components["schemas"]["LensModel"]["mount"];

export const LensTypeEnum = {
  CCTV: "CCTV",
  TCL: "TCL",
} as const satisfies Record<LensType, LensType>;

export const LensMountEnum = {
  C: "C",
  CS: "CS",
  F: "F",
  M: "M",
} as const satisfies Record<LensMount, LensMount>;
