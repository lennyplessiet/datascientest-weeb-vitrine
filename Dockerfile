# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Étape 1 : build de l'application (Node 22, cohérent avec Vite 7 / Vercel)
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# 1. Dépendances d'abord : cette couche est réutilisée tant que le lockfile ne change pas
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# 2. Code source (node_modules, dist, .git sont exclus via .dockerignore)
COPY . .

# Vite inline les variables VITE_* DANS LE BUNDLE AU BUILD :
# elles doivent donc être fournies ici, pas au démarrage du conteneur.
ARG VITE_API_BASE_URL=http://localhost:8000
ARG VITE_SENTRY_DSN=
ARG VITE_SENTRY_ENVIRONMENT=production
ARG VITE_SENTRY_TRACES_SAMPLE_RATE=0.1

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_SENTRY_DSN=$VITE_SENTRY_DSN \
    VITE_SENTRY_ENVIRONMENT=$VITE_SENTRY_ENVIRONMENT \
    VITE_SENTRY_TRACES_SAMPLE_RATE=$VITE_SENTRY_TRACES_SAMPLE_RATE

RUN npm run build

# ---------------------------------------------------------------------------
# Étape 2 : serveur statique nginx (image finale, sans Node ni sources)
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine AS runtime

# Configuration nginx : fallback SPA, cache des assets hashés, compression, en-têtes
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Build statique uniquement (~600 Ko + assets)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Le conteneur est déclaré unhealthy si nginx ne répond plus
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
