FROM node:20 

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY src ./

EXPOSE 4000 

CMD ["pnpm start:dotenv ", "start:dotenv"]