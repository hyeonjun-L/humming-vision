# 베이스 이미지 설정
FROM node:20-alpine AS base

# ======================
# 1단계: 빌더 이미지
# ======================
FROM base AS builder
WORKDIR /app

# 필요한 패키지 설치
RUN apk update && apk add --no-cache libc6-compat

# 터보 설치 (Prune에 사용)
RUN npm install -g turbo

# 전체 프로젝트 복사
COPY . .
COPY .env .env

# web만 남기고 prune (이미 실행했다면 생략 가능)
RUN turbo prune web --docker

# ======================
# 2단계: 의존성 설치
# ======================
FROM base AS installer
WORKDIR /app

# 필수 파일 복사
COPY --from=builder /app/out/json/ .

# 설치
RUN npm install --frozen-lockfile

# 전체 소스 복사
COPY --from=builder /app/out/full/ .

# 빌드
RUN npx turbo run build --filter=web


# ======================
# 3단계: 런타임 이미지
# ======================
FROM base AS runner
WORKDIR /app

# 사용자 생성 (보안 목적)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# 필요한 파일만 복사 (standalone 방식)
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000

# Next.js 실행
CMD ["node", "apps/web/server.js"]
