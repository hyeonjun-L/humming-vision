import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";
import { Admin, TokenResponse } from "@humming-vision/shared";
import {
  handleApiError,
  handleValidationError,
  handleConfigError,
} from "utils/api-error-handler";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return handleValidationError("Invalid request");
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  console.log(END_POINT);

  const headers: Record<string, string> = {
    Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString("base64")}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post<TokenResponse & { admin: Admin }>(
      `${END_POINT}/admin/login`,
      {},
      { headers },
    );

    const responseWithCookies = NextResponse.json({
      admin: response.data.admin,
    });

    responseWithCookies.cookies.set(
      COOKIE_NAMES.ACCESS_TOKEN,
      response.data.accessToken,
      ACCESS_TOKEN_COOKIE_OPTIONS,
    );

    responseWithCookies.cookies.set(
      COOKIE_NAMES.REFRESH_TOKEN,
      response.data.refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS,
    );

    return responseWithCookies;
  } catch (error) {
    return handleApiError(error, "admin login");
  }
};
