import { components } from "./schema";

export type GetFrameGrabberQuery =
  components["schemas"]["PaginateFrameGrabberDto"];
export type GetFrameGrabberResponse =
  components["schemas"]["FrameGrabberModel"];

export type FrameGrabberMaker =
  components["schemas"]["FrameGrabberModel"]["maker"];
export type FrameGrabberInterface =
  components["schemas"]["FrameGrabberModel"]["interface"];

export const FrameGrabberMakerEnum = {
  MATROX: "MATROX",
  EURESYS: "EURESYS",
  ADLINK: "ADLINK",
  BASLER: "BASLER",
} as const satisfies Record<FrameGrabberMaker, FrameGrabberMaker>;

export const FrameGrabberInterfaceEnum = {
  GIGE: "GIGE",
  USB: "USB",
  CAMERA_LINK: "CAMERA_LINK",
  COAXPRESS: "COAXPRESS",
} as const satisfies Record<FrameGrabberInterface, FrameGrabberInterface>;
