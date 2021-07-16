FROM node:alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent --save

COPY ./ /app

EXPOSE 3001:3000

CMD ["npm", "run", "start"]

