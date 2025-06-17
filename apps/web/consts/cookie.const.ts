import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import {
  ENV_JWT_ACCESS_EXPIRES,
  ENV_JWT_REFRESH_EXPIRES,
  NODE_ENV_KEY,
} from "./env-keys.const";

export const createCookieOptions = (
  maxAgeEnvKey?: string,
  httpOnly = true,
): Partial<ResponseCookie> => ({
  httpOnly,
  secure: process.env[NODE_ENV_KEY] === "production",
  sameSite: "strict",
  path: "/",
  maxAge:
    maxAgeEnvKey && process.env[maxAgeEnvKey]
      ? parseInt(process.env[maxAgeEnvKey], 10)
      : undefined,
});

export const ACCESS_TOKEN_COOKIE_OPTIONS = createCookieOptions(
  ENV_JWT_ACCESS_EXPIRES,
  false,
);

export const REFRESH_TOKEN_COOKIE_OPTIONS = createCookieOptions(
  ENV_JWT_REFRESH_EXPIRES,
);

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;
