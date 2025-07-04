import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import {
  handleApiError,
  handleConfigError,
  handleAuthError,
} from "utils/api-error-handler";

export const POST = async (
  request: NextRequest,
  { params }: { params: { category: string } },
) => {
  const body = await request.json();
  const { category } = await params;

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  if (!accessToken) {
    return handleAuthError("인증 토큰이 없습니다.");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      `${END_POINT}/product/${category}`,
      body,
      {
        headers,
        adapter: "fetch",
      },
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return handleApiError(error, `product create ${category}`);
  }
};
