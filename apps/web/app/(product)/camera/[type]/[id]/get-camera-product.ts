"use server";

import { cache } from "react";
import axios from "axios";
import { CameraProduct } from "@humming-vision/shared";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const getCameraProduct = cache(
  async (id: string): Promise<CameraProduct> => {
    const END_POINT = process.env[ENV_API_END_POINT_KEY];

    const response = await axios.get<CameraProduct>(
      `${END_POINT}/product/camera/${id}`,
      {
        adapter: "fetch",
        fetchOptions: {
          next: {
            revalidate: 3600,
          },
          cache: "force-cache",
        },
      },
    );

    return response.data;
  },
);
