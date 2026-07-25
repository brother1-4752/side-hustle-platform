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
          base: "#FFF7E8", // 웜 크림(종이) — 흔한 순백/연회색 SaaS 배경과 차별화
          card: "#FFFFFF",
          sidebar: "#FFEFD1",
        },
        ink: "#141414", // 브루탈 보더·하드섀도우 전용 near-black
        primary: {
          DEFAULT: "#FF3D6E", // 파스텔 핑크(#FF8FAB) → 채도 높인 비비드 코럴핑크
          light: "#FFD1DC",
        },
        accent: {
          DEFAULT: "#2F5FFF", // 코발트 블루 — 3색 브루탈 팔레트의 두 번째 축
          lime: "#D6FF3F", // 포인트용 형광 라임
          warm: "#FFD97D",
        },
        badge: {
          beginnerBg: "#CFFFE0",
          beginnerText: "#02542D",
          intermediateBg: "#FFECAD",
          intermediateText: "#7A4100",
          advancedBg: "#FFD0D0",
          advancedText: "#7A0B0B",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
      // 카드 그림자·호버 인터랙션은 globals.css의 .card-brutal / .chip-brutal
      // 유틸리티 클래스로 일원화 — boxShadow 토큰은 더 이상 사용하지 않음
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
