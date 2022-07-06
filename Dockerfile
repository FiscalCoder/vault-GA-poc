FROM node:14

WORKDIR /app

COPY /package.json .

RUN npm install

COPY . .

RUN npm run client-install

WORKDIR /app/client

RUN npm run build
