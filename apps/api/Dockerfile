# ==================================
# 1단계: 빌더
# ==================================
FROM node:20 AS builder
WORKDIR /app

# Turbo prune 결과물 복사
COPY out/json/package.json ./package.json
COPY out/json/package-lock.json ./package-lock.json
COPY out/json/apps/api/package.json ./apps/api/package.json

# 디렉토리 구조 사전 생성
RUN mkdir -p apps/api

# 의존성 설치
RUN npm install

# 전체 소스 복사
COPY out/full ./

# NestJS 빌드 (api workspace만)
RUN npm run build --workspace=api

# ==================================
# 2단계: 런타임
# ==================================
FROM node:20-slim AS runner
WORKDIR /app

# 필요한 파일 복사
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

EXPOSE 4000
CMD ["node", "dist/main"]