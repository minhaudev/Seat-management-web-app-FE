# Base stage for dependencies
FROM node:20 AS deps
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage
FROM node:20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Runtime stage
FROM node:20 AS runtime
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
RUN yarn install --production --frozen-lockfile
EXPOSE 3000
CMD ["yarn", "start"]
