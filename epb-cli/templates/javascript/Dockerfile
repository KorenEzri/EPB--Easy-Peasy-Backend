FROM node:16-alpine3.11

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install --only=production

COPY . .

WORKDIR /app/client

RUN npm install --only=production

RUN npm run build

EXPOSE 8080

WORKDIR /app

ENV MONGO_URI=""

CMD ["npm","start"]