import { components, paths } from '@humming-vision/shared';

export enum RoutePath {
  CAMERA = "/camera",
  LENS = "/lens",
  SUPPORT = "/support",
  ABOUT = "/about",
}



export type ProductEntity = components['schemas']['CreateProductDto'];
export type CreateProductDto = components['schemas']['CreateProductDto'];