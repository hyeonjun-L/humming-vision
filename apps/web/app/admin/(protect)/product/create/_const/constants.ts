import {
  CameraColorEnum,
  CameraInterfaceEnum,
  CameraMakerEnum,
  CameraTypeEnum,
  CategoryRelationMapKebab,
  FrameGrabberInterfaceEnum,
  FrameGrabberMakerEnum,
  LensMountEnum,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";

export type CategoryFieldOption = {
  label: string;
  type: "select" | "input";
  placeholder?: string;
  unit?: string;
  options?: { value: string; label: string }[];
};

export type CategoryOptionsMap = {
  [key in CategoryRelationMapKebab]: CategoryFieldOption[];
};

// 폼 데이터 타입 정의
export type ProductFormData = {
  // 기본 정보
  category: CategoryRelationMapKebab;
  subCategory?: string;
  name: string;
  mainFeature: string;
  manufacturer: string;

  // 파일들
  productImages: File[];
  specImages: File[];
  datasheetFile: File | null;
  drawingFile: File | null;
  manualFile: File | null;

  // 카테고리별 동적 필드들
  categoryFields: Record<string, string>;
};

export const selectProductOptions = [
  { value: CategoryRelationMapKebab.CAMERA, label: "카메라" },
  { value: CategoryRelationMapKebab.FRAMEGRABBER, label: "프레임 그래버" },
  { value: CategoryRelationMapKebab.LENS, label: "렌즈" },
  { value: CategoryRelationMapKebab.LIGHT, label: "조명" },
  { value: CategoryRelationMapKebab.SOFTWARE, label: "소프트웨어" },
];

export const selectCategoryOptions = {
  [CategoryRelationMapKebab.CAMERA]: [
    { value: CameraTypeEnum.AREA, label: "Area Scan" },
    { value: CameraTypeEnum.LINE, label: "Line Scan" },
  ],
  [CategoryRelationMapKebab.FRAMEGRABBER]: [
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
  [CategoryRelationMapKebab.LENS]: [
    { value: LensTypeEnum.CCTV, label: "CCTV" },
    { value: LensTypeEnum.TCL, label: "TCL" },
  ],
  [CategoryRelationMapKebab.LIGHT]: [],
  [CategoryRelationMapKebab.SOFTWARE]: [
    { value: SoftwareMakerEnum.EURESYS, label: "Euresys" },
    { value: SoftwareMakerEnum.MATROX, label: "Matrox" },
  ],
};

export const categoryOptions: CategoryOptionsMap = {
  [CategoryRelationMapKebab.CAMERA]: [
    {
      label: "인터페이스",
      type: "select",
      options: [
        { value: CameraInterfaceEnum.GIGE, label: "GigE" },
        { value: CameraInterfaceEnum.USB, label: "USB" },
        { value: CameraInterfaceEnum.CAMERA_LINK, label: "Camera Link" },
        { value: CameraInterfaceEnum.COAXPRESS, label: "CoaXPress" },
      ],
    },
    {
      label: "제조사",
      type: "select",
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
      label: "X 해상도",
      type: "input",
      placeholder: "X 해상도 입력",
      unit: "px",
    },
    {
      label: "Y 해상도",
      type: "input",
      placeholder: "Y 해상도 입력",
      unit: "px",
    },
    {
      label: "속도",
      type: "input",
      placeholder: "속도 입력",
      unit: "fps",
    },
    {
      label: "컬러",
      type: "select",
      options: [
        { value: CameraColorEnum.MONO, label: "Mono" },
        { value: CameraColorEnum.COLOR, label: "Color" },
      ],
    },
    {
      label: "픽셀 사이즈",
      type: "input",
      placeholder: "픽셀 사이즈 입력",
      unit: "μm",
    },
    {
      label: "포멧 사이즈",
      type: "input",
      placeholder: "포멧 사이즈 입력",
      unit: "MB",
    },
    {
      label: "마운트",
      type: "input",
      placeholder: "마운트 입력",
    },
    {
      label: "센서",
      type: "input",
      placeholder: "센서 입력",
    },
  ],
  [CategoryRelationMapKebab.FRAMEGRABBER]: [
    {
      label: "제조사",
      type: "select",
      options: [
        { value: FrameGrabberMakerEnum.MATROX, label: "Matrox" },
        { value: FrameGrabberMakerEnum.EURESYS, label: "Euresys" },
        { value: FrameGrabberMakerEnum.ADLINK, label: "ADLINK" },
        { value: FrameGrabberMakerEnum.BASLER, label: "Basler" },
      ],
    },
    {
      label: "인터페이스",
      type: "select",
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
      label: "Memory",
      type: "input",
      placeholder: "Memory 입력",
      unit: "MB",
    },
    {
      label: "PC Slot",
      type: "input",
      placeholder: "PC Slot 입력",
    },
    {
      label: "Connector",
      type: "input",
      placeholder: "Connector 입력",
    },
  ],
  [CategoryRelationMapKebab.LENS]: [
    {
      label: "제조사",
      type: "input",
      placeholder: "제조사 입력",
    },
    {
      label: "해상력",
      type: "input",
      placeholder: "해상력 입력",
      unit: "MP",
    },
    {
      label: "초점거리",
      type: "input",
      placeholder: "초점거리 입력",
      unit: "mm",
    },
    {
      label: "NA",
      type: "input",
      placeholder: "NA 입력",
    },
    {
      label: "F/#",
      type: "input",
      placeholder: "F/# 입력",
    },
    {
      label: "마운트",
      type: "select",
      options: [
        { value: LensMountEnum.C, label: "C" },
        { value: LensMountEnum.CS, label: "CS" },
        { value: LensMountEnum.F, label: "F" },
        { value: LensMountEnum.M, label: "M" },
      ],
    },
  ],
  [CategoryRelationMapKebab.LIGHT]: [],
  [CategoryRelationMapKebab.SOFTWARE]: [
    {
      label: "제조사",
      type: "select",
      options: [
        { value: SoftwareMakerEnum.EURESYS, label: "Euresys" },
        { value: SoftwareMakerEnum.MATROX, label: "Matrox" },
      ],
    },
  ],
};
