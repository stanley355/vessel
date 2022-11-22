# syntax=docker/dockerfile:1

FROM node:14

# ENV KONTENKU_URL=http://localhost:3000
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]