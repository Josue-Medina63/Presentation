"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/AnimatedText";
import { AnimatedTitle } from "@/components/AnimatedTitle";
import { cinematicEase, staggerParent, textReveal } from "@/lib/motion";
import type { Accent, SlideData } from "@/types/slides";

type SlideProps = {
  slide: SlideData;
  index: number;
  active: boolean;
};

const accentClasses: Record<Accent, { text: string; bg: string; border: string; glow: string; from: string }> = {
  cyan: {
    text: "text-neon",
    bg: "bg-neon/15",
    border: "border-neon/35",
    glow: "shadow-glow",
    from: "from-cyan-300/35"
  },
  magenta: {
    text: "text-pulse",
    bg: "bg-pulse/15",
    border: "border-pulse/35",
    glow: "shadow-magenta",
    from: "from-fuchsia-400/35"
  },
  amber: {
    text: "text-ember",
    bg: "bg-ember/15",
    border: "border-ember/35",
    glow: "shadow-[0_0_42px_rgba(255,184,107,.18)]",
    from: "from-amber-300/35"
  },
  lime: {
    text: "text-lime-300",
    bg: "bg-lime-300/15",
    border: "border-lime-300/35",
    glow: "shadow-[0_0_42px_rgba(190,242,100,.18)]",
    from: "from-lime-300/30"
  },
  violet: {
    text: "text-violet-300",
    bg: "bg-violet-400/15",
    border: "border-violet-300/35",
    glow: "shadow-[0_0_42px_rgba(196,181,253,.18)]",
    from: "from-violet-300/35"
  }
};

