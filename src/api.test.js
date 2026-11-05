import { describe, expect, it } from "vitest";

import { apiUrl, buildApiUrl } from "./api.js";

describe("buildApiUrl", () => {
  it("supprime le slash final du back-end (pas de double slash)", () => {
    expect(buildApiUrl("https://weeb-backend.onrender.com/", "/api/users/signup/")).toBe(
      "https://weeb-backend.onrender.com/api/users/signup/"
    );
  });

  it("supporte plusieurs slashs finaux", () => {
    expect(buildApiUrl("https://weeb-backend.onrender.com///", "/api/users/token/")).toBe(
      "https://weeb-backend.onrender.com/api/users/token/"
    );
  });

  it("ajoute le slash manquant au chemin", () => {
    expect(buildApiUrl("https://backend.example.com", "api/users/signup/")).toBe(
      "https://backend.example.com/api/users/signup/"
    );
  });

  it("conserve un back-end sans slash final", () => {
    expect(buildApiUrl("https://backend.example.com", "/article/3/")).toBe(
      "https://backend.example.com/article/3/"
    );
  });
});

describe("apiUrl", () => {
  it("construit une URL absolue sans double slash", () => {
    const url = apiUrl("/api/users/signup/");

    expect(url).toMatch(/^https?:\/\/[^\s]+$/);
    expect(url).not.toMatch(/\/\/api/);
    expect(url.endsWith("/api/users/signup/")).toBe(true);
  });
});
