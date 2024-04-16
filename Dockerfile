FROM  node:20-alpine

WORKDIR /app

COPY package.json .
COPY .env .

RUN npm install