FROM nginx:1.17.8-alpine
COPY ./src/main/webapp/index.html /usr/share/nginx/html/index.html
RUN rm /etc/nginx/conf.d/default.conf
COPY .deploy/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
