#!/usr/bin/env node
// gen-metadata.mjs — generate & validate Adobe Stock metadata.csv
// Usage:
//   node gen-metadata.mjs --manifest <variations.json> [--out metadata.csv]
//
// Reads a manifest (array of { id, props?, metadata{...} }) and writes a
// copy-paste-ready CSV. Enforces Adobe Stock limits and exits non-zero if any
// entry is invalid (so CI fails fast before a bad upload).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const CATEGORIES = new Set([
  "Animals", "Buildings and Architecture", "Business", "Drinks",
  "The Environment", "States of Mind", "Food", "Graphic Resources",
  "Hobbies and Leisure", "Industry", "Landscapes", "Lifestyle", "People",
  "Plants and Flowers", "Culture and Religion", "Science", "Social Issues",
  "Sports", "Technology", "Transport", "Travel",
]);

const TITLE_MAX = 70;
const KEYWORDS_MAX = 50;

function parseArgs(argv) {
  const args = { manifest: null, out: "metadata.csv" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--manifest") args.manifest = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function csvCell(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function normalizeKeywords(kw) {
  if (Array.isArray(kw)) return kw.map((k) => String(k).trim()).filter(Boolean);
  if (typeof kw === "string")
    return kw.split(",").map((k) => k.trim()).filter(Boolean);
  return [];
}

function validate(entry, errors) {
  const id = entry.id || "(no id)";
  const m = entry.metadata || {};
  const title = String(m.title ?? "").trim();
  const keywords = normalizeKeywords(m.keywords);
  const category = String(m.category ?? "").trim();
  const releases = m.releases ?? "none";
  const generative_ai = m.generative_ai;

  if (!title) errors.push(`${id}: title is empty`);
  if (title.length > TITLE_MAX)
    errors.push(`${id}: title ${title.length} chars > ${TITLE_MAX}`);
  if (keywords.length === 0) errors.push(`${id}: no keywords`);
  if (keywords.length > KEYWORDS_MAX)
    errors.push(`${id}: ${keywords.length} keywords > ${KEYWORDS_MAX}`);
  const seen = new Set();
  for (const k of keywords) {
    const lk = k.toLowerCase();
    if (seen.has(lk)) errors.push(`${id}: duplicate keyword "${k}"`);
    seen.add(lk);
  }
  if (!CATEGORIES.has(category))
    errors.push(`${id}: category "${category}" not one of 21 official categories`);
  if (typeof generative_ai !== "boolean")
    errors.push(`${id}: generative_ai must be true/false`);

  return { id, title, keywords, category, releases, generative_ai };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.manifest) {
    console.error(
      "Usage: node gen-metadata.mjs --manifest <variations.json> [--out metadata.csv]"
    );
    process.exit(args.help ? 0 : 2);
  }

  const manifestPath = resolve(args.manifest);
  let data;
  try {
    data = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (e) {
    console.error(`Failed to read/parse manifest: ${e.message}`);
    process.exit(2);
  }
  const entries = Array.isArray(data) ? data : data.variations;
  if (!Array.isArray(entries)) {
    console.error("Manifest must be an array or { variations: [...] }");
    process.exit(2);
  }

  const errors = [];
  const rows = entries.map((e) => validate(e, errors));

  if (errors.length) {
    console.error("Metadata validation FAILED:");
    for (const err of errors) console.error("  - " + err);
    process.exit(1);
  }

  const header = [
    "filename", "title", "keywords", "category", "releases", "generative_ai",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        `${r.id}.mp4`,
        r.title,
        r.keywords.join(", "),
        r.category,
        r.releases,
        r.generative_ai,
      ]
        .map(csvCell)
        .join(",")
    );
  }

  const outPath = resolve(args.out);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
  console.log(`Wrote ${rows.length} rows -> ${outPath}`);
}

main();