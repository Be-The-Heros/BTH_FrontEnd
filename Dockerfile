FROM node:14.18.2-alpine3.14 as BUILDER

WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build:docker

FROM node:14.18.2-alpine3.14

WORKDIR /app

ENV NODE_ENV=production

COPY --from=BUILDER /build/dist/package.json .

RUN yarn install
RUN yarn add class-transformer
RUN yarn add class-validator

COPY --from=BUILDER /build/dist .

CMD ["yarn", "start:dev"]