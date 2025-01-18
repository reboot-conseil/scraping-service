FROM node:22.10.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN npx -y playwright@1.49.1 install --with-deps

COPY . .

RUN yarn build

EXPOSE 6003

CMD ["node", "dist/index.js"]