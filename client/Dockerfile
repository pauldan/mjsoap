FROM node:lts

WORKDIR /app

ENV NODE_ENV=production
ENV NO_PROXY=<local:registry>

COPY package.json /app

RUN yarn config set registry <local:registry> && yarn

COPY . /app
