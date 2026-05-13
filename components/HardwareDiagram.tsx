"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const nodes = [
  {
    key: "cpu",
    title: "Xenon CPU",
    meta: "IBM + Microsoft",
    body: "3 PowerPC cores at 3.2 GHz, supporting 6 hardware threads for parallel game logic.",
    x: "12%",
    y: "30%"
  },
  {
    key: "gpu",
    title: "Xenos GPU",
    meta: "ATI Technologies",
    body: "500 MHz graphics processor with unified shaders and 10 MB eDRAM.",
    x: "58%",
    y: "24%"
  },
  {
    key: "impact",
    title: "Industry Shift",
    meta: "Multicore + unified shaders",
    body: "Developers redesigned engines for parallel processing while GPU design moved toward modern shader architecture.",
    x: "34%",
    y: "65%"
  }
];

export function HardwareDiagram() {
  const [selected, setSelected] = useState(nodes[0]);

  return (
    <div className="glass-panel relative min-h-[31rem] overflow-hidden rounded-lg p-5">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <motion.path
          d="M 135 170 C 270 110, 390 115, 535 150"
          stroke="rgba(124,247,255,.45)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 10"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 530 190 C 455 275, 360 305, 300 355"
          stroke="rgba(255,61,242,.38)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 10"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 190 215 C 220 295, 265 330, 345 380"
          stroke="rgba(255,184,107,.38)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 10"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {nodes.map((node) => (
        <motion.button
          key={node.key}
          type="button"
          onClick={() => setSelected(node)}
          className={`absolute rounded-lg border p-4 text-left backdrop-blur-md transition ${
            selected.key === node.key
              ? "border-neon bg-neon/15 shadow-glow"
              : "border-white/15 bg-black/35 hover:border-white/40"
          }`}
          style={{ left: node.x, top: node.y, width: "clamp(9rem, 24vw, 15rem)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <p className="font-display text-[10px] font-black uppercase text-white/50">{node.meta}</p>
          <h3 className="mt-2 font-display text-xl font-black uppercase text-white">{node.title}</h3>
        </motion.button>
      ))}

      <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur-md">
        <p className="font-display text-xs font-black uppercase text-neon">{selected.meta}</p>
        <p className="mt-2 text-sm leading-6 text-slate-200">{selected.body}</p>
      </div>
    </div>
  );
}
