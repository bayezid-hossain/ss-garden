"use client";

import { useState } from "react";

export function StoryFold({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div id="story-body" className={`space-y-4 text-lg ${open ? "" : "line-clamp-3"}`}>
        {paragraphs.map((t) => <p key={t}>{t}</p>)}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="story-body"
        onClick={() => setOpen(!open)}
        className="mt-4 text-sm font-medium text-accent underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? "See less" : "Show more"}
      </button>
    </div>
  );
}
