import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Accueil from "./Accueil";
import { expectBundledSvg } from "../test/helpers";

function renderAccueil() {
  return render(
    <MemoryRouter>
      <Accueil />
    </MemoryRouter>
  );
}

describe("Accueil", () => {
  it("affiche le titre principal", () => {
    renderAccueil();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Explorez le Web sous toutes ses facettes"
    );
  });

  it("affiche les visuels et logos partenaires depuis des assets importés", () => {
    renderAccueil();

    const alts = screen.getAllByRole("img").map((img) => img.alt);
    expect(alts).toEqual(
      expect.arrayContaining([
        "Desktop",
        "Shapes",
        "smartfinder-logo",
        "zoomerr-logo",
        "shells-logo",
        "waves-logo",
        "artvenue-logo",
      ])
    );

    for (const img of screen.getAllByRole("img")) {
      expectBundledSvg(img.getAttribute("src"));
    }
  });

  it("affiche les 5 partenaires", () => {
    renderAccueil();

    for (const name of ["SmartFinder", "Zoomerr", "Shells", "Waves", "ArtVenue"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
