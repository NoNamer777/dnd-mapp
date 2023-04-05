FROM node:16-alpine AS build-step

RUN mkdir /server-app

WORKDIR /server-app

COPY package*.json /server-app

RUN npm ci

COPY . /server-app

RUN npx nx run server:test:ci


FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

COPY --from=build-step server-app/dist/server /usr/src/app

RUN npm ci --omit dev

CMD ["node", "/usr/src/app/main"]

