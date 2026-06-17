import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: '부업레이더 — 뜨는 부업, 인기 부업 한눈에 보기',
    template: '%s | 부업레이더',
  },
  description:
    '사기 없이, 지금 시작할 수 있는 부업 정보를 한눈에. 쿠팡파트너스, 스마트스토어, AI 콘텐츠 제작 등 검증된 부업 정보를 모아드립니다.',
  openGraph: {
    siteName: '부업레이더',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans bg-bg-base min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
