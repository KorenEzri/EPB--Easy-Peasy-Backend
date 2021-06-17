FROM node:12.13.0 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY . .
RUN  npm install && npm run build
CMD ["npm", "start"]

FROM node:16-alpine3.11

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/build ./build