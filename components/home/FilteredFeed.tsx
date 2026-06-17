'use client'

import { useSearchParams } from 'next/navigation'
import type { SideHustle } from '@/types'
import HustleCard    from '@/components/ui/HustleCard'
import TagFilterBar  from '@/components/ui/TagFilterBar'
import AdSlot        from '@/components/ui/AdSlot'
import SectionHeader from '@/components/home/SectionHeader'

interface FilteredFeedProps {
  hustles: SideHustle[]
  allTags: string[]
}

export default function FilteredFeed({ hustles, allTags }: FilteredFeedProps) {
  const searchParams = useSearchParams()
  const activeTag    = searchParams.get('tag')

  // ── 필터링 ─────────────────────────────────────────────────────────────
  const filtered  = activeTag
    ? hustles.filter((h) => h.tags.includes(activeTag))
    : hustles

  const trending  = filtered.filter((h) => h.isTrending)
  const popular   = filtered.filter((h) => h.isPopular)
  // 모든 부업: trendScore 내림차순
  const all       = [...filtered].sort((a, b) => b.trendScore - a.trendScore)
  const isEmpty   = filtered.length === 0

  return (
    <div className="space-y-10">
      {/* TagFilterBar — useSearchParams 사용, 이 컴포넌트 전체가 Suspense로 격리됨 */}
      <TagFilterBar tags={allTags} />

      {/* 전체 필터 결과 없음 */}
      {isEmpty && (
        <p className="text-center text-gray-400 py-16 text-sm">
          해당 태그의 부업 정보를 준비 중입니다.
        </p>
      )}

      {/* ── Section 1: 뜨는 부업 ────────────────────────────────────────── */}
      {trending.length > 0 && (
        <section aria-labelledby="section-trending">
          <SectionHeader emoji="🔥" title="뜨는 부업" />
          <div id="section-trending" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trending.map((h) => (
              <HustleCard key={h.id} hustle={h} />
            ))}
          </div>
        </section>
      )}

      {/* ── Section 2: 많이 찾는 부업 ───────────────────────────────────── */}
      {popular.length > 0 && (
        <section aria-labelledby="section-popular">
          <SectionHeader emoji="💡" title="많이 찾는 부업" />
          <div id="section-popular" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popular.map((h) => (
              <HustleCard key={h.id} hustle={h} />
            ))}
          </div>
        </section>
      )}

      {/* ── Section 3: 모든 부업 (in-feed AdSlot 포함) ──────────────────── */}
      {!isEmpty && (
        <section aria-labelledby="section-all">
          <SectionHeader emoji="📚" title="모든 부업" />

          {/* 첫 6개 카드 */}
          <div id="section-all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {all.slice(0, 6).map((h) => (
              <HustleCard key={h.id} hustle={h} />
            ))}
          </div>

          {/* In-feed AdSlot — 6번째 카드 이후 (데스크톱 전용) */}
          {all.length > 6 && (
            <>
              <div className="hidden md:flex justify-center my-6">
                <AdSlot size="in-feed" slotId="" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {all.slice(6).map((h) => (
                  <HustleCard key={h.id} hustle={h} />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {/* 모바일 전용 AdSlot — 피드 하단 */}
      {!isEmpty && (
        <div className="flex justify-center lg:hidden">
          <AdSlot size="mobile-banner" slotId="" />
        </div>
      )}
    </div>
  )
}
