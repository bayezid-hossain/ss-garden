"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    setDark(t ? t === "dark" : true);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(!dark);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-10 w-10 items-center justify-center border border-line transition active:scale-[0.96] hover:border-text focus-visible:outline-2 focus-visible:outline-accent"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
