FROM node:14.18.2-alpine3.14 as development

# Set working directory
WORKDIR /app

# 
COPY package.json /app/package.json 
COPY yarn.lock  /app/yarn.lock

COPY build /app/build

# Same as npm install
# RUN yarn 

COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "yarn", "start" ]

FROM development AS build

COPY build /app/build

# RUN yarn build

# 2. For Nginx setup
FROM nginx:latest

# Copy config nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
EXPOSE 3000