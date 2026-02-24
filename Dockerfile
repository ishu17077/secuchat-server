FROM node:25-alpine3.22 AS node

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/app.js" ]
