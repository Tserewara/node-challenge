FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN npm install -y

EXPOSE 3000

CMD ["node", "index.js"]