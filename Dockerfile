FROM node:4

COPY package.json /app/package.json
WORKDIR /app
RUN npm install

ENV TERM xterm

CMD ["/app/node_modules/.bin/gulp"]
