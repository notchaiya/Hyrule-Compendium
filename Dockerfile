FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


FROM node:22-alpine AS backend-dependencies

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev


FROM node:22-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=backend-dependencies /app/node_modules ./node_modules
COPY backend/package.json ./package.json
COPY backend/src ./src
COPY backend/db ./db
COPY backend/data ./data
COPY --from=frontend-build /app/frontend/dist ./public

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then((response) => { if (!response.ok) process.exit(1) }).catch(() => process.exit(1))"

CMD ["node", "src/server.js"]
