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

FROM node:20-alpine AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./ 
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm","start"]
