FROM node:latest

WORKDIR /app

COPY sp/test/QueryMe/package.json /app

RUN npm install

COPY . /app

EXPOSE 5001

CMD ["npm", "start"]
