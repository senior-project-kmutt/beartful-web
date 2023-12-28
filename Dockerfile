FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.25.3-alpine3.18 as production-stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html/build
COPY --from=build /usr/src/app/next.config.js /usr/share/nginx/html
COPY --from=build /usr/src/app/public /usr/share/nginx/html/public
COPY --from=build /usr/src/app/node_modules /usr/share/nginx/node_modules
COPY --from=build /usr/src/app/package.json /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
