import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "파일이 업로드되지 않았습니다." },
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

  const maxFileSize = 5 * 1024 * 1024;
  for (const file of files) {
    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: `파일 크기가 5MB를 초과합니다: ${file.name}` },
        { status: 413 },
      );
    }
  }
  const backendFormData = new FormData();
  files.forEach((file) => {
    backendFormData.append("files", file);
  });

  try {
    const response = await axios.post(
      `${END_POINT}/common/asset/upload-multiple`,
      backendFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        adapter: "fetch",
      },
    );

    console.log("File upload successful:", response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Image upload error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);

      return NextResponse.json(
        error.response?.data || { error: "파일 업로드에 실패했습니다." },
        { status: error.response?.status || 500 },
      );
    }

    if (error instanceof Error && error.message.includes("Body exceeded")) {
      return NextResponse.json(
        {
          error: "파일 크기가 너무 큽니다. 10MB 이하의 파일을 업로드해주세요.",
        },
        { status: 413 },
      );
    }

    return NextResponse.json(
      { error: "파일 업로드 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
