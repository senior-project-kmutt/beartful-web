# FROM node:20-alpine as build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build


# FROM nginx:1.25.3-alpine3.18 as production-stage
# COPY --from=build /usr/src/app/build /usr/share/nginx/html/build
# COPY --from=build /usr/src/app/next.config.js /usr/share/nginx/html
# COPY --from=build /usr/src/app/public /usr/share/nginx/html/public
# COPY --from=build /usr/src/app/node_modules /usr/share/nginx/node_modules
# COPY --from=build /usr/src/app/package.json /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:20-alpine as build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:1.25.3-alpine3.18 as production-stage
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# COPY --from=build /usr/src/app/public /usr/share/nginx/html/public

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm i

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]