FROM node:8.15-jessie

# npm install
ADD package.json /tmp/package.json

RUN cd /tmp && npm install -ddd

RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# prepare app
WORKDIR /usr/src/app
COPY . .

# grant write persmission to app folder
RUN chmod -R 775 /usr/src/app

CMD ["npm", "start"]
