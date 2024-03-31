# Development Stage
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY nest-cli.json tsconfig.build.json tsconfig.json ./
COPY src ./src

EXPOSE 3005

CMD ["npm", "run", "start:dev"]
