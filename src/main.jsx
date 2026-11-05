import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";

import { routes } from "./routes";
import { initSentry } from "./lib/sentry";

import "./index.css"

// À appeler avant le premier rendu pour capter les erreurs de démarrage.
// Sans VITE_SENTRY_DSN, cette fonction ne fait rien.
initSentry();

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root"), {
  // Sentry récupère aussi les erreurs React 19 (rendu, effets, hydratation).
  onCaughtError: Sentry.reactErrorHandler(),
  onUncaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => (
        <div className="error-fallback">
          <h1>Une erreur inattendue est survenue</h1>
          <p>Le problème a été enregistré. Vous pouvez réessayer.</p>
          <button onClick={resetError}>Réessayer</button>
        </div>
      )}
    >
      <RouterProvider router={router} />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
