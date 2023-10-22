From ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN npm install -g nodemon

COPY package.json  package.json
COPY package-lock.json package-lock.json
COPY dist/app.js dist/app.js
COPY dist/server.js dist/server.js

RUN npm install
ENTRYPOINT [ "nodemon", "dist/server.js" ]