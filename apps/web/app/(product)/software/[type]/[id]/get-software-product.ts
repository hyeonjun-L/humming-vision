"use server";

import { cache } from "react";
import axios from "axios";
import { SoftwareProduct } from "@humming-vision/shared";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const getSoftwareProduct = cache(
  async (id: string): Promise<SoftwareProduct> => {
    const END_POINT = process.env[ENV_API_END_POINT_KEY];

    const response = await axios.get<SoftwareProduct>(
      `${END_POINT}/product/software/${id}`,
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
