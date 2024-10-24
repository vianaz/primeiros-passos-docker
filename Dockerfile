FROM node:20-slim 
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY src ./

EXPOSE 4000 

ENTRYPOINT ["pnpm"]
CMD ["start:dotenv"]