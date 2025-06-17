FROM node:23 AS builder

WORKDIR /app

RUN corepack enable pnpm && corepack install -g pnpm@latest-10

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:23-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
