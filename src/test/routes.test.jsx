import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routes } from "../routes";

function renderAt(pathname) {
  const router = createMemoryRouter(routes, { initialEntries: [pathname] });
  return render(<RouterProvider router={router} />);
}

describe("routage client", () => {
  it("affiche l'accueil sur /", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Explorez le Web");
  });

  it("affiche la page Contact sur /contact", () => {
    renderAt("/contact");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Votre avis compte");
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
  });

  it("affiche la page Login sur /login", () => {
    renderAt("/login");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Se connecter");
  });

  it("déclare bien les 3 routes attendues", () => {
    expect(routes.map((route) => route.path)).toEqual(["/", "contact", "login"]);
  });
});
