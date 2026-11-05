import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { initMock, browserTracingIntegrationMock } = vi.hoisted(() => ({
  initMock: vi.fn(),
  browserTracingIntegrationMock: vi.fn(() => ({ name: "BrowserTracing" })),
}));

vi.mock("@sentry/react", () => ({
  init: initMock,
  browserTracingIntegration: browserTracingIntegrationMock,
}));

import { initSentry } from "./sentry";

describe("initSentry", () => {
  beforeEach(() => {
    initMock.mockClear();
    browserTracingIntegrationMock.mockClear();
    // Isole les tests de tout .env local
    vi.stubEnv("VITE_SENTRY_DSN", "");
    vi.stubEnv("VITE_SENTRY_ENVIRONMENT", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("ne fait rien quand aucun DSN n'est configuré", () => {
    expect(initSentry()).toBe(false);
    expect(initSentry("")).toBe(false);
    expect(initSentry(undefined)).toBe(false);
    expect(initMock).not.toHaveBeenCalled();
  });

  it("initialise Sentry avec le DSN fourni", () => {
    const dsn = "https://clefpublique@o123.ingest.sentry.io/456";

    expect(initSentry(dsn)).toBe(true);
    expect(initMock).toHaveBeenCalledTimes(1);

    const options = initMock.mock.calls[0][0];
    expect(options.dsn).toBe(dsn);
    expect(options.environment).toBe("test");
    expect(options.integrations).toHaveLength(1);
    expect(browserTracingIntegrationMock).toHaveBeenCalledTimes(1);
    expect(options.tracesSampleRate).toBeGreaterThanOrEqual(0);
    expect(options.tracesSampleRate).toBeLessThanOrEqual(1);
    expect(options.sendDefaultPii).toBe(false);
  });

  it("lit la variable d'environnement VITE_SENTRY_DSN par défaut", () => {
    vi.stubEnv("VITE_SENTRY_DSN", "https://env@o1.ingest.sentry.io/1");

    expect(initSentry()).toBe(true);
    expect(initMock.mock.calls[0][0].dsn).toBe("https://env@o1.ingest.sentry.io/1");
  });
});
