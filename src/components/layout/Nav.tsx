"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretDown, List } from "@phosphor-icons/react";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { ButtonLink } from "../ui/Button";
import { menu, type MenuItem } from "@/data/site";

// Desktop order. Contact is omitted: "Book a visit" serves the same intent.
const desktopOrder = ["Home", "Projects", "Expertise", "Landowners", "News", "About", "Career"];
const desktop = desktopOrder.map((l) => menu.find((m) => m.label === l)!);

const linkClass =
  "whitespace-nowrap text-sm text-muted transition hover:text-text focus-visible:outline-2 focus-visible:outline-accent";

function DropdownItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
        className={`${linkClass} inline-flex items-center gap-1`}
      >
        {item.label}
        <CaretDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-opacity duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="min-w-44 border border-line bg-bg py-2">
          {item.children!.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                className="block whitespace-nowrap px-4 py-2 text-sm text-muted transition hover:bg-surface hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Brand />
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
            {desktop.map((item) =>
              item.children ? (
                <DropdownItem key={item.label} item={item} />
              ) : (
                <Link key={item.href} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ),
            )}
            <ThemeToggle />
            <ButtonLink href="/contact/" className="h-10 px-5">Book a visit</ButtonLink>
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-line"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
