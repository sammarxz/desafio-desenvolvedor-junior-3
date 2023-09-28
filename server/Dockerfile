FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

RUN npm install npm@latest -g

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

COPY . .

# CMD [ "npm", "start" ]