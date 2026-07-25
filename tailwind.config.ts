import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 통일감을 위해 팔레트를 최소화: 배경/잉크(무채색) + 브랜드 컬러 1개 +
        // 기능색 2개(success=수익/긍정, warning은 Tailwind 기본 amber 사용)뿐.
        // 장식 목적의 추가 색상(블루/라임/카테고리별 색 등)은 전부 제거.
        bg: {
          base: "#F7F5F1",
          card: "#FFFFFF",
          sidebar: "#F0EDE6",
        },
        ink: "#16181D",
        primary: {
          DEFAULT: "#D6336C", // 유일한 브랜드 포인트 컬러 — 버튼·링크·선택 상태에만 사용
          light: "#F7D6E3",
        },
        success: "#0F9D58", // 수익 등 긍정적 수치 전용. 장식용으로 다른 곳에 쓰지 않음
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
      },
      // 카드 그림자·호버 인터랙션은 globals.css의 .card-soft / .chip-soft
      // 유틸리티 클래스로 일원화 — boxShadow 토큰은 더 이상 사용하지 않음
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
