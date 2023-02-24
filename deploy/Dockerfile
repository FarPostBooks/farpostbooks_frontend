FROM node:19-alpine

WORKDIR '/build-app'

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm i -g pnpm
RUN pnpm install 

COPY . .

RUN pnpm build

CMD ["pnpm", "preview"]

