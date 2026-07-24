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
        // 실제로 반복 사용되던 값(0 2px 12px / 0.04)에 토큰을 맞춤 — 기존 토큰은 정의만
        // 되어있고 실제 컴포넌트들은 전부 다른 임의값을 써서 어긋나 있었음
        card: "0 2px 12px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
