FROM node:iron-alpine

WORKDIR /usr/src/app

COPY dist ./dist
COPY .env ./

CMD [ "node", "--env-file=.env", "dist/" ]
