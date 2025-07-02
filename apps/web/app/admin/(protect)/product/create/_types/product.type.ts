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

export type ProductFormData = {
  category: CategoriesEnum;
  subCategory?: string;
  name: string;
  mainFeature: string;
  manufacturer: string;

  productImages: File[];
  specImages: File[];
  datasheetFile: File | null;
  drawingFile: File | null;
  manualFile: File | null;

  categoryFields: Record<string, string>;
};
