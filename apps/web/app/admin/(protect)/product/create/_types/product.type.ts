import {
  CameraType,
  CategoriesEnum,
  CreateCategoryDtoMap,
  LensType,
} from "@humming-vision/shared";

export type CameraFields =
  CreateCategoryDtoMap[CategoriesEnum.CAMERA]["camera"];
export type FrameGrabberFields =
  CreateCategoryDtoMap[CategoriesEnum.FRAMEGRABBER]["frameGrabber"];
export type LensFields = CreateCategoryDtoMap[CategoriesEnum.LENS]["lens"];
export type SoftwareFields =
  CreateCategoryDtoMap[CategoriesEnum.SOFTWARE]["software"];
export type LightFields = CreateCategoryDtoMap[CategoriesEnum.LIGHT]["light"];

export type CreateCategoryFields =
  | CameraFields
  | FrameGrabberFields
  | LensFields
  | SoftwareFields
  | LightFields;

// 카메라 타입(AREA/LINE)이나 렌즈 타입(CCTV/TCL)에 따라
// 같은 컬럼을 다른 스펙으로 표기하는 필드용 오버라이드
// 예: 렌즈 focalLength → CCTV는 "초점거리 (mm)", TCL은 "배율 (x)"
export type CategoryFieldTypeOverride = Partial<
  Record<CameraType | LensType, { label?: string; unit?: string }>
>;

export type CategoryFieldOption = {
  required: boolean;
  fieldName: string;
  label: string;
  type: "select" | "input";
  placeholder?: string;
  unit?: string;
  isNumeric?: boolean;
  byType?: CategoryFieldTypeOverride;
  options?: { value: string; label: string }[];
};

export type CategoryOptionsMap = {
  [key in CategoriesEnum]: CategoryFieldOption[];
};

export type BaseProductFormData = {
  category: CategoriesEnum;
  name: string;
};

export type StandardProductFormData = BaseProductFormData & {
  subCategory?: string;
  mainFeature: string;
  productImages: File[];
  specImages: File[];
  datasheetFile?: File;
  drawingFile?: File;
  manualFile?: File;
  categoryFields: Record<string, string>;
};

export type LightProductFormData = BaseProductFormData & {
  category: CategoriesEnum.LIGHT;
  catalogFile?: File;
};

export type ProductFormData = StandardProductFormData | LightProductFormData;

export type SectionVisibility = {
  categorySection: boolean;
  infoSection: boolean;
  specSection: boolean;
  otherInfoSection: boolean;
};

export type InfoSectionFields = {
  name: boolean;
  mainFeature: boolean;
  productImages: boolean;
  datasheetFile: boolean;
  drawingFile: boolean;
  manualFile: boolean;
  catalogFile: boolean;
};

export const isLightProduct = (
  data: ProductFormData,
): data is LightProductFormData => {
  return data.category === CategoriesEnum.LIGHT;
};

export const isStandardProduct = (
  data: ProductFormData,
): data is StandardProductFormData => {
  return data.category !== CategoriesEnum.LIGHT;
};

export type StandardProductApiData = Omit<
  StandardProductFormData,
  | "productImages"
  | "specImages"
  | "datasheetFile"
  | "drawingFile"
  | "manualFile"
> & {
  productImages: string[];
  specImages: string[];
  datasheetFile?: string | null;
  drawingFile?: string | null;
  manualFile?: string | null;
};

export type LightProductApiData = Omit<LightProductFormData, "catalogFile"> & {
  catalogFile?: string | null;
};

export type ProductApiData = StandardProductApiData | LightProductApiData;

export type ValidatedLightProductData = {
  name: string;
  category: CategoriesEnum.LIGHT;
  catalogFile: File;
};

export type ValidatedStandardProductData = {
  name: string;
  category: CategoriesEnum;
  subCategory: string;
  mainFeature: string;
  productImages: File[];
  specImages: File[];
  datasheetFile?: File;
  drawingFile?: File;
  manualFile?: File;
  categoryFields: Record<string, string>;
};
