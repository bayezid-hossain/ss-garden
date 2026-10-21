export type Vec3 = [number, number, number];
export interface Box { p: Vec3; s: Vec3 }
export interface Foliage { p: Vec3; r: number; tone: number }
export interface TowerGeometry {
  base: Box[];
  slabs: Box[];
  glass: Box[];
  columns: Box[];
  planters: Box[];
  trunks: Box[];
  foliage: Foliage[];
  height: number;
}

export const TOWER = { W: 4.2, D: 2.8, FH: 0.52, T: 0.1 } as const;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildTower(floors: number, seed: number): TowerGeometry {
  const { W, D, FH, T } = TOWER;
  const rng = mulberry32(seed);
  const g: TowerGeometry = {
    base: [], slabs: [], glass: [], columns: [], planters: [], trunks: [], foliage: [],
    height: floors * FH,
  };

  const tree = (x: number, y: number, z: number, scale: number) => {
    const trunkH = 0.22 * scale;
    g.trunks.push({ p: [x, y + trunkH / 2, z], s: [0.04 * scale, trunkH, 0.04 * scale] });
    const crown = 0.13 * scale + rng() * 0.05 * scale;
    g.foliage.push({ p: [x, y + trunkH + crown * 0.8, z], r: crown, tone: Math.floor(rng() * 4) });
  };

  g.base.push({ p: [0, -0.3, 0], s: [W + 3, 0.6, D + 3] });

  for (let i = 0; i < floors; i++) {
    const y = i * FH;
    const ext = i % 3 === 0 ? 0.45 : 0;
    g.slabs.push({ p: [0, y, ext / 2], s: [W, T, D + ext] });
    g.glass.push({ p: [0, y + FH / 2, 0], s: [W - 0.12, FH - T, D - 0.12] });
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        g.columns.push({ p: [sx * (W / 2 - 0.08), y + FH / 2, sz * (D / 2 - 0.08)], s: [0.14, FH, 0.14] });
      }
    }
    if (ext > 0 || i % 2 === 0) {
      const z = D / 2 + ext - 0.12;
      const len = W * 0.92;
      g.planters.push({ p: [0, y + T / 2 + 0.08, z], s: [len, 0.16, 0.22] });
      const n = Math.floor(len / 0.5);
      for (let k = 0; k < n; k++) {
        const x = -len / 2 + (k + 0.5) * (len / n) + (rng() - 0.5) * 0.1;
        tree(x, y + T / 2 + 0.16, z, 0.8 + rng() * 0.6);
      }
    }
    if (i % 2 === 1) {
      const x = W / 2 - 0.1;
      g.planters.push({ p: [x, y + T / 2 + 0.08, 0], s: [0.22, 0.16, D * 0.8], });
      for (let k = 0; k < 3; k++) tree(x, y + T / 2 + 0.16, -D * 0.3 + k * D * 0.3, 0.8 + rng() * 0.5);
    }
  }

  const roofY = floors * FH;
  g.slabs.push({ p: [0, roofY, 0], s: [W + 0.3, T, D + 0.3] });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      g.columns.push({ p: [sx * (W / 2 - 0.3), roofY + 0.3, sz * (D / 2 - 0.3)], s: [0.08, 0.6, 0.08] });
    }
  }
  for (const sz of [-1, 1]) {
    g.columns.push({ p: [0, roofY + 0.62, sz * (D / 2 - 0.3)], s: [W - 0.6, 0.06, 0.08] });
  }
  for (let k = 0; k < 5; k++) {
    tree((rng() - 0.5) * (W - 0.8), roofY + T / 2, (rng() - 0.5) * (D - 0.8), 1.3);
  }

  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2 + rng() * 0.2;
    tree(Math.cos(a) * (W / 2 + 2.2), 0, Math.sin(a) * (D / 2 + 2.2), 1.6 + rng());
  }

  return g;
}
