import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams.getAll("searchParams");
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  console.log("searchParams:::", searchParams);

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  return NextResponse.json({
    message: "This is a placeholder response. Implement your logic here.",
    searchParams,
  });

  // try {
  //   const response = await fetch(
  //     `${END_POINT}/admin/contact?page=${page}&take=${take}`,
  //     {
  //       method: "GET",
  //       headers,
  //     },
  //   );

  //   if (!response.ok) {
  //     return NextResponse.json("Failed to fetch contacts", {
  //       status: response.status,
  //     });
  //   }

  //   const data = await response.json();
  //   return NextResponse.json(data);
  // } catch (error) {
  //   console.error("❌ [contact] Fetch error:", error);
  //   return NextResponse.json("Internal server error", { status: 500 });
  // }
};
