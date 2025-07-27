import { type NextRequest, NextResponse } from "next/server";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import verifyAccessToken from "utils/verify-access-token";

const createRedirectUrl = (path: string, request: NextRequest) => {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const host = forwardedHost || request.nextUrl.host;
  const protocol = forwardedProto;

  return new URL(path, `${protocol}://${host}`);
};

const createRefreshUrl = (request: NextRequest, redirectPath: string) => {
  const refreshUrl = new URL("/admin/refresh", request.url);
  refreshUrl.searchParams.set("redirect", redirectPath);

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

  if (pathname === loginPath) {
    if (accessToken && (await isValidAccessToken(accessToken))) {
      return NextResponse.redirect(createRedirectUrl(contactPath, request));
    }
    return NextResponse.next();
  }

  if (accessToken) {
    if (await isValidAccessToken(accessToken)) {
      return NextResponse.next();
    }

    if (refreshToken) {
      return NextResponse.redirect(createRefreshUrl(request, pathname));
    }

    return NextResponse.redirect(createRedirectUrl(loginPath, request));
  }

  if (refreshToken) {
    return NextResponse.redirect(createRefreshUrl(request, pathname));
  }

  return NextResponse.redirect(createRedirectUrl(loginPath, request));
}

export const config = {
  matcher: ["/admin/((?!refresh).*)", "/admin$"],
};
