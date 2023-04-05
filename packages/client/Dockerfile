FROM node:16-alpine AS build-step

RUN mkdir /app

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN nx run client:test:ci


FROM nginx:1.23-alpine

COPY --from=build-step app/dist/client /usr/share/nginx/html
