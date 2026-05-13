"use client";

import { motion } from "framer-motion";
import { textReveal } from "@/lib/motion";

type AnimatedTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <motion.div variants={textReveal} className={`text-base leading-7 text-slate-200 md:text-lg ${className}`}>
      {children}
    </motion.div>
  );
}
