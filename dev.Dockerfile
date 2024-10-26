# syntax = docker/dockerfile:1.4
FROM node:20-alpine as deps

ENV NODE_ENV development
WORKDIR /usr/src

RUN apk --update --no-cache add git
COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
	YARN_CACHE_FOLDER=/root/.yarn \
	yarn install --development
COPY . .

EXPOSE 3000

CMD ["yarn", "start:debug"]
