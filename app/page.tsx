import { Suspense } from "react";
import hustleData from "@/data/side-hustles.json";
import type { SideHustle } from "@/types";
import Sidebar from "@/components/layout/Sidebar";
import FilteredFeed from "@/components/home/FilteredFeed";
import TrendingTicker from "@/components/home/TrendingTicker";

const hustles = hustleData as SideHustle[];

/** 카테고리를 빈도 내림차순으로 정렬 (category는 항목당 1개 — 필터 facet으로 그대로 사용 가능) */
function getCategories(data: SideHustle[]): string[] {
  const freq = new Map<string, number>();
  data.forEach((h) => freq.set(h.category, (freq.get(h.category) ?? 0) + 1));
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);
}

/**
 * 필터로 쓸만한 특징 태그만 추출. 75개 전체 태그를 다 보여주면 필터가 아니라
 * 벽이 되므로: 너무 흔한 태그(대부분 항목에 붙어 변별력 없음)와 너무 드문 태그
 * (1회성이라 필터 의미 없음)를 제외하고 상위 N개만.
 */
function getFeatureTags(data: SideHustle[], max = 8): string[] {
  const freq = new Map<string, number>();
  data.forEach((h) =>
    h.tags.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)),
  );
  return Array.from(freq.entries())
    .filter(([, count]) => count >= 2 && count / data.length < 0.6)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([tag]) => tag);
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
  );
}

export default function HomePage() {
  const categories = getCategories(hustles);
  const featureTags = getFeatureTags(hustles);

  return (
    <div>
      {/* ── 트렌딩 티커 (full-bleed) ──────────────────────────────────── */}
      <TrendingTicker hustles={hustles} />

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* ── Hero (서버 렌더링, URL 무관) ─────────────────────────────── */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-ink mb-3 leading-[1.1] tracking-tight">
            지금 가장 뜨는 부업,
            <br />
            <span className="bg-primary text-white px-2 -rotate-1 inline-block">
              광고 없이
            </span>{" "}
            한눈에.
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium">
            지금 바로 시작할 수 있는 부업 정보만 모았습니다. 최대 3개까지 골라서
            바로 비교해보세요.
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
              <FilteredFeed
                hustles={hustles}
                categories={categories}
                featureTags={featureTags}
              />
            </Suspense>
          </div>

          {/* 사이드바: 서버 컴포넌트, URL 무관하게 정적 렌더링 */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
