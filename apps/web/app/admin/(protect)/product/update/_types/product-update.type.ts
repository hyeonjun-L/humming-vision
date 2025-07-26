import { CategoriesEnum } from "@humming-vision/shared";
import {
  LightProductApiData,
  StandardProductApiData,
} from "../../create/_types/product.type";

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

export type BaseProductUpdateApiData = {
  id: number;
};

export type StandardProductUpdateApiData = BaseProductUpdateApiData &
  Partial<StandardProductApiData> & {
    images?: Array<{
      order: number;
      type: "PRODUCT" | "SPEC";
      path: string;
    }>;
    datasheetUrl?: string;
    drawingUrl?: string;
    manualUrl?: string;
    camera?: { id: number; [key: string]: string | number };
    frameGrabber?: { id: number; [key: string]: string | number };
    lens?: { id: number; [key: string]: string | number };
    software?: { id: number; [key: string]: string | number };
  };

export type LightProductUpdateApiData = BaseProductUpdateApiData &
  Partial<LightProductApiData> & {
    catalogUrl?: string;
    light?: { id: number; [key: string]: string | number };
  };

export type ProductUpdateApiData =
  | StandardProductUpdateApiData
  | LightProductUpdateApiData;
