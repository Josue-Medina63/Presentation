"use client";

import { Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { SlideData } from "@/types/slides";

type NavigationControlsProps = {
  slides: SlideData[];
  current: number;
  goTo: (index: number) => void;
  previous: () => void;
  next: () => void;
};

export function NavigationControls({ slides, current, goTo, previous, next }: NavigationControlsProps) {
  const enterFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <>
      <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            className="group flex items-center justify-end gap-3 focus:outline-none"
            aria-label={`Go to ${slide.title}`}
          >
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase text-white/70 opacity-0 transition-all group-hover:max-w-48 group-hover:opacity-100">
              {slide.eyebrow}
            </span>
            <motion.span
              className={`block rounded-full border transition ${
                current === index
                  ? "h-9 w-2 border-neon bg-neon shadow-glow"
                  : "h-2.5 w-2.5 border-white/30 bg-white/25 group-hover:border-white/70"
              }`}
              layout
            />
          </button>
        ))}
      </div>

      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur-md md:left-5 md:translate-x-0">
        <button
          type="button"
          onClick={previous}
          className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon/60"
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="min-w-16 text-center font-display text-xs font-bold uppercase text-white/70">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={next}
          className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon/60"
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={enterFullscreen}
          className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon/60"
          aria-label="Toggle fullscreen"
          title="Toggle fullscreen"
        >
          <Maximize className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}
