import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import {
  handleApiError,
  handleValidationError,
  handleConfigError,
} from "utils/api-error-handler";
import verifyAccessToken from "utils/verify-access-token";

const checkIsAdmin = async (token?: string): Promise<boolean> => {
  if (!token) return false;
  try {
    await verifyAccessToken(token);
    return true;
  } catch {
    return false;
  }
};

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const isAdmin = await checkIsAdmin(accessToken);

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
    return handleValidationError("Missing required query parameter: category");
  }

  if (!page || !take) {
    return handleValidationError(
      "Missing required query parameters: page, take",
    );
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
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
      fetchOptions: isAdmin
        ? { cache: "no-cache" }
        : {
            next: {
              revalidate: 3600,
            },
            cache: "force-cache",
          },
    });

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "products fetch");
  }
};
