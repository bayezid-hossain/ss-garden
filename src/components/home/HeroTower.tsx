"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { scroll } from "motion";
import type { ImageRef } from "@/data/types";

const TowerScene = dynamic(() => import("../three/TowerScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroTower({ still }: { still: ImageRef }) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    setEnabled(!reduce && hasWebGL());
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!enabled || !el) return;

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);

    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      pointer.current.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = ((ev.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const stop = scroll(
      (progress: number) => {
        scrollProgress.current = progress;
      },
      { target: el, offset: ["start start", "end start"] },
    );

    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      stop();
    };
  }, [enabled]);

  return (
    <div ref={wrap} className="relative h-full w-full overflow-hidden bg-surface">
      <Image
        src={still.src}
        alt={still.alt}
        width={still.width}
        height={still.height}
        priority
        className="absolute inset-0 h-full w-full object-cover"
      />
      {enabled && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <TowerScene
            floors={14}
            seed={11}
            sky="day"
            az={28}
            el={14}
            dist={13}
            quality={coarse ? "low" : "high"}
            dpr={coarse ? [1, 1.25] : [1, 1.75]}
            frameloop={visible ? "always" : "never"}
            float
            pointer={pointer}
            scroll={scrollProgress}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
