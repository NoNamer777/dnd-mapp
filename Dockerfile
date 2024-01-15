ARG NODE_VERSION=18.15-alpine

FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS build-front-end

WORKDIR /front-end

COPY package*.json .

RUN apk --no-cache --virtual build-dependencies add python3 build-base && \
    npm ci

COPY . .

RUN npx nx build front-end


FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS build-back-end

WORKDIR /back-end

COPY package*.json .

RUN apk --no-cache --virtual build-dependencies add python3 build-base && \
    npm ci

COPY . .

RUN npx nx build back-end && \
    rm -rf node_modules && \
    npm ci --omit dev && \
    mv node_modules dist/back-end/node_modules

COPY --from=build-front-end /front-end/dist/front-end dist/front-end

COPY --from=build-front-end /front-end/dist/data dist/back-end/node_modules/@dnd-mapp/data


FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY --from=build-back-end back-end/dist .

ENV MIGRATION_FILES_PATH=/usr/src/app/back-end/db/migrations/*.js
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "/usr/src/app/back-end/main.js"]
