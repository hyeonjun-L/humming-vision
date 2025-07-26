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
  };

  try {
    await axios.delete(`${END_POINT}/admin/logout`, {
      headers,
      adapter: "fetch",
    });

    const responseWithCookies = NextResponse.json({
      status: 204,
    });

    responseWithCookies.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    responseWithCookies.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return responseWithCookies;
  } catch (error) {
    return handleApiError(error, "contact delete");
  }
};
