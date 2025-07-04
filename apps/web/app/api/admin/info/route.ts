import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "consts/cookie.const";
import verifyAccessToken from "utils/verify-access-token";
import { handleAuthError } from "utils/api-error-handler";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return handleAuthError("Unauthorized");
  }

  try {
    const payload = await verifyAccessToken(accessToken);

    return NextResponse.json(payload);
  } catch (e) {
    console.error("AccessToken 검증 실패:", e);
    return handleAuthError("Invalid token");
  }
}
