import {
  CameraTypeEnum,
  CategoriesEnum,
  FrameGrabberInterfaceEnum,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";

export const PRODUCT_TYPES = {
  [CategoriesEnum.CAMERA]: {
    AREA: CameraTypeEnum.AREA,
    LINE: CameraTypeEnum.LINE,
  },
  [CategoriesEnum.FRAMEGRABBER]: {
    CAMERA_LINK: FrameGrabberInterfaceEnum.CAMERA_LINK,
    USB: FrameGrabberInterfaceEnum.USB,
    COAXPRESS: FrameGrabberInterfaceEnum.COAXPRESS,
    GIGE: FrameGrabberInterfaceEnum.GIGE,
  },
  [CategoriesEnum.LENS]: {
    CCTV: LensTypeEnum.CCTV,
    TCL: LensTypeEnum.TCL,
  },
  [CategoriesEnum.LIGHT]: {
    "": "",
    DOWNLOAD: "DOWNLOAD",
  },
  ETC: {
    [CategoriesEnum.SOFTWARE]: {
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
