"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown, X } from "@phosphor-icons/react";
import { menu } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open, onClose]);

  const dur = reduce ? 0 : 0.3;
  const itemClass = "block py-3 font-display text-2xl text-text transition hover:text-accent";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-scrim/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-[88vw] max-w-[420px] flex-col overflow-y-auto border-l border-line bg-bg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-6">
              <ThemeToggle />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-line transition hover:border-text focus-visible:outline-2 focus-visible:outline-accent"
              >
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Mobile" className="px-6 pb-10 pt-4">
              <ul>
                {menu.map((item) => {
                  const id = `${baseId}-${item.label}`;
                  const isOpen = expanded === item.label;
                  return (
                    <li key={item.label} className="border-b border-line">
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={id}
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            className={`${itemClass} flex w-full items-center justify-between text-left`}
                          >
                            {item.label}
                            <CaretDown
                              size={20}
                              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.ul
                                id={id}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: dur }}
                                className="overflow-hidden"
                              >
                                {item.children.map((c) => (
                                  <li key={c.href} className="border-t border-line first:border-t-0">
                                    <Link
                                      href={c.href}
                                      onClick={onClose}
                                      className="block py-3 pl-4 text-base text-muted transition hover:text-text"
                                    >
                                      {c.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link href={item.href} onClick={onClose} className={itemClass}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
