FROM node:20-alpine AS base

# ======================
# 1단계: 빌더
# ======================
FROM node:20 AS builder
WORKDIR /app

# 디렉토리 생성
RUN mkdir -p apps/web

# 필수 파일 복사
COPY out/json/package.json ./package.json
COPY out/json/package-lock.json ./package-lock.json
COPY out/json/apps/web/package.json ./apps/web/package.json

# 디버깅을 위한 출력
RUN echo "📦 package.json:" && cat package.json
RUN echo "📦 apps/web/package.json:" && cat apps/web/package.json

# 의존성 설치
RUN npm install || (echo "===== NPM INSTALL FAILED =====" && cat /root/.npm/_logs/* || true)

# 전체 소스 복사
COPY out/full ./

# Next.js 빌드 (web만)
RUN npm run build --workspace=web

# ======================
# 2단계: 런타임
# ======================
FROM base AS runner
WORKDIR /app

# 보안 사용자 생성
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs

# 빌드 결과 복사
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]