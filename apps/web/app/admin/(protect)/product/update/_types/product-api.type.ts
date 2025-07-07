import { Product } from "@humming-vision/shared";

// Form에서 사용하는 필드 타입들 (API에서 반환되는 값에서 id 제외하고 일부 필드는 string으로 변환)
export type ProductApiResult = Partial<
  Omit<Product, "id" | "createdAt" | "updatedAt" | "camera" | "lens" | "frameGrabber" | "software" | "light" | "images">
> & {
  // 이미지는 id와 timestamp 제외
  images?: Array<Partial<Omit<NonNullable<Product["images"]>[0], "id" | "createdAt" | "updatedAt" | "product">>>;
  // 각 카테고리 객체도 id와 product 참조 제외하고, form에서 사용하는 타입으로 변환
  camera?: {
    interface?: string;
    type?: string;
    color?: string;
    maker?: string;
    resolutionX?: number;
    resolutionY?: number;
    speed?: number;
    pixelSize?: number; // API에서는 number
    formatSize?: string;
    mountType?: string;
    sensor?: string;
  };
  lens?: {
    type?: string;
    mount?: string;
    maker?: string;
    resolution?: number; // API에서는 number
    numericAperture?: string;
    fNumnber?: string;
    focalLength?: number; // API에서는 number
    formatSize?: number; // API에서는 number
  };
  frameGrabber?: {
    maker?: string;
    interface?: string;
    pcSlot?: string;
    connector?: string;
    memory?: number; // API에서는 number
  };
  software?: {
    maker?: string;
  };
  light?: {
    catalogUrl?: string;
  };
};
