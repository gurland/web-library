FROM node:lts

WORKDIR /app

COPY package*.json ./
RUN npm install

# RUN npm ci --only=production
COPY . .

CMD [ "node", "server.js" ]