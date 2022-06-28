#######################################
# Build stage
#######################################
FROM node:16.15 as builder

WORKDIR /app

# ENV SSR=TRUE PRODUCTION=TRUE VITE_SITE_MODE=production
# ENV VITE_PUBLIC_BACKEND_INTERNAL_URL=http://host.docker.internal:3456/api

# install theme (cache first)
COPY deps/theme ./deps/theme
RUN (cd deps/theme && npm ci && npx gulp build:dist)

# install trade-executor-frontend (cache second)
COPY deps/trade-executor-frontend ./deps/trade-executor-frontend
RUN (cd deps/trade-executor-frontend && npm ci)

# install npm dependencies (cache third)
COPY package*.json ./
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh npm ci

# copy remaining files
COPY . .

# build app
RUN npm run build

#######################################
# Serve stage
#######################################
FROM node:16.15-slim

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/scripts/server.js ./scripts/

EXPOSE 3000

CMD ["node", "scripts/server.js"]