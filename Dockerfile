# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS deps
WORKDIR /app

# нужно, чтобы Prisma нормально определила openssl
RUN apt-get update -y && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# (не обязательно, но не повредит)
RUN apt-get update -y && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
