FROM oven/bun:1 AS build

WORKDIR /app

COPY readness-web/package.json readness-web/bun.lock ./

RUN bun install --frozen-lockfile

COPY readness-web/ .

RUN bun run build