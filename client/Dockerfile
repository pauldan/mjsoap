FROM node:lts

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app

RUN yarn config set registry <local:registry> && yarn

COPY . /app
