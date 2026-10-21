"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatDate, itemsForTab, newsTabs, parseTab, type NewsTab } from "@/data/news";
import { NewsLead, NewsRow } from "./NewsItemViews";

export function NewsBrowser() {
  const params = useSearchParams();
  const [tab, setTab] = useState<NewsTab>(() => parseTab(params.get("tab")));
  const [lead, ...rest] = itemsForTab(tab);

  return (
    <div>
      <div role="group" aria-label="Choose a section" className="mt-10 flex flex-wrap gap-2">
        {newsTabs.map((t) => {
          const on = tab === t.value;
          return (
            <button
              key={t.value}
              type="button"
              aria-pressed={on}
              onClick={() => setTab(t.value)}
              className={`h-10 border px-4 text-sm transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                on ? "border-text bg-text text-bg" : "border-field hover:border-text"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {!lead ? (
        <div className="mt-16 border border-line p-10">
          <p className="font-display text-2xl">Nothing here yet.</p>
          <p className="mt-2 text-muted">Check back soon, or try another section.</p>
        </div>
      ) : (
        <div className="mt-10">
          <NewsLead item={lead} date={formatDate(lead.date)} />
          {rest.length > 0 && (
            <ul className="mt-14">
              {rest.map((i) => (
                <li key={i.id} className="border-t border-line">
                  <NewsRow item={i} date={formatDate(i.date)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
