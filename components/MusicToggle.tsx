"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  const oscillators = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    return () => {
      oscillators.current.forEach((oscillator) => oscillator.stop());
      audioContext.current?.close();
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioContext.current) {
      const context = new AudioContext();
      const output = context.createGain();
      output.gain.value = 0.035;
      output.connect(context.destination);

      const notes = [55, 82.41, 110];
      oscillators.current = notes.map((frequency, index) => {
        const oscillator = context.createOscillator();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index * 7;
        oscillator.connect(output);
        oscillator.start();
        return oscillator;
      });

      audioContext.current = context;
      gain.current = output;
    }

    if (audioContext.current.state === "suspended") {
      await audioContext.current.resume();
    }

    if (gain.current) {
      gain.current.gain.setTargetAtTime(enabled ? 0 : 0.035, audioContext.current.currentTime, 0.08);
    }

    setEnabled((value) => !value);
  };

  return (
    <motion.button
      type="button"
      onClick={toggleMusic}
      className="group fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-md transition hover:border-neon/60 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-neon/60"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={enabled ? "Mute ambient music" : "Play ambient music"}
      title={enabled ? "Mute ambient music" : "Play ambient music"}
    >
      <Music className="absolute h-4 w-4 translate-x-3 -translate-y-3 text-neon opacity-70" />
      {enabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </motion.button>
  );
}
