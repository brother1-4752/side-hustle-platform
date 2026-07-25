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
        ink: "#141B2E", // 본문/헤딩·다크 블록 전용 near-black(살짝 네이비 톤)
        primary: {
          DEFAULT: "#FF3D6E", // 브랜드 포인트 컬러(코럴핑크) — 버튼·링크에만 절제해서 사용
          light: "#FFD1DC",
        },
        accent: {
          DEFAULT: "#2F5FFF", // 코발트 블루 — 정보성 다크 블록 보조색
          lime: "#22B573", // 포인트 그린(수익·긍정 지표) — 네온 라임 대신 차분한 그린으로
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
