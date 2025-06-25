import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import axios from "axios";
import { TokenResponse } from "@humming-vision/shared";

export const GET = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  const url = new URL(request.url);
  const redirectPath =
    url.searchParams.get("redirect") ??
    `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;

  if (!refreshToken) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  try {
    const response = await axios.post<TokenResponse>(
      `${END_POINT}/admin/token/access`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
        adapter: "fetch",
        fetchOptions: {
          cache: "no-cache",
        },
      },
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    const nextResponse = NextResponse.redirect(
      new URL(redirectPath, request.url),
    );

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
  } catch {
    const redirectResponse = NextResponse.redirect(
      new URL(redirectPath, request.url),
    );

    redirectResponse.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return redirectResponse;
  }
};
