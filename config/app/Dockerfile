FROM node:8.10.0

RUN mkdir /usr/app
WORKDIR /usr/app
RUN apt-get update && apt-get install pngquant optipng
COPY ./app/package.json package.json
COPY ./app/.babelrc .babelrc
RUN npm install
ADD ./app/webpack.common.js webpack.common.js
ADD ./app/webpack.dev.js webpack.dev.js
ADD ./app/webpack.prod.js webpack.prod.js
ADD ./app/cosmos.config.js cosmos.config.js
ADD ./app/cosmos.proxies.js cosmos.proxies.js
