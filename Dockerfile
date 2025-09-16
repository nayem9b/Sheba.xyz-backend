FROM node:24-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm i nodemon -g
RUN npm i yarn
EXPOSE 5000
CMD ["yarn", "run", "dev"]