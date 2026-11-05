import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";
import { expectBundledSvg } from "../test/helpers";

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("affiche les logos à partir d'assets importés (plus de chemin /src/assets en dur)", () => {
    renderHeader();

    const logos = screen.getAllByAltText("Logo");
    expect(logos).toHaveLength(2);

    for (const logo of logos) {
      expectBundledSvg(logo.getAttribute("src"));
    }
  });

  it("expose les liens de navigation via react-router", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute("href", "/login");

    const contactLinks = screen.getAllByRole("link", { name: "Contact" });
    expect(contactLinks).toHaveLength(2);
    for (const link of contactLinks) {
      expect(link).toHaveAttribute("href", "/contact");
    }
  });

  it("ouvre puis referme le menu mobile au clic sur le burger", async () => {
    const user = userEvent.setup();
    const { container } = renderHeader();

    const burger = container.querySelector(".burger-menu");
    const panel = container.querySelector(".mobile-panel");
    expect(burger).not.toBeNull();
    expect(panel).not.toHaveClass("open");

    await user.click(burger);
    expect(panel).toHaveClass("open");

    await user.click(burger);
    expect(panel).not.toHaveClass("open");
  });
});
