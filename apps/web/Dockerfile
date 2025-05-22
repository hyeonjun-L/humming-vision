# Base image
FROM node:20-alpine AS base

# ==================================
# 1단계: 빌더
# ==================================
FROM node:20 AS builder
WORKDIR /app

# Turbo prune 결과물만 복사
COPY out/json/package.json ./package.json
COPY out/json/package-lock.json ./package-lock.json
COPY out/json/apps/web/package.json ./apps/web/package.json

# node_modules 위치를 위해 디렉토리 먼저 생성
RUN mkdir -p apps/web

# 의존성 설치 (monorepo 루트 기준)
RUN npm install

# 전체 소스 복사
COPY out/full ./

# 빌드 (web workspace만)
RUN npm run build --workspace=web

# ==================================
# 2단계: 런타임
# ==================================
FROM node:20-alpine AS runner
WORKDIR /app

# 보안 사용자
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
USER nextjs

# 빌드 결과물 복사
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]