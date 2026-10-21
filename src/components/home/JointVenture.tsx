"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ButtonLink } from "../ui/Button";
import type { ImageRef } from "@/data/types";
import { jvSteps as steps } from "@/data/joint-venture";

export function JointVenture({ image }: { image: ImageRef }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.2]);

  return (
    <section ref={ref} aria-labelledby="jv-title" className="relative h-[170dvh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-x-4 bottom-4 border border-line bg-bg p-5 md:inset-x-8 md:bottom-10 md:mx-auto md:max-w-[1000px] md:p-10">
          <h2 id="jv-title" className="text-2xl md:text-5xl">Own a plot in Dhaka? Build on it with us.</h2>
          <p className="mt-3 max-w-[60ch] text-base text-muted md:mt-4 md:text-lg">
            You give the land. We design, build and hand over. You receive an agreed share of the finished flats.
          </p>
          <ol className="mt-5 grid grid-cols-2 gap-4 md:mt-8 md:grid-cols-4 md:gap-6">
            {steps.map((s) => (
              <li key={s.title} className="border-t border-text pt-3 md:pt-4">
                <h3 className="text-base md:text-xl">{s.title}</h3>
                <p className="mt-1 text-xs text-muted md:text-sm">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 md:mt-8">
            <ButtonLink href="/landowners/">For landowners</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
