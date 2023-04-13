FROM node:18-alpine AS build-step

RUN mkdir /app

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

RUN npx nx run client:build:ci && npx nx run client:test:ci


FROM nginx:1.23-alpine

COPY --from=build-step app/dist/client /usr/share/nginx/html
