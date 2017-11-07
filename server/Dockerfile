FROM node:8.9

WORKDIR /app
COPY . .

RUN npm install --production

ENTRYPOINT ["node", "server"]
