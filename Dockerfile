FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# FROM nginx:1.25.3-alpine3.18 as production-stage
# COPY --from=build /usr/src/app/.next /usr/share/nginx/html
FROM node:20.4.0 AS server
WORKDIR /app
COPY --from=build /usr/src/app/next.config.js ./
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]