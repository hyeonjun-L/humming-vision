import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError, handleConfigError } from "utils/api-error-handler";

export const DELETE = async (request: NextRequest) => {
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
    const response = await axios.delete(`${END_POINT}/cleanup`, {
      headers,
      adapter: "fetch",
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return handleApiError(error, "contact delete");
  }
};
