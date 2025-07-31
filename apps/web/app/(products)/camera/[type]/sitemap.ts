import { CategoriesEnum, GetProductResponse } from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import type { MetadataRoute } from "next";

const PAGE_SIZE = 1000;

type Props = {
  params: Promise<{ type: string }>;
};

export default async function sitemap({
  params,
}: Props): Promise<MetadataRoute.Sitemap> {
  const { type } = await params;

  const urls: MetadataRoute.Sitemap = [];
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

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
        url: `https://www.hummingvision.com/camera/${type}/${product.id}`,
        lastModified: product.updatedAt || new Date().toISOString(),
      });
    }

    page++;
  }

  return urls;
}
