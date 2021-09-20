FROM node:current-slim

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN npm init

COPY . .

EXPOSE 3333

CMD ["npm","run","start"]

CMD ["heroku","container:push","web"]