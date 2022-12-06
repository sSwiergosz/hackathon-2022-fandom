FROM node:18-alpine

EXPOSE 4000

COPY src/ package.json yarn.lock app/

WORKDIR /app

RUN npm install

CMD ["node", "index.mjs"]

