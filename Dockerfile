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

RUN npx nx build server &&  \
    mv packages/server/typeorm dist/database && \
    mv packages/server/start.sh package*.json dist && \
    rm -rf dist/data

COPY --from=build-client /client/dist/client dist/client


FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build-server server/dist .

RUN apk update && \
    apk upgrade && \
    apk add --virtual build-deps --no-cache python3 make g++ && \
    apk add --no-cache bash && \
    npm ci --omit dev && \
    apk del build-deps

COPY --from=build-client client/dist/data node_modules/@dnd-mapp/data

ENV DATABASE_FILES_PATH=/usr/src/app/database
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["/usr/src/app/start.sh"]
