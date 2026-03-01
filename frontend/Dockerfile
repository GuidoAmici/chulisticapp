FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Las variables de entorno en Next.js se inyectan en tiempo de build
# Necesitarás pasar estas variables durante el build de Docker
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

# --- Stage de Producción ---
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
