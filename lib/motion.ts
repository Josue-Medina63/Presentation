import type { Variants } from "framer-motion";

export const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const titleReveal: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: cinematicEase }
  }
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: cinematicEase }
  }
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};
