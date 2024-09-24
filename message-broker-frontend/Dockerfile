FROM node:20.17.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/message-broker-frontend/* /usr/share/nginx/html

EXPOSE 80