import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import {
  handleApiError,
  handleValidationError,
  handleConfigError,
} from "utils/api-error-handler";

export const PATCH = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");

  if (!id) {
    return handleValidationError("Missing required query parameter: id");
  }

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const reponse = await axios.patch(
      `${END_POINT}/contact/${id}`,
      {},
      {
        headers,
        adapter: "fetch",
      },
    );

    const { data } = reponse;
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error, "contact read");
  }
};
