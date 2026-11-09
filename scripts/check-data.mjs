// Checks src/data/councils.yaml and src/content/bins before every build.
// Run on its own with: npm run check-data
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const today = process.env.GOVBINS_TODAY || new Date().toISOString().slice(0, 10);
const errors = [];
const fail = (msg) => errors.push(msg);
const iso = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);

const councils = YAML.parse(fs.readFileSync("src/data/councils.yaml", "utf8"));
const byId = new Map();
for (const c of councils) {
  if (byId.has(c.id)) fail(`Two councils with id "${c.id}"`);
  byId.set(c.id, c);
  c.start = iso(c.start);
  c.end = iso(c.end);
}

const status = (c) => (c.start && c.start > today ? "upcoming" : c.end && c.end < today ? "abolished" : "current");
const gss = new Map();

for (const c of councils) {
  for (const s of c.successors ?? []) if (!byId.has(s)) fail(`${c.id}: successor "${s}" isn't a council`);
  if (c.county && byId.get(c.county)?.type !== "county") fail(`${c.id}: county "${c.county}" isn't a county council`);
  if (c.start && c.end && c.end < c.start) fail(`${c.id}: ends before it starts`);
  if (c.successors?.length && !c.end) fail(`${c.id}: has successors but no end date`);
  if (c.end && c.successors?.length) {
    for (const s of c.successors) {
      const sc = byId.get(s);
      if (sc?.start && !c.renamed) {
        const dayAfter = new Date(`${c.end}T00:00:00Z`);
        dayAfter.setUTCDate(dayAfter.getUTCDate() + 1);
        if (dayAfter.toISOString().slice(0, 10) !== sc.start)
          fail(`${c.id}: ends ${c.end} but successor ${s} starts ${sc.start}`);
      }
    }
  }
  if (c.gss && status(c) === "current") {
    if (gss.has(c.gss)) fail(`${c.id} and ${gss.get(c.gss)} share GSS code ${c.gss}`);
    gss.set(c.gss, c.id);
  }
}

// Bins
const dir = "src/content/bins";
let binCount = 0;
const hasBin = new Set();
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".yaml"))) {
  binCount++;
  const b = YAML.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const ids = Array.isArray(b.council) ? b.council : [b.council];
  for (const id of ids) {
    if (!byId.has(id)) fail(`${f}: council "${id}" isn't in councils.yaml`);
    if (!b.old_design) hasBin.add(id);
  }
  if (!b.image || !fs.existsSync(path.resolve(dir, b.image))) fail(`${f}: image ${b.image} not found`);
}

// Summary: today's councils that collect bins, by nation
const collectors = councils.filter((c) => status(c) === "current" && c.type !== "county");
const nations = {};
for (const c of collectors) nations[c.nation] = (nations[c.nation] ?? 0) + 1;
const upcoming = councils.filter((c) => status(c) === "upcoming").map((c) => `${c.name} (${c.start})`);

console.log(`govbins data for ${today}`);
console.log(`  ${councils.length} councils on file, ${collectors.length} collect bins today:`, nations);
console.log(`  ${binCount} bins, ${collectors.filter((c) => hasBin.has(c.id)).length} of today's councils catalogued`);
if (upcoming.length) console.log(`  coming up: ${upcoming.join(", ")}`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n  ` + errors.join("\n  "));
  process.exit(1);
}
