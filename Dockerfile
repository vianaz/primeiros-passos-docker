FROM node:20-slim 
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./


RUN npm install pnpm
RUN pnpm install --no-frozen-lockfile

COPY src ./

EXPOSE 4000 

ENTRYPOINT ["pnpm"]
CMD ["start:dotenv"]