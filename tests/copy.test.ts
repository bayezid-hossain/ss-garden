import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(ts|tsx|css|php|json)$/.test(e.name) ? [p] : [];
  });
}

describe("copy rules", () => {
  it("has no em-dashes or en-dashes in source or the PHP endpoint", () => {
    const files = [...walk("src"), "public/api/enquiry.php"].filter((f) => fs.existsSync(f));
    const offenders: string[] = [];
    for (const f of files) {
      fs.readFileSync(f, "utf8").split("\n").forEach((line, i) => {
        if (/[–—]/.test(line)) offenders.push(`${f}:${i + 1}`);
      });
    }
    expect(offenders).toEqual([]);
  });
});
