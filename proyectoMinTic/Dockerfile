FROM node:16

WORKDIR /front-investigacion

COPY package*.json ./

RUN npm i

COPY . ./

CMD [ "npm", "start" ]