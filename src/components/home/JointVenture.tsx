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
    <section ref={ref} aria-labelledby="jv-title" className="relative md:h-[170dvh]">
      <div className="md:sticky md:top-0 md:h-[100dvh] md:overflow-hidden">
        <motion.div style={{ scale }} className="relative h-[50dvh] md:absolute md:inset-0 md:h-full">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="border-y border-line bg-bg p-6 md:absolute md:bottom-10 md:left-8 md:right-8 md:mx-auto md:max-w-[1000px] md:border md:p-10">
          <h2 id="jv-title" className="text-3xl md:text-5xl">Own a plot in Dhaka? Build on it with us.</h2>
          <p className="mt-4 max-w-[60ch] text-lg text-muted">
            You give the land. We design, build and hand over. You receive an agreed share of the finished flats.
          </p>
          <ol className="mt-8 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.title} className="border-t border-text pt-4">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <ButtonLink href="/landowners/">For landowners</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
