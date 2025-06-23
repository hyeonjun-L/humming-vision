import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_NAMES } from "consts/cookie.const";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import verifyAccessToken from "./verify-access-token";

const LOGIN_PATH = `${ADMIN_ROUTE_PATH}${AdminRoutePath.LOGIN}`;

async function requireAdminUser() {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = (await cookieStore).get(
    COOKIE_NAMES.REFRESH_TOKEN,
  )?.value;
  const nextUrl = (await cookieStore).get("next-url")?.value || "/admin";

  const refreshRedirect = `/admin/refresh?redirect=${encodeURIComponent(nextUrl)}`;

  if (!accessToken) {
    return refreshToken ? redirect(refreshRedirect) : redirect(LOGIN_PATH);
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    return payload;
  } catch {
    return refreshToken ? redirect(refreshRedirect) : redirect(LOGIN_PATH);
  }
}

export default requireAdminUser;
