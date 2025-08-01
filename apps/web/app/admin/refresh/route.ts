import { ENV_API_END_POINT_KEY, NODE_ENV_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_ROUTE_PATH,
  AdminRoutePath,
  PRODUCT_DOMAIN,
} from "consts/route.const";
import axios from "axios";
import { TokenResponse } from "@humming-vision/shared";

const createRedirectUrl = (path: string, request: NextRequest) => {
  const isProduction = process.env[NODE_ENV_KEY] === "production";

  const host = isProduction
    ? PRODUCT_DOMAIN
    : request.headers.get("x-forwarded-host") || request.nextUrl.host;

  const protocol = isProduction
    ? "https"
    : request.headers.get("x-forwarded-proto") || "http";

  return new URL(path, `${protocol}://${host}`);
};

export const GET = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const url = new URL(request.url);
  const redirectPath = url.searchParams.get("redirect");

  if (!refreshToken) {
    return NextResponse.redirect(
      createRedirectUrl(`${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`, request),
    );
  }

  try {
    const END_POINT = process.env[ENV_API_END_POINT_KEY];
    if (!END_POINT) {
      console.error("END_POINT not configured");
      return NextResponse.json("API endpoint not configured", { status: 500 });
    }

    const response = await axios.post<TokenResponse>(
      `${END_POINT}/admin/token/access`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        adapter: "fetch",
        fetchOptions: { cache: "no-cache" },
      },
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;

    const nextResponse = NextResponse.redirect(
      createRedirectUrl(redirectPath || "/", request),
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
  } catch (e) {
    console.error("Token refresh failed", e);

    const redirectResponse = NextResponse.redirect(
      createRedirectUrl(`${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`, request),
    );

    redirectResponse.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
    redirectResponse.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);

    return redirectResponse;
  }
};
