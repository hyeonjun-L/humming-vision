import { CategoriesEnum, UpdateCategoryDtoMap } from "@humming-vision/shared";

export interface ProductUpdateFormData {
  category: CategoriesEnum;
  name: string;
  mainFeature?: string;
  productImages: File[];
  specImages: File[];
  datasheetFile?: File;
  drawingFile?: File;
  manualFile?: File;
  catalogFile?: File;
  categoryFields: Record<string, string>;

  productImageUrls?: string[];
  specImageUrls?: string[];
  datasheetUrl?: string;
  drawingUrl?: string;
  manualUrl?: string;
  catalogFileUrl?: string;
}

export type CameraUpdateFields =
  UpdateCategoryDtoMap[CategoriesEnum.CAMERA]["camera"];
export type FrameGrabberUpdateFields =
  UpdateCategoryDtoMap[CategoriesEnum.FRAMEGRABBER]["frameGrabber"];
export type LensUpdateFields =
  UpdateCategoryDtoMap[CategoriesEnum.LENS]["lens"];
export type SoftwareUpdateFields =
  UpdateCategoryDtoMap[CategoriesEnum.SOFTWARE]["software"];
export type LightUpdateFields =
  UpdateCategoryDtoMap[CategoriesEnum.LIGHT]["light"];

// export type UpdateCategoryFields =
//   | CameraUpdateFields
//   | FrameGrabberUpdateFields
//   | LensUpdateFields
//   | SoftwareUpdateFields
//   | LightUpdateFields;

// export type CategoryFieldOption = {
//   required: boolean;
//   fieldName: string;
//   label: string;
//   type: "select" | "input";
//   placeholder?: string;
//   unit?: string;
//   options?: { value: string; label: string }[];
// };

// export type CategoryOptionsMap = {
//   [key in CategoriesEnum]: CategoryFieldOption[];
// };

// export type BaseProductUpdateFormData = {
//   id: number;
//   category: CategoriesEnum;
//   name: string;
// };

// export type StandardProductUpdateFormData = BaseProductUpdateFormData & {
//   subCategory?: string;
//   mainFeature: string;
//   productImages: (File | string)[];
//   specImages: (File | string)[];
//   datasheetFile?: File | string;
//   drawingFile?: File | string;
//   manualFile?: File | string;
//   categoryFields: Record<string, string>;
// };

// export type LightProductUpdateFormData = BaseProductUpdateFormData & {
//   category: CategoriesEnum.LIGHT;
//   catalogFile?: File | string;
//   categoryFields: Record<string, string>;
// };

// export type ProductUpdateFormData =
//   | StandardProductUpdateFormData
//   | LightProductUpdateFormData;

// export type SectionVisibility = {
//   categorySection: boolean;
//   infoSection: boolean;
//   specSection: boolean;
//   otherInfoSection: boolean;
// };

// export type InfoSectionFields = {
//   name: boolean;
//   mainFeature: boolean;
//   productImages: boolean;
//   datasheetFile: boolean;
//   drawingFile: boolean;
//   manualFile: boolean;
//   catalogFile: boolean;
// };

// export const isLightProductUpdate = (
//   data: ProductUpdateFormData,
// ): data is LightProductUpdateFormData => {
//   return data.category === CategoriesEnum.LIGHT;
// };

// export const isStandardProductUpdate = (
//   data: ProductUpdateFormData,
// ): data is StandardProductUpdateFormData => {
//   return data.category !== CategoriesEnum.LIGHT;
// };

// export type StandardProductUpdateApiData = Omit<
//   StandardProductUpdateFormData,
//   | "productImages"
//   | "specImages"
//   | "datasheetFile"
//   | "drawingFile"
//   | "manualFile"
// > & {
//   productImages: string[];
//   specImages: string[];
//   datasheetFile?: string | null;
//   drawingFile?: string | null;
//   manualFile?: string | null;
//   categoryFields: Record<string, string>;
// };

// export type LightProductUpdateApiData = Omit<
//   LightProductUpdateFormData,
//   "catalogFile"
// > & {
//   catalogFile?: string | null;
// };

// export type ProductUpdateApiData =
//   | StandardProductUpdateApiData
//   | LightProductUpdateApiData;

// export type ValidatedLightProductUpdateData = {
//   id: number;
//   name: string;
//   category: CategoriesEnum.LIGHT;
//   catalogFile?: File | string;
//   categoryFields: Record<string, string>;
// };

// export type ValidatedStandardProductUpdateData = {
//   id: number;
//   name: string;
//   category: CategoriesEnum;
//   subCategory?: string;
//   mainFeature: string;
//   productImages: (File | string)[];
//   specImages: (File | string)[];
//   datasheetFile?: File | string;
//   drawingFile?: File | string;
//   manualFile?: File | string;
//   categoryFields: Record<string, string>;
// };

// // 기존 제품 데이터를 폼 데이터로 변환하는 타입
// export type ExistingProductData = {
//   id: number;
//   name: string;
//   category: CategoriesEnum;
//   subCategory?: string;
//   mainFeature?: string;
//   datasheetUrl?: string;
//   drawingUrl?: string;
//   manualUrl?: string;
//   catalogUrl?: string;
//   productImages: string[];
//   specImages: string[];
//   categoryFields: Record<string, string>;
// };
