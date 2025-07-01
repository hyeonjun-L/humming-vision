import { components } from "./schema";
import { CategoriesEnum, CategoryRelationMapKebab } from "./categories";

export type Product = components["schemas"]["ProductModel"];

export type CameraProduct = Product & {
  camera: NonNullable<Product["camera"]>;
};
export type LensProduct = Product & { lens: NonNullable<Product["lens"]> };
export type FrameGrabberProduct = Product & {
  frameGrabber: NonNullable<Product["frameGrabber"]>;
};
export type SoftwareProduct = Product & {
  software: NonNullable<Product["software"]>;
};
export type LightProduct = Product & { light: NonNullable<Product["light"]> };

export type CategoryProductMap = {
  CAMERA: CameraProduct;
  LENS: LensProduct;
  FRAMEGRABBER: FrameGrabberProduct;
  SOFTWARE: SoftwareProduct;
  LIGHT: LightProduct;
};

export type CategoryToProductTypeMap = {
  [K in keyof typeof CategoryRelationMapKebab]: K extends keyof CategoryProductMap
    ? CategoryProductMap[K]
    : Product;
};

export type GetProductResponse<
  T extends keyof CategoryProductMap = keyof CategoryProductMap,
> = {
  data: CategoryProductMap[T][];
  total: number;
};

export type GetProductResponseByCategory<C extends CategoryRelationMapKebab> =
  C extends CategoryRelationMapKebab.CAMERA
    ? GetProductResponse<CategoriesEnum.CAMERA>
    : C extends CategoryRelationMapKebab.LENS
      ? GetProductResponse<CategoriesEnum.LENS>
      : C extends CategoryRelationMapKebab.FRAMEGRABBER
        ? GetProductResponse<CategoriesEnum.FRAMEGRABBER>
        : C extends CategoryRelationMapKebab.SOFTWARE
          ? GetProductResponse<CategoriesEnum.SOFTWARE>
          : C extends CategoryRelationMapKebab.LIGHT
            ? GetProductResponse<CategoriesEnum.LIGHT>
            : GetProductResponse;

export type GetProductResponseBase = {
  data: Product[];
  total: number;
};

export type CreateCategoryDtoMap = {
  [CategoriesEnum.CAMERA]: components["schemas"]["CreateCameraProductDto"];
  [CategoriesEnum.FRAMEGRABBER]: components["schemas"]["CreateFrameGrabberProductDto"];
  [CategoriesEnum.LENS]: components["schemas"]["CreateLensProductDto"];
  [CategoriesEnum.SOFTWARE]: components["schemas"]["CreateSoftwareProductDto"];
  [CategoriesEnum.LIGHT]: components["schemas"]["CreateLightProductDto"];
};

export type UpdateCategoryDtoMap = {
  [CategoriesEnum.CAMERA]: components["schemas"]["UpdateCameraProductDto"];
  [CategoriesEnum.FRAMEGRABBER]: components["schemas"]["UpdateFrameGrabberProductDto"];
  [CategoriesEnum.LENS]: components["schemas"]["UpdateLensProductDto"];
  [CategoriesEnum.SOFTWARE]: components["schemas"]["UpdateSoftwareProductDto"];
  [CategoriesEnum.LIGHT]: components["schemas"]["UpdateLightProductDto"];
};
