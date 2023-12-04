FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.3-alpine3.18 as production-stage
COPY --from=build ./next.config.js /usr/share/nginx/html
EXPOSE 3000
CMD ["npm", "start"]