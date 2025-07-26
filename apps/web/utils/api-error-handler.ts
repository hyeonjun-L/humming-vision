import { NextResponse } from "next/server";
import axios from "axios";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  field?: string;
  statusCode?: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * API 에러를 일관된 형태로 처리하는 공통 핸들러
 * @param error - 처리할 에러 객체
 * @param context - 에러 발생 컨텍스트 (로깅용)
 * @returns NextResponse 객체
 */
export function handleApiError(error: unknown, context?: string): NextResponse {
  const contextPrefix = context ? `[${context}]` : "";

  if (axios.isAxiosError(error)) {
    console.error(`${contextPrefix} Axios error:`, {
      status: error.response?.status,
      data: error.response?.data.errors || error.response?.data,
      message: error.message,
    });

    if (error.response) {
      const errorData = error.response.data as ApiErrorResponse;

      return NextResponse.json(errorData || { error: "Request failed" }, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Network error occurred" },
      { status: 500 },
    );
  }

  console.error(`${contextPrefix} Unexpected error:`, error);

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

/**
 * 유효성 검사 에러를 처리하는 헬퍼 함수
 * @param message - 에러 메시지
 * @param field - 에러가 발생한 필드 (선택적)
 * @returns NextResponse 객체
 */
export function handleValidationError(
  message: string,
  field?: string,
): NextResponse {
  const errorData: ApiErrorResponse = {
    error: message,
    ...(field && { field }),
  };

  return NextResponse.json(errorData, { status: 400 });
}

/**
 * 인증/인가 에러를 처리하는 헬퍼 함수
 * @param message - 에러 메시지
 * @returns NextResponse 객체
 */
export function handleAuthError(
  message: string = "Unauthorized",
): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * 설정 에러를 처리하는 헬퍼 함수 (예: 환경변수 누락)
 * @param message - 에러 메시지
 * @returns NextResponse 객체
 */
export function handleConfigError(
  message: string = "Server configuration error",
): NextResponse {
  console.error("Configuration error:", message);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
