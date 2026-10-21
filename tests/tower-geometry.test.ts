import { describe, it, expect } from "vitest";
import { buildTower, mulberry32, TOWER } from "../src/components/three/tower-geometry";

describe("mulberry32", () => {
  it("is deterministic and within [0, 1)", () => {
    const a = mulberry32(5);
    const b = mulberry32(5);
    for (let i = 0; i < 20; i++) {
      const v = a();
      expect(v).toBe(b());
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("buildTower", () => {
  it("makes one slab per floor plus the roof", () => {
    expect(buildTower(10, 1).slabs).toHaveLength(11);
  });
  it("makes one glass volume per floor", () => {
    expect(buildTower(10, 1).glass).toHaveLength(10);
  });
  it("sets height from floor count", () => {
    expect(buildTower(10, 1).height).toBeCloseTo(10 * TOWER.FH);
  });
  it("is deterministic for a seed and differs across seeds", () => {
    expect(buildTower(8, 3)).toEqual(buildTower(8, 3));
    expect(buildTower(8, 3).foliage).not.toEqual(buildTower(8, 4).foliage);
  });
  it("plants trees on the terraces", () => {
    const g = buildTower(12, 2);
    expect(g.foliage.length).toBeGreaterThan(40);
    expect(g.trunks.length).toBe(g.foliage.length);
    for (const f of g.foliage) {
      expect(f.tone).toBeGreaterThanOrEqual(0);
      expect(f.tone).toBeLessThanOrEqual(3);
    }
  });
  it("keeps every slab inside a sensible footprint", () => {
    for (const s of buildTower(6, 9).slabs) {
      expect(s.s[0]).toBeLessThan(TOWER.W + 1);
      expect(s.s[2]).toBeLessThan(TOWER.D + 1);
    }
  });
});
