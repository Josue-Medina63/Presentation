"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { IntroOverlay } from "@/components/IntroOverlay";
import { MusicToggle } from "@/components/MusicToggle";
import { NavigationControls } from "@/components/NavigationControls";
import { ProgressBar } from "@/components/ProgressBar";
import { Slide } from "@/components/Slide";
import { cinematicEase } from "@/lib/motion";
import type { SlideData } from "@/types/slides";

type SlideContainerProps = {
  slides: SlideData[];
};

export function SlideContainer({ slides }: SlideContainerProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [introDismissed, setIntroDismissed] = useState(false);
  const wheelLocked = useRef(false);
  const touchStart = useRef<number | null>(null);

  const clampIndex = useCallback(
    (index: number) => Math.min(Math.max(index, 0), slides.length - 1),
    [slides.length]
  );

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index);
      setDirection(nextIndex > current ? 1 : -1);
      setCurrent(nextIndex);
    },
    [clampIndex, current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onSlideRequest = (event: Event) => {
      const slideId = (event as CustomEvent<{ id?: string }>).detail?.id;
      const requestedIndex = slides.findIndex((slide) => slide.id === slideId);

      if (requestedIndex >= 0) {
        goTo(requestedIndex);
      }
    };

    window.addEventListener("presentation:go-to-slide", onSlideRequest);
    return () => window.removeEventListener("presentation:go-to-slide", onSlideRequest);
  }, [goTo, slides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, previous]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (wheelLocked.current || Math.abs(event.deltaY) < 18) return;

      wheelLocked.current = true;
      if (event.deltaY > 0) next();
      if (event.deltaY < 0) previous();

      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 820);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, previous]);

  const transitionVariants = useMemo(
    () => ({
      enter: (slideDirection: number) => ({
        opacity: 0,
        x: slideDirection > 0 ? 80 : -80,
        scale: 0.985,
        filter: "blur(16px)"
      }),
      center: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.72, ease: cinematicEase }
      },
      exit: (slideDirection: number) => ({
        opacity: 0,
        x: slideDirection > 0 ? -80 : 80,
        scale: 1.015,
        filter: "blur(18px)",
        transition: { duration: 0.48, ease: cinematicEase }
      })
    }),
    []
  );

  return (
    <main
      className="relative h-dvh w-screen overflow-hidden bg-void text-white"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - (event.changedTouches[0]?.clientX ?? touchStart.current);
        if (distance > 50) next();
        if (distance < -50) previous();
        touchStart.current = null;
      }}
    >
      <BackgroundEffects />
      <ProgressBar current={current} total={slides.length} />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slides[current].id}
          custom={direction}
          variants={transitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Slide slide={slides[current]} index={current} active />
        </motion.div>
      </AnimatePresence>
      <NavigationControls slides={slides} current={current} goTo={goTo} previous={previous} next={next} />
      <MusicToggle />
      <IntroOverlay dismissed={introDismissed} onDismiss={() => setIntroDismissed(true)} />
    </main>
  );
}
