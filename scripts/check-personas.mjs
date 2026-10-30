import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "kits/audit-fix/personas";
const requiredSections = [
  "## Hồ sơ",
  "## Nhiệm vụ",
  "## Bug triggers",
  "## Bug vs preference",
  "## Bằng chứng",
  "## Output"
];
const failures = [];

if (!existsSync(join(dir, "index.md"))) failures.push("missing personas/index.md");
const files = readdirSync(dir).filter((f) => /^P\d{2}-.*\.md$/.test(f)).sort();
if (files.length !== 10) failures.push(`expected 10 persona cards, found ${files.length}`);

const lenses = new Set();
const ids = new Set();
for (const file of files) {
  const text = readFileSync(join(dir, file), "utf8");
  const id = file.slice(0, 3);
  if (ids.has(id)) failures.push(`duplicate persona id ${id}`);
  ids.add(id);
  const lens = text.match(/\*\*Lens:\*\*\s*A(\d+)/);
  if (!lens) failures.push(`${file}: missing Lens A1-A10`);
  else if (lenses.has(lens[1])) failures.push(`${file}: duplicate lens A${lens[1]}`);
  else lenses.add(lens[1]);
  for (const section of requiredSections) {
    if (!text.includes(section)) failures.push(`${file}: missing ${section}`);
  }
}

for (const lens of ["1","2","3","4","5","6","7","8","9","10"]) {
  if (!lenses.has(lens)) failures.push(`missing lens A${lens}`);
}

if (failures.length) {
  console.log(`FAIL (${failures.length})`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS — 10 persona cards, lenses A1-A10 unique, required sections present.");
}
