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
import { CategoryOptionsMap } from "../_types/product-update.type";

export const sectionVisibility = {
  [CategoriesEnum.CAMERA]: {
    categorySection: true,
    infoSection: true,
    specSection: true,
    otherInfoSection: true,
  },
  [CategoriesEnum.FRAMEGRABBER]: {
    categorySection: true,
    infoSection: true,
    specSection: true,
    otherInfoSection: true,
  },
  [CategoriesEnum.LENS]: {
    categorySection: true,
    infoSection: true,
    specSection: true,
    otherInfoSection: true,
  },
  [CategoriesEnum.LIGHT]: {
    categorySection: true,
    infoSection: true,
    specSection: false,
    otherInfoSection: false,
  },
  [CategoriesEnum.SOFTWARE]: {
    categorySection: true,
    infoSection: true,
    specSection: true,
    otherInfoSection: true,
  },
} as const;

export const infoSectionFields = {
  [CategoriesEnum.CAMERA]: {
    name: true,
    mainFeature: true,
    productImages: true,
    datasheetFile: true,
    drawingFile: true,
    manualFile: true,
    catalogFile: false,
  },
  [CategoriesEnum.FRAMEGRABBER]: {
    name: true,
    mainFeature: true,
    productImages: true,
    datasheetFile: true,
    drawingFile: true,
    manualFile: true,
    catalogFile: false,
  },
  [CategoriesEnum.LENS]: {
    name: true,
    mainFeature: true,
    productImages: true,
    datasheetFile: true,
    drawingFile: true,
    manualFile: true,
    catalogFile: false,
  },
  [CategoriesEnum.LIGHT]: {
    name: true,
    mainFeature: false,
    productImages: false,
    datasheetFile: false,
    drawingFile: false,
    manualFile: false,
    catalogFile: true,
  },
  [CategoriesEnum.SOFTWARE]: {
    name: true,
    mainFeature: true,
    productImages: true,
    datasheetFile: true,
    drawingFile: true,
    manualFile: true,
    catalogFile: false,
  },
} as const;

export const categoryFieldOptions: CategoryOptionsMap = {
  [CategoriesEnum.CAMERA]: [
    {
      required: true,
      fieldName: "interface",
      label: "Interface",
      type: "select",
      options: Object.values(CameraInterfaceEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "type",
      label: "Type",
      type: "select",
      options: Object.values(CameraTypeEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "color",
      label: "Color",
      type: "select",
      options: Object.values(CameraColorEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "maker",
      label: "Maker",
      type: "select",
      options: Object.values(CameraMakerEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "resolutionX",
      label: "Resolution X",
      type: "input",
      placeholder: "해상도 X를 입력하세요",
      unit: "px",
    },
    {
      required: true,
      fieldName: "resolutionY",
      label: "Resolution Y",
      type: "input",
      placeholder: "해상도 Y를 입력하세요",
      unit: "px",
    },
    {
      required: true,
      fieldName: "speed",
      label: "Speed",
      type: "input",
      placeholder: "속도를 입력하세요",
      unit: "fps",
    },
    {
      required: false,
      fieldName: "pixelSize",
      label: "Pixel Size",
      type: "input",
      placeholder: "픽셀 크기를 입력하세요",
      unit: "μm",
    },
    {
      required: true,
      fieldName: "formatSize",
      label: "Format Size",
      type: "input",
      placeholder: "포맷 크기를 입력하세요",
    },
    {
      required: true,
      fieldName: "mountType",
      label: "Mount Type",
      type: "input",
      placeholder: "마운트 타입을 입력하세요",
    },
    {
      required: true,
      fieldName: "sensor",
      label: "Sensor",
      type: "input",
      placeholder: "센서를 입력하세요",
    },
  ],
  [CategoriesEnum.FRAMEGRABBER]: [
    {
      required: true,
      fieldName: "interface",
      label: "Interface",
      type: "select",
      options: Object.values(FrameGrabberInterfaceEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "maker",
      label: "Maker",
      type: "select",
      options: Object.values(FrameGrabberMakerEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "memory",
      label: "Memory",
      type: "input",
      placeholder: "메모리를 입력하세요",
      unit: "MB",
    },
    {
      required: true,
      fieldName: "pcSlot",
      label: "PC Slot",
      type: "input",
      placeholder: "PC 슬롯을 입력하세요",
    },
    {
      required: true,
      fieldName: "connector",
      label: "Connector",
      type: "input",
      placeholder: "커넥터를 입력하세요",
    },
  ],
  [CategoriesEnum.LENS]: [
    {
      required: true,
      fieldName: "type",
      label: "Type",
      type: "select",
      options: Object.values(LensTypeEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "mount",
      label: "Mount",
      type: "select",
      options: Object.values(LensMountEnum).map((value) => ({
        value,
        label: value,
      })),
    },
    {
      required: true,
      fieldName: "maker",
      label: "Maker",
      type: "input",
      placeholder: "제조사를 입력하세요",
    },
    {
      required: true,
      fieldName: "resolution",
      label: "Resolution",
      type: "input",
      placeholder: "해상도를 입력하세요",
      unit: "lp/mm",
    },
    {
      required: true,
      fieldName: "numericAperture",
      label: "Numeric Aperture",
      type: "input",
      placeholder: "개구수를 입력하세요",
    },
    {
      required: true,
      fieldName: "fNumnber",
      label: "F Number",
      type: "input",
      placeholder: "F 넘버를 입력하세요",
    },
    {
      required: true,
      fieldName: "focalLength",
      label: "Focal Length",
      type: "input",
      placeholder: "초점거리를 입력하세요",
      unit: "mm",
    },
    {
      required: true,
      fieldName: "formatSize",
      label: "Format Size",
      type: "input",
      placeholder: "포맷 크기를 입력하세요",
      unit: "inch",
    },
  ],
  [CategoriesEnum.SOFTWARE]: [
    {
      required: true,
      fieldName: "maker",
      label: "Maker",
      type: "select",
      options: Object.values(SoftwareMakerEnum).map((value) => ({
        value,
        label: value,
      })),
    },
  ],
  [CategoriesEnum.LIGHT]: [],
};

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
