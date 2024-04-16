# stage1 - build react app first
FROM node:20.12.2-alpine as build
WORKDIR /app
COPY . /app

# TODO: extract this env to build scripts in CI
ENV REACT_APP_SERVER_API_URL 'https://api.great-escape.ru'
ENV REACT_APP_RE_CAPTCHA_KEY '6LeHeCsbAAAAAFuJRDBh6Uz_HmZjs2Vxx2BSZdKx'
RUN npm install --audit=false
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY .deploy/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
