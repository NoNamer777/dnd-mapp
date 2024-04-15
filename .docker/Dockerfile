FROM --platform=$BUILDPLATFORM node:20.12.2 AS build

WORKDIR /temp

COPY package*.json .

RUN npm ci

ENV NODE_ENV=production

COPY . .

RUN npx prisma generate --schema prisma/schema.prisma && \
    npx nx run-many -t build && \
    cp -r .docker/start.sh prisma dist/back-end && \
    mkdir dist/back-end/node_modules && \
    cp -r node_modules/.prisma dist/back-end/node_modules/.prisma


FROM node:20.12.2-alpine

WORKDIR /usr/app

COPY --from=build temp/dist .

ENV HOST=0.0.0.0
ENV NODE_ENV=production

EXPOSE 80

VOLUME ["/usr/app/front-end/browser/assets"]

CMD ["/usr/app/back-end/start.sh"]
