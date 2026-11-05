import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

/**
 * Tests « garde-fous » : ils vérifient les points qui cassaient le déploiement
 * Vercel (Linux, sensible à la casse) et la configuration d'hébergement.
 */

// Vitest est lancé depuis la racine du projet.
const PROJECT_ROOT = process.cwd();
const SRC_DIR = join(PROJECT_ROOT, "src");
const RESOLVE_EXTENSIONS = ["", ".js", ".jsx", ".css", ".svg", ".json"];

const IMPORT_RE = /(?:from\s+|import\s+)["'](\.[^"']+)["']/g;
const CSS_URL_RE = /url\(\s*["']?(\.[^"')]+)["']?\s*\)/g;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    const isTestFile = /\.test\.(jsx?|css)$/.test(entry.name);
    return /\.(jsx?|css)$/.test(entry.name) && !isTestFile ? [full] : [];
  });
}

/** Vérifie que la casse de chaque segment correspond exactement au disque (comme Linux). */
function hasExactCase(absolutePath) {
  const parts = relative(PROJECT_ROOT, absolutePath).split(sep);
  let current = PROJECT_ROOT;
  for (const part of parts) {
    let entries;
    try {
      entries = readdirSync(current);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    current = join(current, part);
  }
  return true;
}

function resolveRelative(specifier, fromFile) {
  const base = resolve(dirname(fromFile), specifier);
  for (const extension of RESOLVE_EXTENSIONS) {
    const candidate = base + extension;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const sourceFiles = walk(SRC_DIR);

describe("imports", () => {
  it("résout chaque import relatif avec la casse exacte (Linux/Vercel)", () => {
    const failures = [];

    for (const file of sourceFiles) {
      const content = readFileSync(file, "utf8");
      const isCss = file.endsWith(".css");
      const specifiers = [
        ...[...content.matchAll(IMPORT_RE)].map((match) => match[1]),
        ...(isCss ? [...content.matchAll(CSS_URL_RE)].map((match) => match[1]) : []),
      ];

      for (const specifier of specifiers) {
        const display = `${relative(PROJECT_ROOT, file)} → "${specifier}"`;
        const resolved = resolveRelative(specifier, file);

        if (!resolved) {
          failures.push(`${display} : fichier introuvable`);
        } else if (!hasExactCase(resolved)) {
          failures.push(`${display} : casse incorrecte (casse Linux/Vercel)`);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});

describe("assets", () => {
  it("n'utilise plus de chemin /src/assets en dur (images cassées après build)", () => {
    // Construit sans écrire le motif littéral, pour que ce fichier ne se détecte pas lui-même.
    const legacyPrefix = ["", "src", "assets"].join("/");
    const offenders = sourceFiles.filter((file) =>
      readFileSync(file, "utf8").includes(legacyPrefix)
    );

    expect(offenders.map((file) => relative(PROJECT_ROOT, file))).toEqual([]);
  });
});

describe("configuration Vercel", () => {
  it("vercel.json déclare le fallback SPA vers index.html", () => {
    const config = JSON.parse(readFileSync(join(PROJECT_ROOT, "vercel.json"), "utf8"));
    expect(config.rewrites).toContainEqual({
      source: "/(.*)",
      destination: "/index.html",
    });
  });

  it("package.json fixe une version de Node compatible avec Vite 7 et expose npm test", () => {
    const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, "package.json"), "utf8"));

    expect(pkg.engines?.node).toBeTruthy();
    // Vite 7 exige Node ^20.19.0 || >=22.12.0
    expect(pkg.engines.node).toMatch(/20\.19|22/);
    expect(pkg.scripts.build).toBe("vite build");
    expect(pkg.scripts.test).toBeTruthy();
  });
});
