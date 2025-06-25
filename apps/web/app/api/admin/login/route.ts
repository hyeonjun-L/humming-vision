import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import axios from "axios";
import { Admin, TokenResponse } from "@humming-vision/shared";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

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
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "Login failed";
      return NextResponse.json(
        { error: errorMessage, status: error.response.status },
        { status: error.response.status },
      );
    }
    return NextResponse.json(
      { error: "Server error occurred during login" },
      { status: 500 },
    );
  }
};
