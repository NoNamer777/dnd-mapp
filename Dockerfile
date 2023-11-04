ARG NODE_VERSION=18.15-alpine

FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS build-client

WORKDIR /client

COPY package*.json .

RUN npm ci

COPY . .

RUN npx nx build client


FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS build-server

RUN apk --no-cache --virtual build-dependencies add python3 make g++

WORKDIR /server

COPY package*.json .

RUN npm ci

COPY . .

RUN npx nx build server && \
    rm -rf node_modules && \
    npm ci --omit dev && \
    mv node_modules dist/server/node_modules

COPY --from=build-client /client/dist/client dist/client

COPY --from=build-client /client/dist/data dist/server/node_modules/@dnd-mapp/data


FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build-server server/dist .

ENV MIGRATION_FILES_PATH=/usr/src/app/server/db/migrations/*.js
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["node", "/usr/src/app/server/main.js"]
