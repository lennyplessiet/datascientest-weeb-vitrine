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
- `src/test/routes.test.jsx` : les 3 routes (`/`, `/contact`, `/login`) via `createMemoryRouter` ;
- `src/lib/sentry.test.js` : Sentry désactivé sans DSN, configuration sinon ;
- `src/test/imports.test.js` : **garde-fous de déploiement** — casse exacte des imports (Linux/Vercel), absence de chemins d'assets en dur, `vercel.json`, version de Node.

## Déploiement Vercel

1. Importer le dépôt GitHub. Vercel détecte Vite : build `npm run build`, output `dist`, root = racine du dépôt.
2. `vercel.json` contient le fallback SPA (obligatoire pour `/contact` et `/login` en accès direct) :

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

3. Variables d'environnement (facultatives) : voir `.env.example` — au minimum `VITE_SENTRY_DSN`.

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
