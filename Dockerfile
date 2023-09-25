FROM oven/bun

WORKDIR /app

ADD package*.json bun.lockb ./
RUN bun install
RUN mkdir ./output
RUN cd ./output && touch index.js
ADD index.ts ./index.ts
ADD src/ ./src/
ADD bun.lockb bun.lockb

CMD [ "bun", "run", "start" ]