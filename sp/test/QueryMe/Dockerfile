FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

EXPOSE 5001

CMD ["npm", "start"]