FROM node:18-bullseye

ENV ROOT=/usr/client/src
WORKDIR ${ROOT}

COPY ["./client/package*.json", "${ROOT}"]
RUN npm install
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
