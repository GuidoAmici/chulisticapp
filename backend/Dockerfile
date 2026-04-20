FROM node:22-slim AS builder

WORKDIR /app

# Instalar dependencias necesarias para Prisma
RUN apt-get update && apt-get install -y openssl python3 make g++

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# DATABASE_URL is only needed for prisma generate (schema introspection), not a real DB
ARG DATABASE_URL=postgresql://user:password@localhost:5432/chulistic
ENV DATABASE_URL=$DATABASE_URL

RUN npm run build

# --- Stage de Producción ---
FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

# Usamos un comando que aplique las migraciones antes de arrancar
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
