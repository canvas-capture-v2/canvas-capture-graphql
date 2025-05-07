FROM node:22.14-slim

WORKDIR /var/app/
COPY . /var/app/

RUN ["npm", "install"]
RUN ["npx", "prisma", "generate", ".app/generated/prisma"]
EXPOSE 4000

CMD ["npx", "ts-node", "app.ts"]