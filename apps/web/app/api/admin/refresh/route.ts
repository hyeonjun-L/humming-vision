import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  COOKIE_NAMES,
} from "consts/cookie.const";
import { NextResponse, type NextRequest } from "next/server";
import { publicApi } from "libs/axios";

export const GET = async (request: NextRequest) => {
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: "NO_REFRESH" }, { status: 401 });
  }

  try {
    console.log("Refreshing access token...", refreshToken);

    const response = await publicApi.post(
      "/admin/token/access",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = response.data;
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      result;

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
  } catch (error) {
    console.error("Token refresh failed:", error);

    const response = NextResponse.json(
      { message: "NO_REFRESH" },
      { status: 401 },
    );

    response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return response;
  }
};
