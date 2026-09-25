FROM oven/bun:1 AS build
WORKDIR /app
COPY readness-web/package.json readness-web/bun.lock ./
RUN bun install --frozen-lockfile
COPY readness-web/ .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build


FROM oven/bun:1-slim AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .

RUN bun add -g serve
EXPOSE 3000
CMD ["bunx", "serve", "-s", "dist", "-l", "3000"]