export function Slide({ slide, index, active }: SlideProps) {
  const accent = accentClasses[slide.accent];

  return (
    <motion.section
      className="absolute inset-0 h-dvh w-screen overflow-hidden px-5 py-16 md:px-12 lg:px-20"
      initial={false}
      animate={active ? "visible" : "hidden"}
      aria-hidden={!active}
    >
      <motion.div
        className={`absolute inset-x-8 top-16 h-44 bg-gradient-to-r ${accent.from} via-transparent to-transparent opacity-80 blur-3xl`}
        animate={active ? { x: [0, 30, 0], opacity: [0.45, 0.8, 0.45] } : { opacity: 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center"
        variants={staggerParent}
      >
        {slide.layout === "intro" && <IntroScene slide={slide} accent={accent} index={index} />}
        {slide.layout === "research" && <ResearchScene slide={slide} accent={accent} />}
        {slide.layout === "breakdown" && <BreakdownScene slide={slide} accent={accent} />}
        {slide.layout === "showcase" && <ShowcaseScene slide={slide} accent={accent} />}
        {slide.layout === "atomLab" && <AtomLabScene slide={slide} accent={accent} />}
        {slide.layout === "credits" && <CreditsScene slide={slide} accent={accent} />}
      </motion.div>
    </motion.section>
  );
}

type SceneProps = {
  slide: SlideData;
  accent: (typeof accentClasses)[Accent];
  index?: number;
};

function Eyebrow({ slide, accent }: SceneProps) {
  return (
    <motion.p variants={textReveal} className={`mb-4 font-display text-xs font-bold uppercase ${accent.text}`}>
      {slide.eyebrow}
    </motion.p>
  );
}

function IntroScene({ slide, accent }: SceneProps) {
  return (
    <div className="grid w-full items-center gap-9 lg:grid-cols-[1.08fr_.92fr]">
      <div>
        <Eyebrow slide={slide} accent={accent} />
        <AnimatedTitle>{slide.title}</AnimatedTitle>
        <AnimatedText className="mt-6 max-w-2xl">{slide.subtitle}</AnimatedText>
        <motion.div variants={staggerParent} className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          {slide.stats?.map((stat) => (
            <motion.div key={stat.label} variants={textReveal} className="glass-panel rounded-lg p-4">
              <p className={`font-display text-3xl font-black ${accent.text}`}>{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase text-white/55">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        variants={textReveal}
        className={`manga-frame relative min-h-80 overflow-hidden border ${accent.border} ${accent.glow} bg-white/[0.06] p-8`}
      >
        <motion.div
          className={`absolute inset-6 border ${accent.border}`}
          animate={{ scale: [1, 1.035, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute left-1/2 top-1/2 grid h-48 w-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full ${accent.bg} ${accent.text}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {slide.visual}
        </motion.div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between border-t border-white/15 pt-4 text-xs uppercase text-white/55">
          <span>Motion Deck</span>
          <span>Ready</span>
        </div>
      </motion.div>
    </div>
  );
}

function ResearchScene({ slide, accent }: SceneProps) {
  return (
    <div className="grid w-full items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
      <div className="order-2 lg:order-1">
        <motion.div variants={staggerParent} className="grid gap-3">
          {slide.bullets?.map((bullet, bulletIndex) => (
            <motion.div
              key={bullet}
              variants={textReveal}
              className="glass-panel rounded-lg p-4"
              whileHover={{ x: 8, borderColor: "rgba(124,247,255,.45)" }}
            >
              <span className={`font-display text-sm font-black ${accent.text}`}>
                {String(bulletIndex + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm leading-6 text-slate-200 md:text-base">{bullet}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="order-1 lg:order-2">
        <Eyebrow slide={slide} accent={accent} />
        <AnimatedTitle className="max-w-3xl">{slide.title}</AnimatedTitle>
        <AnimatedText className="mt-6 max-w-2xl">{slide.subtitle}</AnimatedText>
        {slide.facts && (
          <motion.div variants={staggerParent} className="mt-6 grid max-w-2xl grid-cols-2 gap-3">
            {slide.facts.map((fact) => (
              <motion.div key={fact.label} variants={textReveal} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                <p className={`font-display text-xs font-black uppercase ${accent.text}`}>{fact.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">{fact.value}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div variants={staggerParent} className="mt-7 flex flex-wrap gap-3">
          {slide.stats?.map((stat) => (
            <motion.div key={stat.label} variants={textReveal} className={`rounded-full border ${accent.border} ${accent.bg} px-4 py-2`}>
              <span className="font-display text-lg font-black text-white">{stat.value}</span>
              <span className="ml-2 text-xs uppercase text-white/60">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function BreakdownScene({ slide, accent }: SceneProps) {
  return (
    <div className="w-full">
      <div className="max-w-4xl">
        <Eyebrow slide={slide} accent={accent} />
        <AnimatedTitle>{slide.title}</AnimatedTitle>
        <AnimatedText className="mt-5 max-w-3xl">{slide.subtitle}</AnimatedText>
      </div>
      <motion.div variants={staggerParent} className="mt-8 grid gap-4 md:grid-cols-3">
        {slide.cards?.map((card) => (
          <motion.article
            key={card.title}
            variants={textReveal}
            className={`glass-panel rounded-lg border ${accent.border} p-5`}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <p className={`font-display text-xs font-black uppercase ${accent.text}`}>{card.meta}</p>
            <h3 className="mt-10 font-display text-3xl font-black uppercase text-white">{card.title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">{card.body}</p>
          </motion.article>
        ))}
      </motion.div>
      {slide.chips && (
        <motion.div variants={staggerParent} className="mt-5 flex flex-wrap gap-2">
          {slide.chips.map((chip) => (
            <motion.span
              key={chip}
              variants={textReveal}
              className={`rounded-full border ${accent.border} ${accent.bg} px-3 py-1 text-xs font-bold uppercase text-white/80`}
            >
              {chip}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ShowcaseScene({ slide, accent }: SceneProps) {
  const [openCard, setOpenCard] = useState(0);
  const allCardsOpen = slide.allCardsOpen;

  return (
    <div className="grid w-full items-center gap-8 lg:grid-cols-[.92fr_1.08fr]">
      <div>
        <Eyebrow slide={slide} accent={accent} />
        <AnimatedTitle>{slide.title}</AnimatedTitle>
        <AnimatedText className="mt-5 max-w-2xl">{slide.subtitle}</AnimatedText>
        <motion.div variants={staggerParent} className="mt-7 grid gap-3">
          {slide.cards?.map((card, cardIndex) => (
            <motion.button
              key={card.title}
              type="button"
              variants={textReveal}
              onClick={() => setOpenCard(cardIndex)}
              className={`glass-panel rounded-lg p-4 text-left transition ${
                allCardsOpen || openCard === cardIndex ? `border ${accent.border}` : "border border-white/10"
              }`}
              whileHover={{ x: 8 }}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-black uppercase text-white">{card.title}</h3>
                <ChevronDown className={`h-4 w-4 transition ${allCardsOpen || openCard === cardIndex ? "rotate-180" : ""}`} />
              </div>
              {(allCardsOpen || openCard === cardIndex) && <p className="mt-3 text-sm leading-6 text-slate-300">{card.body}</p>}
            </motion.button>
          ))}
        </motion.div>
      </div>
      <motion.div variants={textReveal}>
        {slide.visual ? (
          slide.visual
        ) : (
          <div className="glass-panel relative min-h-80 overflow-hidden rounded-lg p-6">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-20" />
            <div className="relative flex h-full min-h-80 flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs uppercase text-white/50">
                <span>Visualizer Placeholder</span>
                <span>{slide.cards?.[openCard]?.meta}</span>
              </div>
              <div className="flex h-48 items-end justify-center gap-2">
                {Array.from({ length: 24 }, (_, index) => (
                  <motion.span
                    key={index}
                    className={`w-2 rounded-full ${accent.bg}`}
                    animate={{ height: [24, 96 + ((index * 19) % 84), 34] }}
                    transition={{ duration: 1.2 + (index % 5) * 0.15, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <h3 className="font-display text-3xl font-black uppercase text-white">{slide.cards?.[openCard]?.title}</h3>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function AtomLabScene({ slide, accent }: SceneProps) {
  return (
    <div className="grid w-full gap-6">
      <div className="max-w-4xl">
        <Eyebrow slide={slide} accent={accent} />
        <AnimatedTitle>{slide.title}</AnimatedTitle>
        <AnimatedText className="mt-4 max-w-3xl">{slide.subtitle}</AnimatedText>
      </div>
      <motion.div variants={textReveal}>{slide.visual}</motion.div>
    </div>
  );
}

function CreditsScene({ slide, accent }: SceneProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl place-items-center text-center">
      <Eyebrow slide={slide} accent={accent} />
      <AnimatedTitle>{slide.title}</AnimatedTitle>
      <AnimatedText className="mt-6 max-w-2xl">{slide.subtitle}</AnimatedText>
      <motion.div variants={staggerParent} className="mt-9 grid w-full gap-3 sm:grid-cols-2">
        {slide.credits?.map((credit) => (
          <motion.div key={credit} variants={textReveal} className="glass-panel rounded-lg p-4">
            <p className="font-display text-lg font-black uppercase text-white">{credit}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={textReveal}
        className={`mt-8 rounded-full border ${accent.border} ${accent.bg} px-5 py-2 text-xs font-bold uppercase text-white/80`}
      >
        End of deck
      </motion.div>
    </div>
  );
}
