import { ENV_JWT_SECRET_KEY } from "consts/env-keys.const";
import { jwtVerify } from "jose";

async function verifyAccessToken(token: string) {
  const secret = process.env[ENV_JWT_SECRET_KEY];
  if (!secret) throw new Error("JWT 시크릿 키가 설정되지 않았습니다.");
  // TODO : 추후 Env 에러 미리 확인

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
}

export default verifyAccessToken;
