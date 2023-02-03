FROM node:14-alpine as builder

WORKDIR /app
RUN chown node:node .
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build

FROM nginxinc/nginx-unprivileged as runner

WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
