import type { ReactNode } from "react";

export type Accent = "cyan" | "magenta" | "amber" | "lime" | "violet";

export type SlideData = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  layout: "intro" | "research" | "breakdown" | "showcase" | "atomLab" | "credits";
  accent: Accent;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  bullets?: string[];
  facts?: Array<{
    label: string;
    value: string;
  }>;
  chips?: string[];
  cards?: Array<{
    title: string;
    body: string;
    meta?: string;
  }>;
  allCardsOpen?: boolean;
  credits?: string[];
  visual?: ReactNode;
};
