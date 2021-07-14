FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent --save

COPY ./ /app

EXPOSE "5000:5000"

CMD ["npm", "run", "start:prod"]


