import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import {
  handleApiError,
  handleValidationError,
  handleConfigError,
  handleAuthError,
} from "utils/api-error-handler";

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return handleValidationError("파일이 업로드되지 않았습니다.");
    }

    if (!file.type.includes("pdf")) {
      return handleValidationError("PDF 파일만 업로드 가능합니다.");
    }

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
    return handleApiError(error, "document upload");
  }
};
