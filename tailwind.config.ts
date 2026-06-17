import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#FAFAF8",
          card: "#FFFFFF",
          sidebar: "#F5F3EF",
        },
        primary: {
          DEFAULT: "#FF8FAB",
          light: "#FFD6E0",
        },
        accent: {
          DEFAULT: "#A8D8B9",
          warm: "#FFD97D",
        },
        badge: {
          beginnerBg: "#D1FAE5",
          beginnerText: "#065F46",
          intermediateBg: "#FEF3C7",
          intermediateText: "#92400E",
          advancedBg: "#FEE2E2",
          advancedText: "#991B1B",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
        "card-hover": "0 6px 20px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
