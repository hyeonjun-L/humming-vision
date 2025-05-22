# 1단계: 빌더 이미지
FROM node:20 AS builder

# 작업 디렉토리 설정
WORKDIR /app

# --- 1-1. 의존성 설치를 위한 최소 파일 복사 (prune 결과물 사용)
# 루트 및 api의 package.json + package-lock.json 복사
COPY ../../out/json/package.json ./package.json
COPY ../../out/json/package-lock.json ./package-lock.json
COPY ../../out/json/apps/api/package.json ./apps/api/package.json

# 의존성 설치 (dev 포함 — NestJS의 타입 등 포함됨)
RUN npm install

# --- 1-2. 전체 소스 복사 (NestJS 코드 + 설정 파일 포함)
COPY ../../out/full ./

# NestJS 앱 빌드 (해당 workspace만)
RUN npm run build --workspace=api

# 2단계: 런타임 이미지
FROM node:20-slim AS runner

# 작업 디렉토리 설정
WORKDIR /app

# --- 빌드된 결과물만 복사
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

# 앱 포트 열기
EXPOSE 4000

# NestJS 실행
CMD ["node", "dist/main"]
