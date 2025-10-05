import type { MetadataRoute } from "next";
import {
  CameraTypeEnum,
  CategoriesEnum,
  FrameGrabberInterfaceEnum,
  GetProductResponse,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const dynamic = "force-dynamic";

export const revalidate = 86400;

const BASE_URL = "https://www.hummingvision.com";
const PAGE_SIZE = 1000;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const END_POINT = process.env[ENV_API_END_POINT_KEY];
  const urls: MetadataRoute.Sitemap = [];

  // 정적 페이지들
  const staticPages = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  urls.push(...staticPages);

  // 카메라 카테고리 페이지 및 제품들
  const cameraTypes = Object.values(CameraTypeEnum);
  for (const type of cameraTypes) {
    // 카테고리 페이지
    urls.push({
      url: `${BASE_URL}/camera/${type.toLowerCase()}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });

    // 카메라 제품들
    try {
      let page = 1;
      while (true) {
        const res = await axios.get<GetProductResponse<CategoriesEnum.CAMERA>>(
          `${END_POINT}/product/camera?camera__type__equal=${type}&take=${PAGE_SIZE}&page=${page}`,
          {
            adapter: "fetch",
            fetchOptions: {
              cache: "force-cache",
              next: {
                revalidate: 3600,
              },
            },
          },
        );

        const products = res.data.data;
        if (products.length === 0) break;

        for (const product of products) {
          urls.push({
            url: `${BASE_URL}/camera/${type.toLowerCase()}/${product.id}`,
            lastModified: new Date(
              product.updatedAt || new Date(),
            ).toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
        page++;
      }
    } catch (error) {
      console.error(`Error fetching camera products for type ${type}:`, error);
    }
  }

  // 렌즈 카테고리 페이지 및 제품들
  const lensTypes = Object.values(LensTypeEnum);
  for (const type of lensTypes) {
    // 카테고리 페이지
    urls.push({
      url: `${BASE_URL}/lens/${type.toLowerCase()}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });

    // 렌즈 제품들
    try {
      let page = 1;
      while (true) {
        const res = await axios.get<GetProductResponse<CategoriesEnum.LENS>>(
          `${END_POINT}/product/lens?lens__type__equal=${type}&take=${PAGE_SIZE}&page=${page}`,
          {
            adapter: "fetch",
            fetchOptions: {
              cache: "force-cache",
              next: {
                revalidate: 3600,
              },
            },
          },
        );

        const products = res.data.data;
        if (products.length === 0) break;

        for (const product of products) {
          urls.push({
            url: `${BASE_URL}/lens/${type.toLowerCase()}/${product.id}`,
            lastModified: new Date(
              product.updatedAt || new Date(),
            ).toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
        page++;
      }
    } catch (error) {
      console.error(`Error fetching lens products for type ${type}:`, error);
    }
  }

  // 프레임 그래버 카테고리 페이지 및 제품들
  const frameGrabberTypes = Object.values(FrameGrabberInterfaceEnum);
  for (const type of frameGrabberTypes) {
    const WEBLINK = type === "CAMERA_LINK" ? "link" : type.toLowerCase();

    // 카테고리 페이지
    urls.push({
      url: `${BASE_URL}/frame-grabber/${WEBLINK}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });

    // 프레임 그래버 제품들
    try {
      let page = 1;
      while (true) {
        const res = await axios.get<
          GetProductResponse<CategoriesEnum.FRAMEGRABBER>
        >(
          `${END_POINT}/product/frame-grabber?frameGrabber__interface__equal=${type}&take=${PAGE_SIZE}&page=${page}`,
          {
            adapter: "fetch",
            fetchOptions: {
              cache: "force-cache",
              next: {
                revalidate: 3600,
              },
            },
          },
        );

        const products = res.data.data;
        if (products.length === 0) break;

        for (const product of products) {
          urls.push({
            url: `${BASE_URL}/frame-grabber/${WEBLINK}/${product.id}`,
            lastModified: new Date(
              product.updatedAt || new Date(),
            ).toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
        page++;
      }
    } catch (error) {
      console.error(
        `Error fetching frame-grabber products for type ${type}:`,
        error,
      );
    }
  }

  // 조명 페이지
  urls.push(
    {
      url: `${BASE_URL}/light`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/light/download`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  );

  // 소프트웨어 카테고리 페이지 및 제품들
  const softwareTypes = Object.values(SoftwareMakerEnum);
  for (const type of softwareTypes) {
    // 카테고리 페이지
    urls.push({
      url: `${BASE_URL}/etc/software/${type.toLowerCase()}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });

    // 소프트웨어 제품들
    try {
      let page = 1;
      while (true) {
        const res = await axios.get<
          GetProductResponse<CategoriesEnum.SOFTWARE>
        >(
          `${END_POINT}/product/software?software__maker__equal=${type}&take=${PAGE_SIZE}&page=${page}`,
          {
            adapter: "fetch",
            fetchOptions: {
              cache: "force-cache",
              next: {
                revalidate: 3600,
              },
            },
          },
        );

        const products = res.data.data;
        if (products.length === 0) break;

        for (const product of products) {
          urls.push({
            url: `${BASE_URL}/software/${type.toLowerCase()}/${product.id}`,
            lastModified: new Date(
              product.updatedAt || new Date(),
            ).toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          });
        }
        page++;
      }
    } catch (error) {
      console.error(
        `Error fetching software products for type ${type}:`,
        error,
      );
    }
  }

  // 액세서리 카테고리 페이지들
  const accessoryTypes = ["converter", "cable", "bracket"];
  for (const type of accessoryTypes) {
    urls.push({
      url: `${BASE_URL}/etc/accessory/${type}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });
  }

  return urls;
}
