# 베이스 이미지 설정
FROM node:20-alpine AS base

# ======================
# 1단계: 빌더 이미지
# ======================
FROM node:20 AS builder
WORKDIR /app

# Turbo prune 결과물만 복사 (루트에서 빌드 시 기준)
COPY out/json/package.json ./package.json
COPY out/json/package-lock.json ./package-lock.json
COPY out/json/apps/web/package.json ./apps/web/package.json

# 의존성 설치 (dev 포함)
RUN npm install

# 전체 소스 복사 (Next.js 코드 + 설정 파일 포함)
COPY out/full ./

# Next.js 빌드 (web workspace만)
RUN npm run build --workspace=web


# ======================
# 2단계: 런타임 이미지
# ======================
FROM base AS runner
WORKDIR /app

# 보안 목적 사용자 생성
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs

# 빌드된 결과물만 복사 (standalone 방식)
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

# Next.js 실행
CMD ["node", "apps/web/server.js"]
