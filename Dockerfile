FROM node:19 as builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm ci --quiet && npm run build

FROM node:19

WORKDIR /app
ENV NODE_ENV=production
ENV DISCORD_TOKEN=invalid

COPY package*.json ./

RUN npm ci --queit --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "npm", "start" ]
