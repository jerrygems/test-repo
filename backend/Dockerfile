FROM node:18.17.0


WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install


COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
