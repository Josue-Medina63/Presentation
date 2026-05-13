"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-neon via-pulse to-ember"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
