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

# api만 남기고 prune (이미 실행했다면 생략 가능)
RUN turbo prune api --docker

# ======================
# 2단계: 의존성 설치
# ======================
FROM base AS installer
WORKDIR /app

# 필수 파일 복사 (루트 package.json, lockfile 포함)
COPY --from=builder /app/out/json/package.json ./package.json
COPY --from=builder /app/out/json/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/json/pnpm-workspace.yaml ./pnpm-workspace.yaml

# 👇 shared 패키지도 같이 복사
COPY --from=builder /app/out/full/packages/shared ./packages/shared

# 의존성 설치 (pnpm 기준)
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 전체 소스 복사
COPY --from=builder /app/out/full/ .

# 빌드 (api만)
RUN npx turbo run build --filter=api

# ======================
# 3단계: 런타임 이미지
# ======================
FROM base AS runner
WORKDIR /app

# 보안 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# 빌드 결과 복사
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

EXPOSE 4000
CMD ["node", "dist/main"]