FROM node:18

WORKDIR /app

COPY ./package.json ./package-lock.json /app/
RUN npm install

COPY ./src /app/src

RUN tsc

EXPOSE 8080

CMD ["node", "dist/index.js"]
