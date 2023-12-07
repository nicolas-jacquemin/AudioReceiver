FROM node:20 as Builder

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:20

COPY --from=Builder package.json .
COPY --from=Builder node_modules ./node_modules
COPY --from=Builder dist ./dist

RUN mkdir ./.cache

ENTRYPOINT [ "npm", "run", "start:prod-docker" ]