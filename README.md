# Weeb — front (React + Vite)

Site vitrine / blog « Weeb » : accueil, contact, connexion.

Stack : React 19, React Router 7, Vite 7, Sentry (surveillance des erreurs), Vitest + Testing Library.

## Démarrer

```bash
npm install
npm run dev
```

Prérequis : **Node ≥ 20.19** (Vite 7). Node 22 LTS conseillé.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build localement (avec fallback SPA) |
| `npm run lint` | ESLint |
| `npm test` | Tests unitaires (exécution unique) |
| `npm run test:watch` | Tests en mode watch |

## Tests

Vitest + @testing-library/react, environnement `jsdom`, setup dans `src/test/setup.js`.

Couverture :

- `src/nav/Header.test.jsx`, `src/nav/Footer.test.jsx` : rendu, assets, navigation, menu mobile ;
- `src/pages/Accueil.test.jsx` : contenu et images ;
- `src/test/routes.test.jsx` : les 8 routes (`/`, `/contact`, `/blog`, `/blog/:id`, `/blog/ajouter`, `/password-reset`, `/login`, `/signup`) via `createMemoryRouter` ;
- `src/api.test.js` : construction des URLs du back-end (slash final, chemin sans slash) ;
- `src/lib/sentry.test.js` : Sentry désactivé sans DSN, configuration sinon ;
- `src/test/imports.test.js` : **garde-fous de déploiement** — casse exacte des imports (Linux/Vercel), absence de chemins d'assets en dur, `vercel.json`, version de Node.

## Déploiement Vercel

1. Importer le dépôt GitHub. Vercel détecte Vite : build `npm run build`, output `dist`, root = racine du dépôt.
2. `vercel.json` contient le fallback SPA (obligatoire pour `/contact` et `/login` en accès direct) :

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

3. Variables d'environnement (Project → Settings → Environment Variables) :

   | Variable | Obligatoire | Valeur |
   | --- | --- | --- |
   | `VITE_API_BASE_URL` | **oui** (dès que le back est en ligne) | URL du back **sans slash final**, ex. `https://weeb-backend-plessiet-zeroual.onrender.com` |
   | `VITE_SENTRY_DSN` | non | DSN du projet Sentry |

   Sans `VITE_API_BASE_URL`, `src/api.js` retombe sur `http://localhost:8000` : tous les appels (blog, auth, contact) échouent en production. Les slashs finaux sont retirés automatiquement par `buildApiUrl`.

4. Back-end (Django/DRF) : autoriser l'origine Vercel en CORS, **avec credentials** (le refresh token est un cookie httpOnly envoyé via `credentials: "include"`) :

   ```python
   CORS_ALLOWED_ORIGINS = ["https://datascientest-weeb-vitrine.vercel.app"]
   CORS_ALLOW_CREDENTIALS = True
   CSRF_TRUSTED_ORIGINS = ["https://datascientest-weeb-vitrine.vercel.app"]
   # Previews Vercel (URLs du type ...-git-main-...vercel.app)
   CORS_ALLOWED_ORIGIN_REGEXES = [r"^https://datascientest-weeb-vitrine-.*\.vercel\.app$"]
   ```

   `django-cors-headers` doit être dans `INSTALLED_APPS` et `CorsMiddleware` placé **avant** `CommonMiddleware`. Front et back étant sur deux domaines différents, le cookie de refresh doit être émis en `SameSite=None; Secure` (sinon le navigateur ne l'envoie pas).

## Docker (image Docker Hub)

Image en deux étapes : `node:22-alpine` compile l'application, puis `nginx:1.27-alpine` sert le `dist/` (config [docker/nginx.conf](docker/nginx.conf) : fallback SPA, cache des assets hashés, compression, en-têtes de sécurité). Aucun Node ni `node_modules` dans l'image finale.

```bash
# Construction locale (Docker Desktop requis)
docker build \
  --build-arg VITE_API_BASE_URL=https://weeb-backend-plessiet-zeroual.onrender.com \
  -t <ton-user-dockerhub>/datascientest-weeb-vitrine:latest .

# Lancement
docker run --rm -p 8080:80 <ton-user-dockerhub>/datascientest-weeb-vitrine:latest
# -> http://localhost:8080
```

Publication manuelle :

```bash
docker login
docker push <ton-user-dockerhub>/datascientest-weeb-vitrine:latest
```

### Publication automatique à chaque modification GitHub

Le job `docker` de [.github/workflows/ci.yml](.github/workflows/ci.yml) construit et pousse l'image **après** que le lint, les tests et le build sont passés, à chaque push sur `main` (et sur un tag `v*`). L'option « Automated builds » de Docker Hub (liaison directe à un dépôt Git) n'est pas disponible sur les offres gratuites : ce workflow la remplace et a l'avantage de ne publier que du code vert.

À configurer une fois, dans GitHub → Settings → Secrets and variables → Actions :

| Type | Nom | Valeur |
| --- | --- | --- |
| Secret | `DOCKERHUB_USERNAME` | identifiant Docker Hub |
| Secret | `DOCKERHUB_TOKEN` | token d'accès **Read & Write** (Docker Hub → Account settings → Security → New access token) |
| Variable | `VITE_API_BASE_URL` | URL du back, sans slash final |
| Variable | `VITE_SENTRY_DSN` | (optionnel) DSN Sentry |

Les `VITE_*` sont des valeurs **publiques** (inlinées dans le bundle du navigateur) → à mettre en *variables*, pas en secrets. Tags produits : `latest` (branche `main`), nom de branche, `sha-xxxxxxx`, et `1.2.3` pour un tag `v1.2.3`.

⚠️ Vite fige les `VITE_*` **au moment du `docker build`** : changer de back-end impose de reconstruire l'image. C'est une contrainte de Vite, pas de Docker (une config lue à l'exécution serait nécessaire pour rendre l'image portable).

## Sentry

`src/lib/sentry.js` initialise Sentry **seulement si** `VITE_SENTRY_DSN` est défini : sans DSN, le site fonctionne normalement (aucun envoi).

- `src/main.jsx` branche `Sentry.reactErrorHandler()` sur les erreurs React 19 et entoure l'application d'un `Sentry.ErrorBoundary` (écran de secours stylé en CSS).
- Le DSN est public par conception (embarqué côté client) : il se configure dans Vercel → Project → Settings → Environment Variables, puis redéploiement.
- Upload des source maps (pile d'appels lisible) : non installé. Ajouter `@sentry/vite-plugin` + `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` si besoin.

## Assets

Toutes les images sont **importées** depuis `src/assets` (Vite les hashe et les copie dans `dist/assets`) :

```jsx
import weebLogo from "../assets/weeb.svg";
<img src={weebLogo} alt="Logo" />
```

Ne jamais écrire `/src/assets/...` en dur : ce dossier n'existe pas dans le build (images cassées). En CSS, utiliser des chemins relatifs (`url("./assets/…")`).
