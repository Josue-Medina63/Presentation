"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  x: `${(index * 37) % 100}%`,
  y: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 9) * 0.3
}));

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      <motion.div
        className="absolute -left-1/4 top-[-20%] h-[54rem] w-[54rem] rounded-full bg-cyan-400/15 blur-3xl"
        animate={{ x: [0, 120, 20], y: [0, 70, 10], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-26%] right-[-12%] h-[46rem] w-[46rem] rounded-full bg-fuchsia-500/14 blur-3xl"
        animate={{ x: [0, -90, -10], y: [0, -70, 0], scale: [1, 1.18, 0.96] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/3 h-[34rem] w-[34rem] rounded-full bg-amber-300/8 blur-3xl"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.08),transparent_28%,rgba(124,247,255,.07)_48%,transparent_68%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,.12),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(124,247,255,.12),transparent_30%)]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-white/70 shadow-[0_0_16px_rgba(124,247,255,.75)]"
          style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
          animate={{ y: [-16, 20, -16], opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.4, 0.7] }}
          transition={{ duration: 5 + (particle.id % 5), repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
