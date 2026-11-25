#!/usr/bin/env node
// generate-variations.mjs — auto-generate Remotion variations + metadata
// dari daftar niche (otomasi content batch).
//
// Usage:
//   node generate-variations.mjs [--out variations.json] [--niches Finance,Technology,Health,Travel]
//
// Setiap niche menghasilkan 1 variasi: palette gradient + caption + metadata
// Adobe Stock (title/keywords/category) yang sudah lolos validasi.

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

function arg(name, def) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : def;
}

const out = arg("--out", "variations.json");
const nichesArg = arg("--niches", "Finance,Technology,Health,Travel");
const niches = nichesArg
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const THEMES = {
  Finance: {
    from: "#0f172a",
    to: "#1e3a8a",
    accent: "#38bdf8",
    caption: "Grow your business",
    title: "Finance growth abstract motion",
    keywords: ["finance", "business", "money", "growth", "chart", "banking", "wealth"],
    category: "Business",
  },
  Technology: {
    from: "#1e1b4b",
    to: "#0ea5e9",
    accent: "#67e8f9",
    caption: "Innovate tomorrow",
    title: "Technology digital network motion",
    keywords: ["technology", "tech", "digital", "network", "data", "innovation", "software"],
    category: "Technology",
  },
  Health: {
    from: "#052e16",
    to: "#22c55e",
    accent: "#bbf7d0",
    caption: "Live well, move more",
    title: "Health wellness motion abstract",
    keywords: ["health", "fitness", "wellness", "energy", "lifestyle", "exercise"],
    category: "Lifestyle",
  },
  Travel: {
    from: "#7c2d12",
    to: "#f97316",
    accent: "#fde68a",
    caption: "Explore the world",
    title: "Travel adventure globe motion",
    keywords: ["travel", "adventure", "globe", "plane", "explore", "wanderlust"],
    category: "Travel",
  },
};

const variations = niches.map((niche) => {
  const t = THEMES[niche];
  if (!t) throw new Error(`Unknown niche: ${niche}. Available: ${Object.keys(THEMES).join(", ")}`);
  return {
    id: `niche-${niche.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-01`,
    niche,
    props: { from: t.from, to: t.to, accent: t.accent, caption: t.caption },
    metadata: {
      title: t.title,
      keywords: t.keywords,
      category: t.category,
      releases: "none",
      generative_ai: true,
    },
  };
});

writeFileSync(resolve(projectRoot, out), JSON.stringify(variations, null, 2) + "\n");
console.log(`Generated ${variations.length} variations for niches: ${niches.join(", ")}`);
console.log(`Wrote -> ${resolve(projectRoot, out)}`);
