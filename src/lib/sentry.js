import * as Sentry from "@sentry/react";

/**
 * Initialise Sentry si un DSN est fourni (variable d'environnement VITE_SENTRY_DSN).
 * Sans DSN, l'application démarre normalement : la surveillance est simplement
 * désactivée (utile en local, en test et en preview).
 *
 * @param {string} [dsn] DSN Sentry (par défaut : import.meta.env.VITE_SENTRY_DSN)
 * @returns {boolean} true si Sentry a été initialisé
 */
export function initSentry(dsn = import.meta.env.VITE_SENTRY_DSN) {
  if (!dsn) {
    return false;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE,
    release: import.meta.env.VITE_SENTRY_RELEASE || undefined,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.1),
    // Pas de données personnelles envoyées par défaut (RGPD)
    sendDefaultPii: false,
  });

  return true;
}
