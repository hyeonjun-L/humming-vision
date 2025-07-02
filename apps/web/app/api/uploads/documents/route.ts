import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 업로드되지 않았습니다." },
        { status: 400 },
      );
    }

    if (!file.type.includes("pdf")) {
      return NextResponse.json(
        { error: "PDF 파일만 업로드 가능합니다." },
        { status: 400 },
      );
    }

    const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
    const END_POINT = process.env[ENV_API_END_POINT_KEY];

    if (!END_POINT) {
      return NextResponse.json(
        { error: "API endpoint not configured" },
        { status: 500 },
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: "인증 토큰이 없습니다." },
        { status: 401 },
      );
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
    };

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const response = await axios.post(
      `${END_POINT}/common/asset/upload`,
      backendFormData,
      {
        headers,
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Document upload error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);

      return NextResponse.json(
        error.response?.data || { error: "파일 업로드에 실패했습니다." },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "파일 업로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
};
