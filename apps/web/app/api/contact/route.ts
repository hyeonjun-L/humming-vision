import {
  ContactSearchFieldEnum,
  CreateContactDto,
} from "@humming-vision/shared";
import axios from "axios";
import { COOKIE_NAMES } from "consts/cookie.const";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { NextRequest, NextResponse } from "next/server";
import {
  handleApiError,
  handleValidationError,
  handleConfigError,
} from "utils/api-error-handler";

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
    return handleValidationError(
      "Missing required query parameters: page, take",
    );
  }

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
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

    const response = await axios.get(backendUrl, {
      headers,
      adapter: "fetch",
    });

    const data = await response.data;
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(error, "contact fetch");
  }
};

type ContactFormData = Omit<CreateContactDto, "isRead">;

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const { name, company, email, subject, message } = body as ContactFormData;

  if (!name || !email || !message) {
    return handleValidationError(
      "Missing required fields: name, email, content",
    );
  }

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  try {
    const backendUrl = `${END_POINT}/contact`;

    const response = await axios.post(
      backendUrl,
      {
        name,
        company: company || null,
        email,
        subject: subject || null,
        message,
      },
      {
        headers,
        adapter: "fetch",
      },
    );

    const data = await response.data;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleApiError(error, "contact creation");
  }
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const id = searchParams.get("id");

  if (!id) {
    return handleValidationError("Missing required query parameter: id");
  }

  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  if (!END_POINT) {
    return handleConfigError("API endpoint not configured");
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.delete(`${END_POINT}/contact/${id}`, {
      headers,
      adapter: "fetch",
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return handleApiError(error, "contact delete");
  }
};
