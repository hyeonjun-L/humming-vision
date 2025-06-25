import { ContactSearchFieldEnum } from "@humming-vision/shared";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page");
  const take = searchParams.get("take");
  const order__createdAt = searchParams.get("order__createdAt") || "DESC";

  const where__name__i_like = searchParams.get(ContactSearchFieldEnum.NAME);
  const where__email__i_like = searchParams.get(ContactSearchFieldEnum.EMAIL);
  const where__subject__i_like = searchParams.get(
    ContactSearchFieldEnum.SUBJECT,
  );
  const where__company__i_like = searchParams.get(
    ContactSearchFieldEnum.COMPANY,
  );

  if (!page || !take) {
    return NextResponse.json("Missing required query parameters: page, take", {
      status: 400,
    });
  }

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const backendParams = new URLSearchParams();
    backendParams.append("page", page);
    backendParams.append("take", take);
    backendParams.append("order__createdAt", order__createdAt);

    if (where__name__i_like) {
      backendParams.append(ContactSearchFieldEnum.NAME, where__name__i_like);
    }
    if (where__email__i_like) {
      backendParams.append(ContactSearchFieldEnum.EMAIL, where__email__i_like);
    }
    if (where__subject__i_like) {
      backendParams.append(
        ContactSearchFieldEnum.SUBJECT,
        where__subject__i_like,
      );
    }
    if (where__company__i_like) {
      backendParams.append(
        ContactSearchFieldEnum.COMPANY,
        where__company__i_like,
      );
    }

    const backendUrl = `${END_POINT}/contact?${backendParams.toString()}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return NextResponse.json("Failed to fetch contacts", {
        status: response.status,
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[contact] Fetch error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
