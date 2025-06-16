import {
  ENV_API_END_POINT_KEY,
  ENV_JWT_ACCESS_EXPIRES,
  ENV_JWT_REFRESH_EXPIRES,
  NODE_ENV_KEY,
} from "consts/env-keys.const";
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

  responseWithCookies.cookies.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env[NODE_ENV_KEY] === "production",
    sameSite: "strict",
    path: "/",
    maxAge: process.env[ENV_JWT_ACCESS_EXPIRES]
      ? parseInt(process.env[ENV_JWT_ACCESS_EXPIRES], 10)
      : undefined,
  });

  responseWithCookies.cookies.set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env[NODE_ENV_KEY] === "production",
    sameSite: "strict",
    path: "/",
    maxAge: process.env[ENV_JWT_REFRESH_EXPIRES]
      ? parseInt(process.env[ENV_JWT_REFRESH_EXPIRES], 10)
      : undefined,
  });

  return responseWithCookies;
};
