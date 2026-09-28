FROM node:22.14-slim

WORKDIR /app
COPY . .

RUN ["npm", "install"]
EXPOSE 4000

CMD ["npm", "start"]