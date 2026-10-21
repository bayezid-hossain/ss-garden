"use client";

import { useEffect, useState } from "react";
import TowerScene, { type TowerSceneProps } from "@/components/three/TowerScene";

type Params = Pick<TowerSceneProps, "floors" | "seed" | "sky" | "az" | "el" | "dist">;

declare global {
  interface Window {
    __towerReady?: boolean;
  }
}

export default function DevTower() {
  const [p, setP] = useState<Params | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setP({
      floors: Number(q.get("floors") ?? 12),
      seed: Number(q.get("seed") ?? 1),
      sky: q.get("sky") === "dusk" ? "dusk" : "day",
      az: Number(q.get("az") ?? 28),
      el: Number(q.get("el") ?? 12),
      dist: Number(q.get("dist") ?? 13),
    });
  }, []);

  if (!p) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <TowerScene {...p} dpr={[1, 1]} onReady={() => { window.__towerReady = true; }} />
    </div>
  );
}
