import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import hustleData from '@/data/side-hustles.json'
import type { SideHustle } from '@/types'
import DetailHeader from '@/components/detail/DetailHeader'
import MetricPanel  from '@/components/detail/MetricPanel'
import StartGuide   from '@/components/detail/StartGuide'
import AdSlot       from '@/components/ui/AdSlot'

const hustles = hustleData as SideHustle[]

export function generateStaticParams() {
  return hustles.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const hustle = hustles.find((h) => h.slug === params.slug)
  if (!hustle) return {}

  return {
    title: `${hustle.title} 부업 완전 가이드`,
    description: hustle.summary,
    openGraph: {
      title: `${hustle.title} 부업 완전 가이드 | 부업레이더`,
      description: hustle.summary,
    },
  }
}

export default function SideHustleDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const hustle = hustles.find((h) => h.slug === params.slug)
  if (!hustle) notFound()

  const related = hustles
    .filter(
      (h) => h.slug !== hustle.slug && h.tags.some((t) => hustle.tags.includes(t))
    )
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 2)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 브레드크럼 */}
      <nav
        className="flex items-center gap-2 text-sm text-gray-400 mb-6"
        aria-label="breadcrumb"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          홈
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-600 truncate max-w-xs">{hustle.title}</span>
      </nav>

      {/* 헤더 (아이콘 + 배지 + 제목 + 요약 + 태그) */}
      <DetailHeader hustle={hustle} />

      {/* 본문 레이아웃: 2/3 main + 1/3 sidebar */}
      <div className="flex gap-8 items-start">
        {/* ── 메인 콘텐츠 ──────────────────────────────────────────────── */}
        <article className="flex-1 min-w-0">
          {/* 4대 핵심 지표 패널 */}
          <MetricPanel hustle={hustle} />

          {/* 개요 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📖 개요</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
              {hustle.overview}
            </p>
          </section>

          {/* In-content AdSlot (데스크톱, 728×90) */}
          <div className="hidden md:flex justify-center my-8" aria-hidden="true">
            <AdSlot size="in-content" slotId="" />
          </div>

          {/* 시작 가이드 */}
          <StartGuide steps={hustle.startGuide} />

          {/* 모바일 AdSlot */}
          <div className="flex justify-center mt-8 md:hidden" aria-hidden="true">
            <AdSlot size="mobile-banner" slotId="" />
          </div>

          {/* 홈으로 돌아가기 */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              ← 모든 부업 보기
            </Link>
          </div>
        </article>

        {/* ── 사이드바 (lg+ 전용) ──────────────────────────────────────── */}
        <aside className="hidden lg:flex lg:flex-col w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-20 flex flex-col gap-5">
            {/* 사이드바 광고 (300×250) */}
            <AdSlot size="rectangle" slotId="" />

            {/* 관련 부업 */}
            {related.length > 0 && (
              <div className="bg-bg-sidebar rounded-card p-4">
                <h3 className="text-sm font-bold text-gray-700 mb-3">
                  이런 부업도 있어요
                </h3>
                <ul className="space-y-3">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/side-hustle/${r.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <span className="text-xl leading-none" aria-hidden="true">
                          {r.icon}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            월 {r.expectedMonthlyIncome.min}~{r.expectedMonthlyIncome.max}만원
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 사이드바 하단 광고 (300×600) */}
            <AdSlot size="half-page" slotId="" />
          </div>
        </aside>
      </div>
    </div>
  )
}
