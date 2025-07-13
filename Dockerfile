# Étape 1 : build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : run avec Next.js standalone output
FROM node:18-alpine

WORKDIR /app

# Copie uniquement les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
