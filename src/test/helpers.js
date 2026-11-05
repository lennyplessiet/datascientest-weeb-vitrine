import { expect } from "vitest";

/**
 * Vite peut exposer un asset de deux façons :
 *  - par son URL (/assets/weeb-<hash>.svg en build, chemin de dev servi par Vite) ;
 *  - en data URI quand le fichier est plus petit que `assetsInlineLimit`.
 * Les deux prouvent que l'image provient bien d'un import et non d'un chemin codé en dur.
 */
export function expectBundledSvg(src) {
  expect(src, "src d'image manquant").toBeTruthy();

  const isUrl = /\.svg(\?.*)?$/.test(src);
  const isInlined = src.startsWith("data:image/svg+xml");

  expect(
    isUrl || isInlined,
    `l'image ne provient pas d'un asset importé : ${String(src).slice(0, 80)}`
  ).toBe(true);
}
