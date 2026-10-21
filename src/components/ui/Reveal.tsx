"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  inView = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };
  const transition = { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (inView) {
    return (
      <motion.div
        className={className}
        initial={initial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div className={className} initial={initial} animate={{ opacity: 1, y: 0 }} transition={transition}>
      {children}
    </motion.div>
  );
}
