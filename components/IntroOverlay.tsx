"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";

type IntroOverlayProps = {
  dismissed: boolean;
  onDismiss: () => void;
};

export function IntroOverlay({ dismissed, onDismiss }: IntroOverlayProps) {
  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-void/90 px-6 backdrop-blur-xl"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55 } }}
        >
          <motion.div
            className="glass-panel max-w-xl rounded-lg p-7 text-center md:p-10"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 font-display text-xs font-bold uppercase text-neon">Interactive Presentation Website</p>
            <h2 className="font-display text-3xl font-black uppercase leading-none text-white md:text-5xl">
              Begin the Deck
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-300 md:text-base">
              Use arrow keys, wheel, touch, or the side controls to move through cinematic fullscreen scenes.
            </p>
            <motion.button
              type="button"
              onClick={onDismiss}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/15 px-5 py-3 text-sm font-bold uppercase text-white shadow-glow transition hover:bg-neon/25 focus:outline-none focus:ring-2 focus:ring-neon"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="h-4 w-4 fill-current" />
              Start
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
