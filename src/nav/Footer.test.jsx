import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Footer from "./Footer";
import { expectBundledSvg } from "../test/helpers";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe("Footer", () => {
  it("affiche le logo depuis un asset importé", () => {
    renderFooter();

    const src = screen.getByAltText("Weeb").getAttribute("src");
    expect(src).toBeTruthy();
    expect(src).toMatch(/weeb-black(-[\w-]+)?\.svg$|^data:image\/svg\+xml/);
  });

  it("rend les 5 icônes de réseaux sociaux", () => {
    renderFooter();

    const icons = ["YouTube", "Facebook", "Twitter", "Instagram", "LinkedIn"];
    for (const alt of icons) {
      expectBundledSvg(screen.getByAltText(alt).getAttribute("src"));
    }
  });

  it("pointe vers les réseaux sociaux externes", () => {
    renderFooter();

    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"))
      .filter((href) => href && href.startsWith("http"));

    expect(hrefs).toHaveLength(5);
    expect(hrefs.some((href) => href.includes("youtube.com"))).toBe(true);
    expect(hrefs.some((href) => href.includes("linkedin.com"))).toBe(true);
  });

  it("le logo renvoie vers l'accueil", () => {
    renderFooter();

    const homeLink = screen.getByAltText("Weeb").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
