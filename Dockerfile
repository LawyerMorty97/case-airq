# syntax=docker/dockerfile:1

FROM node:21-alpine3.17

WORKDIR /app
COPY . ./
RUN npm i
RUN npm run build

CMD ["node", "dist/index.js"]

EXPOSE 8080