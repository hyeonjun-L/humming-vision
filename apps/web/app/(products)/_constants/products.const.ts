import {
  CameraProduct,
  CameraTypeEnum,
  FrameGrabberInterfaceEnum,
  FrameGrabberProduct,
  GetCameraQuery,
  GetFrameGrabberQuery,
  GetLensQuery,
  LensProduct,
  LensTypeEnum,
  LightProduct,
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

export type CategoryQueryMap = {
  [RouteCategory.CAMERA]: GetCameraQuery;
  [RouteCategory.FRAMEGRABBER]: GetFrameGrabberQuery;
  [RouteCategory.LENS]: GetLensQuery;
  [RouteCategory.LIGHT]: null;
  [RouteCategory.ETC]: null;
};

export type GetProductQuery<C extends keyof CategoryQueryMap> =
  CategoryQueryMap[C];

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

export const CAMERA_CARD_FIELDS: {
  label: string;
  accessor: (product: CameraProduct) => React.ReactNode;
}[] = [
  {
    label: "해상도",
    accessor: (product) =>
      `${product.camera.resolutionX} x ${product.camera.resolutionY}`,
  },
  {
    label: "속도",
    accessor: (product) =>
      `${product.camera.speed}${product.camera.type === "AREA" ? "fps" : "k"}`,
  },
  {
    label: "픽셀사이즈",
    accessor: (product) => `${product.camera.pixelSize}um`,
  },
  {
    label: "포맷사이즈",
    accessor: (product) => product.camera.formatSize,
  },
  {
    label: "마운트",
    accessor: (product) => product.camera.mountType,
  },
  {
    label: "센서",
    accessor: (product) => product.camera.sensor,
  },
  {
    label: "인터페이스",
    accessor: (product) => product.camera.interface,
  },
];

export const LENS_CARD_FIELDS: {
  label: string;
  accessor: (product: LensProduct) => React.ReactNode;
}[] = [
  {
    label: "초점거리",
    accessor: (product) =>
      `${product.lens.focalLength}${product.lens.type === "CCTV" ? "mm" : "x"}`,
  },
  {
    label: "해상력",
    accessor: (product) => `${product.lens.resolution}MP`,
  },
  {
    label: "N/A",
    accessor: (product) => product.lens.numericAperture,
  },
  {
    label: "F/#",
    accessor: (product) => product.lens.fNumnber,
  },
  {
    label: "포맷사이즈",
    accessor: (product) => product.lens.formatSize,
  },
  {
    label: "마운트",
    accessor: (product) => product.lens.mount,
  },
];

export const FRAME_GRABBER_CARD_FIELDS: {
  label: string;
  accessor: (product: FrameGrabberProduct) => React.ReactNode;
}[] = [
  {
    label: "인터페이스",
    accessor: (product) => product.frameGrabber.interface,
  },
  {
    label: "Memory",
    accessor: (product) => `${product.frameGrabber.memory}GB`,
  },
  {
    label: "PC Slot",
    accessor: (product) => product.frameGrabber.pcSlot,
  },
  {
    label: "Connector",
    accessor: (product) => product.frameGrabber.connector,
  },
];

export const LIGHT_CARD_FIELDS: {
  label: string;
  accessor: (product: LightProduct) => React.ReactNode;
}[] = [
  {
    label: "카테고리 명",
    accessor: (product) => product.name,
  },
  {
    label: "등록일",
    accessor: (product) =>
      new Date(product.updatedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
  },
];

export const FILTER_CONFIGS: {
  [key in keyof CategoryQueryMap]?: {
    key: keyof GetProductQuery<key>;
    title: string;
  }[];
} = {
  camera: [
    {
      key: "camera__maker__equal",
      title: "제조사",
    },
    {
      key: "camera__interface__equal",
      title: "인터페이스",
    },
    {
      key: "_camera__resolution__between",
      title: "해상도",
    },
    {
      key: "camera__speed__between",
      title: "촬영 속도",
    },
    {
      key: "where__name__i_like",
      title: "모델명",
    },
  ],
  lens: [
    {
      key: "lens__mount__equal",
      title: "마운트",
    },
    {
      key: "lens__focalLength__between",
      title: "초점거리",
    },
    {
      key: "lens__formatSize__between",
      title: "포맷사이즈",
    },
    {
      key: "where__name__i_like",
      title: "모델명",
    },
  ],
  "frame-grabber": [
    {
      key: "frameGrabber__maker__equal",
      title: "제조사",
    },
    {
      key: "where__name__i_like",
      title: "모델명",
    },
  ],
};
