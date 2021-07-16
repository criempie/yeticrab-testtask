FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent --save

COPY ./ /app

EXPOSE 5001:5000

CMD ["npm", "run", "start:prod"]


