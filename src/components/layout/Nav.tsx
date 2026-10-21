"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "../ui/Button";

const links = [
  { href: "/projects/", label: "Projects" },
  { href: "/landowners/", label: "Landowners" },
  { href: "/about/", label: "About" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition hover:text-text">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <ButtonLink href="/contact/" className="h-10 px-5">Book a visit</ButtonLink>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center border border-line"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-bg px-4 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ButtonLink href="/contact/" className="w-full">Book a visit</ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
