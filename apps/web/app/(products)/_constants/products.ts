import {
  CameraTypeEnum,
  FrameGrabberInterfaceEnum,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";

export enum RouteCategory {
  FRAMEGRABBER = "frame-grabber",
  CAMERA = "camera",
  LENS = "lens",
  LIGHT = "light",
  ETC = "etc",
}

export const PRODUCT_TYPES = {
  [RouteCategory.CAMERA]: {
    AREA: CameraTypeEnum.AREA,
    LINE: CameraTypeEnum.LINE,
  },
  [RouteCategory.FRAMEGRABBER]: {
    CAMERA_LINK: FrameGrabberInterfaceEnum.CAMERA_LINK,
    USB: FrameGrabberInterfaceEnum.USB,
    COAXPRESS: FrameGrabberInterfaceEnum.COAXPRESS,
    GIGE: FrameGrabberInterfaceEnum.GIGE,
  },
  [RouteCategory.LENS]: {
    CCTV: LensTypeEnum.CCTV,
    TCL: LensTypeEnum.TCL,
  },
  [RouteCategory.LIGHT]: {
    "": "",
    DOWNLOAD: "DOWNLOAD",
  },
  [RouteCategory.ETC]: {
    SOFTWARE: {
      EURESYS: SoftwareMakerEnum.EURESYS,
      MATROX: SoftwareMakerEnum.MATROX,
    },
    ACCESSORY: {
      CONVERTER: "CONVERTER",
      CABLE: "CABLE",
      BRACKET: "BRACKET",
    },
  },
} as const;

export const ROUTE_CATEGORY_DISPLAY_NAMES = {
  [RouteCategory.FRAMEGRABBER]: "Frame Grabber",
  [RouteCategory.CAMERA]: "Camera",
  [RouteCategory.LENS]: "Lens",
  [RouteCategory.LIGHT]: "Light",
  [RouteCategory.ETC]: "ETC",
} as const;

export const TYPE_DISPLAY_NAMES = {
  AREA: "Area Camera",
  LINE: "Line Scan Camera",

  CCTV: "CCTV Lens",
  TCL: "TCL Lens",

  LINK: "Camera Link",
  USB: "USB",
  COAXPRESS: "CoaXPress",
  GIGE: "GigE",

  LIGHT: "Light",
  DOWNLOAD: "Download",

  SOFTWARE: "Software",
  ACCESSORY: "Accessory",
} as const;
