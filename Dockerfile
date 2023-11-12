FROM node:20

WORKDIR /usr/src/app

COPY src ./src
COPY index.ts ./
COPY tsconfig.json ./
COPY package*.json ./
COPY .env ./

RUN npm ci

RUN npm run build

CMD [ "node", "--env-file=.env", "dist/" ]
