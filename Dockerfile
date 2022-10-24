FROM node

WORKDIR /app

COPY package.json /app

RUN yarn add next-auth --ignore-engines
RUN yarn install

COPY . /app

EXPOSE $PORT

CMD yarn next build && yarn next start