FROM --platform=$BUILDPLATFORM node:18-alpine AS build-step

RUN apk --no-cache --virtual build-dependencies add python3 make g++

RUN mkdir /server-app

WORKDIR /server-app

COPY . /server-app

RUN npm ci

RUN npx nx build server -c ci

RUN mkdir dist/server-1
RUN cp -RT dist/server dist/server-1
RUN rm -rf dist/server/*
RUN mkdir dist/server/app
RUN mv dist/server-1/* dist/server/app
RUN mv dist/server/app/package*.json dist/server

RUN mkdir dist/server/database
COPY packages/server/typeorm dist/server/database
COPY packages/server/start.sh dist/server


FROM node:18-alpine

WORKDIR /usr/src

COPY --from=build-step server-app/dist/server /usr/src

RUN apk update && \
    apk upgrade && \
    apk add --virtual build-deps --no-cache python3 make && \
    apk add --no-cache bash && \
    npm ci --omit dev && \
    apk del build-deps

COPY --from=build-step server-app/dist/data node_modules/@dnd-mapp/data/

ENV DATABASE_FILES_PATH=/usr/src/database
ENV HOST=0.0.0.0

EXPOSE 8080

CMD /usr/src/start.sh
