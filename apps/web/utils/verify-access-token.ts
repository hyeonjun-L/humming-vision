import { ENV_JWT_SECRET_KEY } from "consts/env-keys.const";
import { jwtVerify } from "jose";
import { Admin } from "@humming-vision/shared";

async function verifyAccessToken(token: string) {
  const secret = process.env[ENV_JWT_SECRET_KEY];
  if (!secret) throw new Error("JWT 시크릿 키가 설정되지 않았습니다.");

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
    clockTolerance: "5s",
  });

  return payload as Record<string, Admin>;
}

export default verifyAccessToken;
