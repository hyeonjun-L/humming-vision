import {
  CameraColorEnum,
  CameraInterfaceEnum,
  CameraMakerEnum,
  CameraTypeEnum,
  CategoriesEnum,
  FrameGrabberInterfaceEnum,
  FrameGrabberMakerEnum,
  LensMountEnum,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";
import { CategoryOptionsMap } from "../_types/product.type";

export const selectProductOptions = [
  { value: CategoriesEnum.CAMERA, label: "카메라" },
  { value: CategoriesEnum.FRAMEGRABBER, label: "프레임 그래버" },
  { value: CategoriesEnum.LENS, label: "렌즈" },
  { value: CategoriesEnum.LIGHT, label: "조명" },
  { value: CategoriesEnum.SOFTWARE, label: "소프트웨어" },
];

export const selectCategoryOptions = {
  [CategoriesEnum.CAMERA]: [
    { value: CameraTypeEnum.AREA, label: "Area Scan" },
    { value: CameraTypeEnum.LINE, label: "Line Scan" },
  ],
  [CategoriesEnum.FRAMEGRABBER]: [
    {
      value: FrameGrabberInterfaceEnum.CAMERA_LINK,
      label: "Camera Link",
    },
    {
      value: FrameGrabberInterfaceEnum.USB,
      label: "USB",
    },
    { value: FrameGrabberInterfaceEnum.COAXPRESS, label: "CoaXPress" },
    {
      value: FrameGrabberInterfaceEnum.GIGE,
      label: "GigE",
    },
  ],
  [CategoriesEnum.LENS]: [
    { value: LensTypeEnum.CCTV, label: "CCTV" },
    { value: LensTypeEnum.TCL, label: "TCL" },
  ],
  [CategoriesEnum.LIGHT]: [],
  [CategoriesEnum.SOFTWARE]: [
    { value: SoftwareMakerEnum.EURESYS, label: "Euresys" },
    { value: SoftwareMakerEnum.MATROX, label: "Matrox" },
  ],
};

export const categoryOptions: CategoryOptionsMap = {
  [CategoriesEnum.CAMERA]: [
    {
      fieldName: "interface",
      label: "인터페이스",
      type: "select",
      required: true,
      options: [
        { value: CameraInterfaceEnum.GIGE, label: "GigE" },
        { value: CameraInterfaceEnum.USB, label: "USB" },
        { value: CameraInterfaceEnum.CAMERA_LINK, label: "Camera Link" },
        { value: CameraInterfaceEnum.COAXPRESS, label: "CoaXPress" },
      ],
    },
    {
      fieldName: "maker",
      label: "제조사",
      type: "select",
      required: true,
      options: [
        { value: CameraMakerEnum.CREVIS, label: "Crevis" },
        { value: CameraMakerEnum.VIEWORKS, label: "Vieworks" },
        { value: CameraMakerEnum.BASLER, label: "Basler" },
        { value: CameraMakerEnum.HIK, label: "Hik" },
        { value: CameraMakerEnum.HUARAY, label: "Huaray" },
        { value: CameraMakerEnum.JAI, label: "JAI" },
      ],
    },
    {
      fieldName: "resolutionX",
      label: "X 해상도",
      type: "input",
      required: true,
      placeholder: "X 해상도 입력",
      unit: "px",
    },
    {
      fieldName: "resolutionY",
      label: "Y 해상도",
      type: "input",
      required: true,
      placeholder: "Y 해상도 입력",
      unit: "px",
    },
    {
      fieldName: "speed",
      label: "속도",
      type: "input",
      required: true,
      placeholder: "속도 입력",
      unit: "fps",
    },
    {
      fieldName: "color",
      label: "컬러",
      type: "select",
      required: true,
      options: [
        { value: CameraColorEnum.MONO, label: "Mono" },
        { value: CameraColorEnum.COLOR, label: "Color" },
      ],
    },
    {
      fieldName: "pixelSize",
      label: "픽셀 사이즈",
      type: "input",
      required: false,
      placeholder: "픽셀 사이즈 입력",
      unit: "μm",
    },
    {
      fieldName: "formatSize",
      label: "포멧 사이즈",
      type: "input",
      required: true,
      placeholder: "포멧 사이즈 입력",
    },
    {
      fieldName: "mountType",
      label: "마운트",
      type: "input",
      required: true,
      placeholder: "마운트 입력",
    },
    {
      fieldName: "sensor",
      label: "센서",
      type: "input",
      required: true,
      placeholder: "센서 입력",
    },
  ],
  [CategoriesEnum.FRAMEGRABBER]: [
    {
      fieldName: "maker",
      label: "제조사",
      type: "select",
      required: true,
      options: [
        { value: FrameGrabberMakerEnum.MATROX, label: "Matrox" },
        { value: FrameGrabberMakerEnum.EURESYS, label: "Euresys" },
        { value: FrameGrabberMakerEnum.ADLINK, label: "ADLINK" },
        { value: FrameGrabberMakerEnum.BASLER, label: "Basler" },
      ],
    },
    {
      fieldName: "interface",
      label: "인터페이스",
      type: "select",
      required: true,
      options: [
        { value: FrameGrabberInterfaceEnum.GIGE, label: "GigE" },
        { value: FrameGrabberInterfaceEnum.USB, label: "USB" },
        {
          value: FrameGrabberInterfaceEnum.CAMERA_LINK,
          label: "Camera Link",
        },
        { value: FrameGrabberInterfaceEnum.COAXPRESS, label: "CoaXPress" },
      ],
    },
    {
      fieldName: "memory",
      label: "Memory",
      type: "input",
      required: true,
      placeholder: "Memory 입력",
      unit: "MB",
    },
    {
      fieldName: "pcSlot",
      label: "PC Slot",
      type: "input",
      required: true,
      placeholder: "PC Slot 입력",
    },
    {
      fieldName: "connector",
      label: "Connector",
      type: "input",
      required: true,
      placeholder: "Connector 입력",
    },
  ],
  [CategoriesEnum.LENS]: [
    {
      fieldName: "maker",
      label: "제조사",
      type: "input",
      required: true,
      placeholder: "제조사 입력",
    },
    {
      fieldName: "resolution",
      label: "해상력",
      type: "input",
      required: true,
      placeholder: "해상력 입력",
      unit: "MP",
    },
    {
      fieldName: "focalLength",
      label: "초점거리",
      type: "input",
      required: true,
      placeholder: "초점거리 입력",
      unit: "mm",
    },
    {
      fieldName: "numericAperture",
      label: "NA",
      type: "input",
      required: true,
      placeholder: "NA 입력",
    },
    {
      fieldName: "fNumnber",
      label: "F/#",
      type: "input",
      required: true,
      placeholder: "F/# 입력",
    },
    {
      fieldName: "mount",
      label: "마운트",
      type: "select",
      required: true,
      options: [
        { value: LensMountEnum.C, label: "C" },
        { value: LensMountEnum.CS, label: "CS" },
        { value: LensMountEnum.F, label: "F" },
        { value: LensMountEnum.M, label: "M" },
      ],
    },
    {
      fieldName: "formatSize",
      label: "포멧 사이즈",
      type: "input",
      required: true,
      placeholder: "포멧 사이즈 입력",
      unit: "inch",
    },
  ],
  [CategoriesEnum.LIGHT]: [
    {
      fieldName: "catalogUrl",
      label: "카탈로그 URL",
      type: "input",
      required: true,
      placeholder: "카탈로그 URL 입력",
    },
  ],
  [CategoriesEnum.SOFTWARE]: [],
};
