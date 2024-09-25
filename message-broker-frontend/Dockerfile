FROM node:20.17.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID

RUN sed -i "s|FIREBASE_API_KEY|$FIREBASE_API_KEY|g" src/environment/environment.ts && \
    sed -i "s|FIREBASE_AUTH_DOMAIN|$FIREBASE_AUTH_DOMAIN|g" src/environment/environment.ts && \
    sed -i "s|FIREBASE_PROJECT_ID|$FIREBASE_PROJECT_ID|g" src/environment/environment.ts && \
    sed -i "s|FIREBASE_STORAGE_BUCKET|$FIREBASE_STORAGE_BUCKET|g" src/environment/environment.ts && \
    sed -i "s|FIREBASE_MESSAGING_SENDER_ID|$FIREBASE_MESSAGING_SENDER_ID|g" src/environment/environment.ts && \
    sed -i "s|FIREBASE_APP_ID|$FIREBASE_APP_ID|g" src/environment/environment.ts

RUN npm run build

FROM nginx:stable
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/CN=localhost"
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/message-broker-frontend/* /usr/share/nginx/html

EXPOSE 443 80