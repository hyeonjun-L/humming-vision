import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import verifyAccessToken from "utils/verify-access-token";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  const pathname = request.nextUrl.pathname;

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  if (pathname === `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`) {
    if (accessToken) {
      return NextResponse.redirect(
        new URL(`${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`, request.url),
      );
    }

    if (!refreshToken) {
      return NextResponse.next();
    }
  }

  const redirectResponse = NextResponse.redirect(
    new URL(`${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`, request.url),
  );

  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      return NextResponse.next();
    } catch {
      redirectResponse.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
    }
  }

  if (!refreshToken) {
    return redirectResponse;
  }

  const refreshPromise = fetch(`${END_POINT}/admin/token/access`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  event.waitUntil(refreshPromise);

  try {
    const refreshResponse = await refreshPromise;

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshResponse.json();

      const response =
        pathname === `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`
          ? NextResponse.redirect(
              new URL(
                `${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`,
                request.url,
              ),
            )
          : NextResponse.next();

      response.cookies.set(
        COOKIE_NAMES.ACCESS_TOKEN,
        newAccessToken,
        ACCESS_TOKEN_COOKIE_OPTIONS,
      );

      response.cookies.set(
        COOKIE_NAMES.REFRESH_TOKEN,
        newRefreshToken,
        REFRESH_TOKEN_COOKIE_OPTIONS,
      );

      return response;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
  }

  redirectResponse.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
  return redirectResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico)admin.*)",
    "/admin$",
  ],
};
