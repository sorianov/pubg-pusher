FROM node:alpine

RUN apk update && apk add --update bash && rm -rf /var/cache/apk/*

ENV app pubg-pusher

RUN mkdir -p /usr/src/$app

WORKDIR /usr/src/$app

COPY package.json .

RUN npm install

COPY . .
