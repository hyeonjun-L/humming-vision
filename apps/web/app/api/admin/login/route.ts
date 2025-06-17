import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const password = searchParams.get("password");

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

  const response = await fetch(`${END_POINT}/admin/login`, {
    method: "POST",
    headers,
  });

  if (!response.ok) {
    let errorData;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      errorData = await response.json();
    } else {
      errorData = await response.text();
    }

    return NextResponse.json(
      {
        error: "Login failed",
        errorData,
        status: response.status,
      },
      { status: response.status },
    );
  }
  const result = await response.json();
  const responseWithCookies = NextResponse.json({ admin: result.admin });

  responseWithCookies.cookies.set(
    COOKIE_NAMES.ACCESS_TOKEN,
    result.accessToken,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );

  responseWithCookies.cookies.set(
    COOKIE_NAMES.REFRESH_TOKEN,
    result.refreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );

  return responseWithCookies;
};
