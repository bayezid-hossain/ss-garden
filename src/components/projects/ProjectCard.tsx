"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { statusLabel, typeLabel, type Project } from "@/data/types";

export function ProjectCard({ project: p }: { project: Project }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <Link href={`/projects/${p.slug}/`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image
            src={p.hero.src}
            alt={p.hero.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <h2 className="mt-4 text-2xl md:text-3xl">{p.name}</h2>
        <p className="mt-1 text-muted">{p.address}</p>
        <p className="mt-1 text-sm">
          <span className="font-medium text-accent">{statusLabel[p.status]}</span>
          <span className="ml-3 text-muted">{typeLabel[p.type]}</span>
        </p>
      </Link>
    </motion.div>
  );
}
