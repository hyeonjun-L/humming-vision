import {
  CategoriesEnum,
  CategoryRelationMapKebab,
} from "@humming-vision/shared";
import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import {
  handleApiError,
  handleAuthError,
  handleConfigError,
} from "utils/api-error-handler";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const body = await request.json();
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  if (!accessToken) {
    return handleAuthError("인증 토큰이 없습니다.");
  }

  if (!category) {
    return NextResponse.json(
      { error: "Category parameter is required" },
      { status: 400 },
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  console.log("Update body:", JSON.stringify(body, null, 2));
  console.log("Category:", category);
  console.log("Product ID:", id);

  const kebabCategory =
    CategoryRelationMapKebab[category as keyof typeof CategoriesEnum];

  if (!kebabCategory) {
    return NextResponse.json(
      { error: `Invalid category: ${category}` },
      { status: 400 },
    );
  }

  try {
    const response = await axios.patch(
      `${END_POINT}/product/${kebabCategory}/${id}`,
      body,
      {
        headers,
        adapter: "fetch",
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return handleApiError(error, `product update ${id}`);
  }
};
