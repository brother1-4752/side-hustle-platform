import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// @ts-ignore: allow importing CSS as a side-effect without a module declaration
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://side-hustle-platform.vercel.app";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "부업레이더 — 뜨는 부업, 인기 부업 한눈에 보기",
    template: "%s | 부업레이더",
  },
  description:
    "지금 시작할 수 있는 부업 정보를 한눈에. 쿠팡파트너스, 스마트스토어, AI 콘텐츠 제작 등 검증된 부업 정보를 모아드립니다.",
  keywords: [
    "부업",
    "재테크",
    "투잡",
    "N잡",
    "재택부업",
    "AI부업",
    "온라인부업",
    "부업추천",
  ],
  authors: [{ name: "부업레이더" }],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "부업레이더",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "부업레이더 — 뜨는 부업, 인기 부업 한눈에",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "부업레이더 — 뜨는 부업, 인기 부업 한눈에 보기",
    description: "지금 시작할 수 있는 부업 정보를 한눈에.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans bg-bg-base min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
