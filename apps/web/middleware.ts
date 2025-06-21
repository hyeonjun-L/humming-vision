import { type NextRequest, NextResponse } from "next/server";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import verifyAccessToken from "utils/verify-access-token";

export async function middleware(request: NextRequest) {
  const END_POINT = process.env[ENV_API_END_POINT_KEY];
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const pathname = request.nextUrl.pathname;

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  const loginPath = `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;
  const contactPath = `${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`;

  if (pathname === loginPath) {
    if (accessToken) {
      try {
        await verifyAccessToken(accessToken);
        return NextResponse.redirect(new URL(contactPath, request.url));
      } catch {
        // accessToken이 있지만 유효하지 않으면 그냥 로그인 페이지로
      }
    }

    return NextResponse.next();
  }

  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch {
      if (refreshToken) {
        const refreshUrl = request.nextUrl.clone();
        refreshUrl.pathname = "/admin/refresh";
        refreshUrl.searchParams.set("redirect", pathname);
        return NextResponse.rewrite(refreshUrl);
      } else {
        const loginUrl = new URL(loginPath, request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  if (refreshToken) {
    const refreshUrl = request.nextUrl.clone();
    refreshUrl.pathname = "/admin/refresh";
    refreshUrl.searchParams.set("redirect", pathname);
    return NextResponse.rewrite(refreshUrl);
  }

  const loginUrl = new URL(loginPath, request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|admin/refresh).*)",
    "/admin$",
  ],
};
