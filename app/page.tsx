import { Suspense }    from 'react'
import hustleData     from '@/data/side-hustles.json'
import type { SideHustle } from '@/types'
import Sidebar        from '@/components/layout/Sidebar'
import FilteredFeed   from '@/components/home/FilteredFeed'

const hustles = hustleData as SideHustle[]

/** 태그 빈도 내림차순으로 정렬된 고유 태그 목록 */
function getSortedTags(data: SideHustle[]): string[] {
  const freq = new Map<string, number>()
  data.forEach((h) =>
    h.tags.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1))
  )
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
}

/** Suspense fallback — 카드 영역 스켈레톤 */
function FeedSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* TagFilterBar skeleton */}
      <div className="flex gap-2 flex-wrap">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-9 w-20 bg-gray-100 rounded-full" />
        ))}
      </div>
      {/* Card grid skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-100 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-44 bg-gray-100 rounded-card" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const allTags = getSortedTags(hustles)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ── Hero (서버 렌더링, URL 무관) ─────────────────────────────── */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          지금 가장 뜨는 부업, 광고 없이 한눈에. 🌿
        </h1>
        <p className="text-gray-500 text-base">
          사기 없이, 지금 바로 시작할 수 있는 부업 정보만 모았습니다.
        </p>
      </section>

      {/* ── Main layout: 피드 + 사이드바 ────────────────────────────── */}
      <div className="flex gap-8 items-start">
        {/* 메인 피드: URL 파라미터 기반 동적 필터링 */}
        <div className="flex-1 min-w-0">
          {/*
            CRITICAL (PRD FR-6): TagFilterBar가 useSearchParams를 사용하므로
            output: 'export' SSG 빌드 시 deoptimization 방지를 위해
            FilteredFeed 전체를 Suspense로 격리
          */}
          <Suspense fallback={<FeedSkeleton />}>
            <FilteredFeed hustles={hustles} allTags={allTags} />
          </Suspense>
        </div>

        {/* 사이드바: 서버 컴포넌트, URL 무관하게 정적 렌더링 */}
        <Sidebar />
      </div>
    </div>
  )
}
