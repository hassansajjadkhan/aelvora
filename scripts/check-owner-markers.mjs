#!/usr/bin/env node
/**
 * Lists every `[OWNER: supply …]` marker still live in the codebase.
 *
 * Spec rule 3: where a real fact is needed and absent, the marker stays in
 * place — it is never filled with a plausible-sounding invention. This script
 * makes the outstanding set impossible to lose track of.
 *
 *   npm run check:owner          list markers, always exit 0
 *   npm run check:owner -- --ci  exit 1 if any remain (for a release gate)
 *
 * The `--ci` form is deliberately NOT wired into `next build`: markers are a
 * legitimate shipping state right now, and a build that refuses to run would
 * block deploying the rest of the funnel over a price that hasn't been set.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP = new Set(["node_modules", ".next", ".git", "out", "dist"]);
const EXTS = /\.(tsx?|jsx?|mdx?|css)$/;

/** The literal marker text, plus the `OwnerSupply` component's `what` prop. */
const PATTERNS = [
  /\[OWNER: supply ([^\]]+)\]/g,
  /<OwnerSupply[^>]*?what=(?:"([^"]+)"|\{`([^`]+)`\})/gs,
  /kind:\s*"owner",\s*what:\s*"([^"]+)"/g,
];

/** Config constants that gate a feature while unset. */
const NULL_GATES = [
  { file: "src/lib/offer.ts", name: "OFFER_PRICE", label: "fixed price for the 21-day MVP" },
  { file: "src/lib/offer.ts", name: "OFFER_PRICE_NUMERIC", label: "numeric price for Offer schema" },
  { file: "src/lib/seo.ts", name: "CALENDLY_PARTNER_SLUG", label: "15-minute partner Calendly event type" },
];

const walk = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTS.test(entry)) out.push(full);
  }
  return out;
};

const findings = [];

for (const file of walk(join(ROOT, "src"))) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");

  for (const pattern of PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const what = match[1] ?? match[2];
      if (!what) continue;
      const line = text.slice(0, match.index).split("\n").length;
      // Skip the component's own definition and this script's examples.
      if (/OwnerSupply\.tsx$/.test(file)) continue;
      findings.push({
        file: relative(ROOT, file),
        line,
        what: what.replace(/\s+/g, " ").trim(),
        context: (lines[line - 1] ?? "").trim().slice(0, 80),
      });
    }
  }
}

// Null-gated config constants.
const gated = [];
for (const gate of NULL_GATES) {
  const text = readFileSync(join(ROOT, gate.file), "utf8");
  const re = new RegExp(`${gate.name}[^=]*=\\s*null`);
  if (re.test(text)) gated.push(gate);
}

// Unpublished case studies.
const caseStudies = readFileSync(join(ROOT, "src/lib/case-studies.ts"), "utf8");
const unpublished = [...caseStudies.matchAll(/slug:\s*"([^"]+)"/g)]
  .map((m) => m[1])
  .filter((slug) => {
    const block = caseStudies.slice(caseStudies.indexOf(`slug: "${slug}"`));
    const end = block.indexOf("},\n  {");
    return /result:\s*null/.test(end === -1 ? block : block.slice(0, end));
  });

const seen = new Set();
const unique = findings.filter((f) => {
  const key = `${f.file}:${f.line}:${f.what}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

console.log("\n  OUTSTANDING OWNER INPUT\n  " + "─".repeat(60));

if (unique.length) {
  console.log(`\n  ${unique.length} [OWNER: supply] marker(s) rendering on the site:\n`);
  for (const f of unique) {
    console.log(`    ${f.file}:${f.line}`);
    console.log(`      → ${f.what}\n`);
  }
} else {
  console.log("\n  No [OWNER: supply] markers remain.\n");
}

if (gated.length) {
  console.log(`  ${gated.length} config value(s) still null:\n`);
  for (const g of gated) console.log(`    ${g.file} → ${g.name}  (${g.label})`);
  console.log("");
}

if (unpublished.length) {
  console.log(`  ${unpublished.length} case study/studies unpublished (404, absent from sitemap):\n`);
  for (const slug of unpublished) console.log(`    /work/${slug}`);
  console.log("\n    Fill problem, constraint, built, decisions, result and");
  console.log("    clientType in src/lib/case-studies.ts to publish.\n");
}

const total = unique.length + gated.length + unpublished.length;
console.log("  " + "─".repeat(60));
console.log(`  ${total} item(s) outstanding.\n`);

if (process.argv.includes("--ci") && total > 0) process.exit(1);
