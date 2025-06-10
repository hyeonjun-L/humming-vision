import { components, paths } from "@humming-vision/shared";

export enum RoutePath {
  HOME = "/",
  CAMERA = "/camera",
  LENS = "/lens",
  FRAMEGRABBER = "/frame-grabber",
  LIGHT = "/light",
  ETC = "/etc",
  CONTACT = "/contact",
}

export enum RoutePathWithCategory {
  AREA = "/area",
  LINE = "/line",
  CCTV = "/cctv",
  TCL = "/tcl",
  COAXPRESS = "/coaxpress",
  LINK = "/link",
  GIGE = "/gige",
  USB = "/usb",
  DOWNLOAD = "/download",
  SOFTWARE = "/software",
  ACCESSORY = "/accessory",
}

export type ProductEntity = components["schemas"]["CreateProductDto"];
export type CreateProductDto = components["schemas"]["CreateProductDto"];
