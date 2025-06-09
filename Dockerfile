FROM node:22-alpine AS build

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/doc ./doc

EXPOSE 4000

CMD sh -c "npx prisma generate && npx prisma migrate deploy && node dist/main.js"
