FROM node:lts as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run tsc

CMD ["node", "dist/src/app.js"]