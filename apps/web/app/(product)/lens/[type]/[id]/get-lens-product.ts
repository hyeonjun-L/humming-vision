"use server";

import { cache } from "react";
import axios from "axios";
import { FrameGrabberProduct } from "@humming-vision/shared";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const getLensProduct = cache(
  async (id: string): Promise<FrameGrabberProduct> => {
    const END_POINT = process.env[ENV_API_END_POINT_KEY];

    const response = await axios.get<FrameGrabberProduct>(
      `${END_POINT}/product/lens/${id}`,
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
