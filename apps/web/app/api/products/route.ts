import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get("category");
  const page = searchParams.get("page");
  const take = searchParams.get("take");

  const where__name__i_like = searchParams.get("where__name__i_like");
  const order__name = searchParams.get("order__name");
  const order__id = searchParams.get("order__id");
  const order__createdAt = searchParams.get("order__createdAt") || "DESC";

  const camera__maker__equal = searchParams.get("camera__maker__equal");
  const _camera__resolution__between = searchParams.get(
    "_camera__resolution__between",
  );
  const camera__speed__between = searchParams.get("camera__speed__between");
  const camera__interface__equal = searchParams.get("camera__interface__equal");

  const lens__type__equal = searchParams.get("lens__type__equal");
  const lens__mount__equal = searchParams.get("lens__mount__equal");
  const lens__resolution__between = searchParams.get(
    "lens__resolution__between",
  );
  const lens__focalLength__between = searchParams.get(
    "lens__focalLength__between",
  );

  const frameGrabber__maker__equal = searchParams.get(
    "frameGrabber__maker__equal",
  );
  const frameGrabber__interface__equal = searchParams.get(
    "frameGrabber__interface__equal",
  );

  const software__maker__equal = searchParams.get("software__maker__equal");

  if (!category) {
    return NextResponse.json("Missing required query parameter: category", {
      status: 400,
    });
  }

  if (!page || !take) {
    return NextResponse.json("Missing required query parameters: page, take", {
      status: 400,
    });
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return NextResponse.json("API endpoint not configured", { status: 500 });
  }

  try {
    const backendParams = new URLSearchParams();
    backendParams.append("page", page);
    backendParams.append("take", take);
    backendParams.append("order__createdAt", order__createdAt);

    if (where__name__i_like) {
      backendParams.append("where__name__i_like", where__name__i_like);
    }

    if (order__id) {
      backendParams.append("order__id", order__id);
    }

    if (order__name) {
      backendParams.append("order__name", order__name);
    }

    if (camera__maker__equal) {
      backendParams.append("camera__maker__equal", camera__maker__equal);
    }
    if (_camera__resolution__between) {
      backendParams.append(
        "_camera__resolution__between",
        _camera__resolution__between,
      );
    }
    if (camera__speed__between) {
      backendParams.append("camera__speed__between", camera__speed__between);
    }
    if (camera__interface__equal) {
      backendParams.append(
        "camera__interface__equal",
        camera__interface__equal,
      );
    }

    if (lens__type__equal) {
      backendParams.append("lens__type__equal", lens__type__equal);
    }
    if (lens__mount__equal) {
      backendParams.append("lens__mount__equal", lens__mount__equal);
    }
    if (lens__resolution__between) {
      backendParams.append(
        "lens__resolution__between",
        lens__resolution__between,
      );
    }
    if (lens__focalLength__between) {
      backendParams.append(
        "lens__focalLength__between",
        lens__focalLength__between,
      );
    }

    if (frameGrabber__maker__equal) {
      backendParams.append(
        "frameGrabber__maker__equal",
        frameGrabber__maker__equal,
      );
    }
    if (frameGrabber__interface__equal) {
      backendParams.append(
        "frameGrabber__interface__equal",
        frameGrabber__interface__equal,
      );
    }

    if (software__maker__equal) {
      backendParams.append("software__maker__equal", software__maker__equal);
    }

    const backendUrl = `${END_POINT}/product/${category}?${backendParams.toString()}`;

    const response = await axios.get(backendUrl, {
      adapter: "fetch",
      fetchOptions: {
        cache: "no-cache",
      },
    });

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("[products] Fetch error:", error);

    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);

      return NextResponse.json(
        error.response?.data || "Failed to fetch products",
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json("Internal server error", { status: 500 });
  }
};
