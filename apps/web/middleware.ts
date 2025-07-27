import { type NextRequest, NextResponse } from "next/server";
import { ENV_API_END_POINT_KEY, NODE_ENV_KEY } from "consts/env-keys.const";
import { COOKIE_NAMES } from "consts/cookie.const";
import {
  ADMIN_ROUTE_PATH,
  AdminRoutePath,
  PRODUCT_DOMAIN,
} from "consts/route.const";
import verifyAccessToken from "utils/verify-access-token";

const createRedirectUrl = (path: string, request: NextRequest) => {
  const isProduction = process.env[NODE_ENV_KEY] === "production";

  const host = isProduction
    ? PRODUCT_DOMAIN
    : request.headers.get("x-forwarded-host") || request.nextUrl.host;

  const protocol = isProduction
    ? "https"
    : request.headers.get("x-forwarded-proto") || "http";

  const redirectUrl = new URL(path, `${protocol}://${host}`);

  console.log(`Redirecting to: ${redirectUrl.toString()}`);

  return redirectUrl;
};

const createRefreshUrl = (request: NextRequest, redirectPath: string) => {
  const isProduction = process.env[NODE_ENV_KEY] === "production";

  const host = isProduction
    ? PRODUCT_DOMAIN
    : request.headers.get("x-forwarded-host") || request.nextUrl.host;

  const protocol = isProduction
    ? "https"
    : request.headers.get("x-forwarded-proto") || "http";

  const refreshUrl = new URL("/admin/refresh", `${protocol}://${host}`);
  refreshUrl.searchParams.set("redirect", redirectPath);

  console.log(`Redirecting to refresh URL: ${refreshUrl.toString()}`);

  return refreshUrl;
};

const isValidAccessToken = async (token: string): Promise<boolean> => {
  try {
    await verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  const loginPath = `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;
  const contactPath = `${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`;

  console.log("---- MIDDLEWARE ----");
  console.log("pathname:", pathname);
  console.log("accessToken:", accessToken ? "present" : "none");
  console.log("refreshToken:", refreshToken ? "present" : "none");
  console.log("loginPath:", loginPath);
  console.log("contactPath:", contactPath);

  if (pathname === loginPath) {
    console.log("==> at login path");
    if (accessToken && (await isValidAccessToken(accessToken))) {
      console.log("valid access token, redirect to contact page");
      return NextResponse.redirect(createRedirectUrl(contactPath, request));
    }
    console.log("no valid token, allow to login page");
    return NextResponse.next();
  }

  if (accessToken) {
    if (await isValidAccessToken(accessToken)) {
      console.log("valid access token, allow access");
      return NextResponse.next();
    }

    if (refreshToken) {
      console.log(
        "access token invalid, refresh token exists. redirect to refresh",
      );
      return NextResponse.redirect(createRefreshUrl(request, pathname));
    }

    console.log("access token invalid, no refresh token. redirect to login");
    return NextResponse.redirect(createRedirectUrl(loginPath, request));
  }

  if (refreshToken) {
    console.log(
      "no access token, but refresh token exists. redirect to refresh",
    );
    return NextResponse.redirect(createRefreshUrl(request, pathname));
  }

  console.log("no tokens at all, redirect to login");
  return NextResponse.redirect(createRedirectUrl(loginPath, request));
}

export const config = {
  matcher: ["/admin/((?!refresh).*)", "/admin$"],
};
