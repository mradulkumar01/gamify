import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        abyss: {
          950: "#030205",
          900: "#07060a",
          850: "#0d0b13",
          800: "#13101c",
          700: "#1e1a2c",
          600: "#2d2740",
        },
        obsidian: "#060608",
        charcoal: "#0e0e14",
        blood: {
          DEFAULT: "#ff1c2f",
          glow: "rgba(255, 28, 47, 0.45)",
          dark: "#8a030f",
          crimson: "#d61324",
          scarlet: "#b00d1b",
        },
        toxic: {
          DEFAULT: "#00ff87",
          dim: "#0f764a",
          glow: "rgba(0, 255, 135, 0.35)",
        },
        cold: {
          DEFAULT: "#40c4ff",
          dim: "#174e78",
          ghost: "#e0f2fe",
        },
        ghost: {
          white: "#f8fafc",
          ash: "#94a3b8",
          fog: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "blood-sm": "0 0 15px rgba(255, 28, 47, 0.25)",
        "blood-md": "0 0 30px rgba(255, 28, 47, 0.4)",
        "blood-lg": "0 0 60px rgba(255, 28, 47, 0.55)",
        "toxic-sm": "0 0 15px rgba(0, 255, 135, 0.3)",
        "cold-sm": "0 0 15px rgba(64, 196, 255, 0.3)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41.99%": { opacity: "1" },
          "42%": { opacity: "0.4" },
          "43%": { opacity: "1" },
          "45.99%": { opacity: "1" },
          "46%": { opacity: "0.2" },
          "46.5%": { opacity: "0.9" },
          "47%": { opacity: "0.3" },
          "47.5%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 28, 47, 0.25)" },
          "50%": { boxShadow: "0 0 35px rgba(255, 28, 47, 0.55)" },
        },
        mistDrift: {
          "0%": { transform: "translateX(-5%) translateY(0) scale(1)" },
          "50%": { transform: "translateX(5%) translateY(-3%) scale(1.05)" },
          "100%": { transform: "translateX(-5%) translateY(0) scale(1)" },
        },
        glitchShift: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-1px, -1px)" },
          "60%": { transform: "translate(2px, 1px)" },
          "80%": { transform: "translate(1px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      animation: {
        flicker: "flicker 5s infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "mist-slow": "mistDrift 20s ease-in-out infinite",
        glitch: "glitchShift 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      },
    },
  },
  plugins: [],
};

export default config;
