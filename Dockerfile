ARG NODE_VERSION=22-alpine

# syntax=docker/dockerfile:experimental
FROM node:${NODE_VERSION}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

COPY . .

USER node

ENTRYPOINT ["pnpm"]
CMD ["start"]