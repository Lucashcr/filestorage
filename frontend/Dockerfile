FROM node:23-alpine

WORKDIR /app

RUN corepack enable pnpm && corepack install -g pnpm@latest-10

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
