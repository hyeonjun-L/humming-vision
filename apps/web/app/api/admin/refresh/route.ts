import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";

export const GET = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "NO_REFRESH" }, { status: 401 });
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  const response = await fetch(`${END_POINT}/admin/token/access`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const redirectResponse = NextResponse.json(
      { message: "NO_REFRESH" },
      { status: 401 },
    );

    redirectResponse.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return redirectResponse;
  }

  const result = await response.json();

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = result;

  const nextResponse = NextResponse.json({ status: 200 });

  nextResponse.cookies.set(
    COOKIE_NAMES.ACCESS_TOKEN,
    newAccessToken,
    ACCESS_TOKEN_COOKIE_OPTIONS,
  );

  nextResponse.cookies.set(
    COOKIE_NAMES.REFRESH_TOKEN,
    newRefreshToken,
    REFRESH_TOKEN_COOKIE_OPTIONS,
  );

  return nextResponse;
};
