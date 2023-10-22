


FROM nginx:1.25-alpine

COPY --from=build-step app/dist/client /usr/share/nginx/html

EXPOSE 80/tcp
