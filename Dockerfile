FROM node:16

WORKDIR /usr/src/app

COPY src ./src
COPY index.ts ./
COPY tsconfig.json ./
COPY package*.json ./
COPY .env ./

RUN npm ci

RUN npm run build

CMD [ "npm", "run", "prod:start" ]
