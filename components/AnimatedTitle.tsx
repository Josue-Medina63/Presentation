"use client";

import { motion } from "framer-motion";
import { titleReveal } from "@/lib/motion";

type AnimatedTitleProps = {
  children: string;
  className?: string;
};

export function AnimatedTitle({ children, className = "" }: AnimatedTitleProps) {
  return (
    <motion.h1
      variants={titleReveal}
      className={`font-display text-5xl font-black uppercase leading-[0.9] tracking-normal text-white md:text-7xl lg:text-8xl ${className}`}
    >
      {children}
    </motion.h1>
  );
}
