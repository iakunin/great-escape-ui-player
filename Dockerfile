# stage1 - build react app first
FROM node:14.14-alpine as build
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY ./package.json /app/
#RUN yarn --silent
COPY . /app

ENV REACT_APP_SERVER_API_URL 'https://foo.com'
RUN npm install
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY .deploy/nginx.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
