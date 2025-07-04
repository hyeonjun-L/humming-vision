import { CategoriesEnum, CreateCategoryDtoMap } from "@humming-vision/shared";

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

export type CategoryFieldOption = {
  required: boolean;
  fieldName: string;
  label: string;
  type: "select" | "input";
  placeholder?: string;
  unit?: string;
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
