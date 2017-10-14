FROM node:alpine

RUN apk update && apk add --update bash && rm -rf /var/cache/apk/*

ENV app pubg-pusher

RUN mkdir $app

WORKDIR $app

COPY package.json .

RUN npm set progress=false && \
    npm install --quiet && \
    npm install -g jasmine --quiet && \
    npm install -g standard --quiet && \
    npm cache clean --force

COPY . .
