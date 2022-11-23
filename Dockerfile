# syntax=docker/dockerfile:1

FROM node:14

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

RUN echo $GOOGLE_CLIENT_ID

ENV KONTENKU_URL=http://localhost:3000
ENV NODE_ENV=production

WORKDIR /app/vessel

COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]