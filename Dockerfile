FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

COPY . .

RUN bun run build