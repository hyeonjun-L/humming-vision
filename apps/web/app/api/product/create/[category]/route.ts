import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  request: NextRequest,
  { params }: { params: { category: string } }
) => {
  const body = await request.json();
  const { category } = params;

  console.log(`[product] Create ${category} request body:`, body);

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json(
      { error: "API endpoint not configured" },
      { status: 500 }
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "인증 토큰이 없습니다." },
      { status: 401 }
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    // category별로 다른 엔드포인트 사용 가능
    const response = await axios.post(
      `${END_POINT}/product/${category.toLowerCase()}`,
      body,
      {
        headers,
        adapter: "fetch",
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(`[product] Create ${category} error:`, error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);

      return NextResponse.json(
        error.response?.data || { error: "제품 생성에 실패했습니다." },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "제품 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
