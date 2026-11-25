#!/usr/bin/env node
// batch.mjs — render every variation in variations.json to out/<id>.mp4
// Runs in CI (GitHub Actions). The phone cannot render (no headless Chrome).
//
// Usage: node render/batch.mjs [--concurrency N] [--dry-run]

import { readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

function arg(name, def) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : def;
}

const dryRun = process.argv.includes("--dry-run");
const concurrency = arg("--concurrency", "2");
const outDir = resolve(projectRoot, "out");
const entry = resolve(projectRoot, "src/index.ts");

const variations = JSON.parse(
  readFileSync(resolve(projectRoot, "variations.json"), "utf8")
);

mkdirSync(outDir, { recursive: true });

let failed = 0;
for (const v of variations) {
  const out = resolve(outDir, `${v.id}.mp4`);
  const props = JSON.stringify(v.props || {});
  const cmd = [
    "render",
    entry,
    "StockScene",
    out,
    `--props=${props}`,
    `--concurrency=${concurrency}`,
  ];
  console.log(`\n=== Rendering ${v.id} -> ${out}`);
  if (dryRun) {
    console.log("  [dry-run] npx remotion " + cmd.join(" "));
    continue;
  }
  const r = spawnSync("npx", ["remotion", ...cmd], {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });
  if (r.status !== 0) {
    console.error(`  FAILED ${v.id} (exit ${r.status})`);
    failed++;
  }
}

if (failed) {
  console.error(`\n${failed} clip(s) failed to render.`);
  process.exit(1);
}
console.log(`\nAll ${variations.length} clips rendered to ${outDir}`);