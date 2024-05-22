FROM oven/bun:1 as base

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run check \
  && bun run build

FROM nginx:stable-alpine

COPY --from=base /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
