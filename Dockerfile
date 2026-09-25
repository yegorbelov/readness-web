FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.build.json package.json

RUN --mount=type=cache,id=bun-cache,target=/root/.bun/install/cache \
    bun install --no-save

COPY . .

RUN bun run build