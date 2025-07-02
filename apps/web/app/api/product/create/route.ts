import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  console.log("[product] Create request body:", body);

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
    // await axios.delete(`${END_POINT}/product/${id}`, {
    //   headers,
    //   adapter: "fetch",
    // });
    // return new NextResponse(null, {
    //   status: 204,
    // });
  } catch (error) {
    console.error("[contact] Fetch error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);

      return NextResponse.json(error.response?.data || "Delete failed", {
        status: error.response?.status || 500,
      });
    }

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
