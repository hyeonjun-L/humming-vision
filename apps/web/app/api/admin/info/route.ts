import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "consts/cookie.const";
import verifyAccessToken from "utils/verify-access-token";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await verifyAccessToken(accessToken);

    return NextResponse.json(payload);
  } catch (e) {
    console.error("AccessToken 검증 실패:", e);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
