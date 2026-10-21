"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { ImageRef } from "@/data/types";

export function GalleryLightbox({ images }: { images: ImageRef[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const startX = useRef(0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = (dir: 1 | -1) =>
    setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length));

  const current = index !== null ? images[index] : null;
  const control =
    "absolute flex h-12 w-12 items-center justify-center bg-bg text-text focus-visible:outline-2 focus-visible:outline-accent";

  return (
    <>
      <div className="grid gap-3 md:h-[560px] md:grid-cols-3 md:grid-rows-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open image: ${img.alt}`}
            className={`group relative aspect-[3/2] overflow-hidden bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:aspect-auto ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => { if (e.target === dialog.current) setIndex(null); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onPointerDown={(e) => { startX.current = e.clientX; }}
        onPointerUp={(e) => {
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
        aria-label="Image viewer"
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-scrim/90"
      >
        {current && (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-4 md:p-12">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="max-h-[78dvh] w-auto max-w-full object-contain"
            />
            <p className="max-w-[70ch] text-center text-sm text-on-image">{current.alt}</p>
            <button type="button" aria-label="Close viewer" onClick={() => setIndex(null)} className={`${control} right-4 top-4`}>
              <X size={22} />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={`${control} left-4 top-1/2 -translate-y-1/2`}>
                  <CaretLeft size={22} />
                </button>
                <button type="button" aria-label="Next image" onClick={() => step(1)} className={`${control} right-4 top-1/2 -translate-y-1/2`}>
                  <CaretRight size={22} />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
