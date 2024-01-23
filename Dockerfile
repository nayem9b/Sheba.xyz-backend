FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
EXPOSE 5000
CMD ["node", "dist/server.js"]

# added cluster