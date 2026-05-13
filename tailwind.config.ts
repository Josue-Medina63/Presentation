import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        void: "#05060d",
        ink: "#0b1020",
        neon: "#7cf7ff",
        pulse: "#ff3df2",
        ember: "#ffb86b"
      },
      boxShadow: {
        glow: "0 0 44px rgba(124, 247, 255, 0.24)",
        magenta: "0 0 40px rgba(255, 61, 242, 0.2)"
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, rgba(124,247,255,.18), transparent 34%)"
      },
      animation: {
        "slow-spin": "spin 18s linear infinite",
        "pulse-slow": "pulse 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
