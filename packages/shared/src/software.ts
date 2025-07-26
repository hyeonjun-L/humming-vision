import { components } from "./schema";

export type GetSoftwareQuery = components["schemas"]["PaginateSoftwareDto"];
export type GetSoftwareResponse = components["schemas"]["SoftwareModel"];

export type SoftwareMaker = components["schemas"]["SoftwareModel"]["maker"];

export const SoftwareMakerEnum = {
  MATROX: "MATROX",
  EURESYS: "EURESYS",
} as const satisfies Record<SoftwareMaker, SoftwareMaker>;
