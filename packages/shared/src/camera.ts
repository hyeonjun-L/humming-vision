import { components } from "./schema";

export type GetCameraQuery = components["schemas"]["PaginateCameraDto"];
export type GetCameraResponse = components["schemas"]["CameraModel"];

export type CameraInterface = components["schemas"]["CameraModel"]["interface"];
export type CameraType = components["schemas"]["CameraModel"]["type"];
export type CameraColor = components["schemas"]["CameraModel"]["color"];
export type CameraMaker = components["schemas"]["CameraModel"]["maker"];

export const CameraInterfaceEnum = {
  GIGE: "GIGE",
  USB: "USB",
  CAMERA_LINK: "CAMERA_LINK",
  COAXPRESS: "COAXPRESS",
} as const satisfies Record<CameraInterface, CameraInterface>;

export const CameraTypeEnum = {
  AREA: "AREA",
  LINE: "LINE",
} as const satisfies Record<CameraType, CameraType>;

export const CameraColorEnum = {
  MONO: "MONO",
  COLOR: "COLOR",
} as const satisfies Record<CameraColor, CameraColor>;

export const CameraMakerEnum = {
  CREVIS: "CREVIS",
  VIEWORKS: "VIEWORKS",
  BASLER: "BASLER",
  HIK: "HIK",
  HUARAY: "HUARAY",
  JAI: "JAI",
} as const satisfies Record<CameraMaker, CameraMaker>;
