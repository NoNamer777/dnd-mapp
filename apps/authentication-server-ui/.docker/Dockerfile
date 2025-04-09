FROM node:22.14 AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npx nx build authentication-server-ui


FROM nginx:1.27

COPY apps/authentication-server-ui/.docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/authentication-server-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
