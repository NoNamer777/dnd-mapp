FROM node:18-alpine AS build-step

RUN mkdir /server-app

WORKDIR /server-app

COPY package*.json /server-app

RUN npm ci

COPY . /server-app

RUN npx nx run server:test:ci


FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build-step server-app/dist/server /usr/src/app/

RUN npm ci

COPY --from=build-step server-app/dist/data node_modules/@dnd-mapp/data/

CMD ["node", "/usr/src/app/main"]
