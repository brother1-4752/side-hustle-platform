"use client";

import { useSearchParams } from "next/navigation";
import type { SideHustle } from "@/types";
import HustleCard from "@/components/ui/HustleCard";
import TagFilterBar from "@/components/ui/TagFilterBar";
import AdSlot from "@/components/ui/AdSlot";
import SectionHeader from "@/components/home/SectionHeader";

interface FilteredFeedProps {
  hustles: SideHustle[];
  allTags: string[];
}

export default function FilteredFeed({ hustles, allTags }: FilteredFeedProps) {
  const searchParams = useSearchParams();

  // Comma-separated multi-tag param → string[]
  const tagParam = searchParams.get("tag") ?? "";
  const activeTags = tagParam ? tagParam.split(",").filter(Boolean) : [];

  // AND 교차 필터: 선택된 모든 태그를 보유한 항목만 통과
  const filtered =
    activeTags.length > 0
      ? hustles.filter((h) => activeTags.every((t) => h.tags.includes(t)))
      : hustles;

  const trending = filtered.filter((h) => h.isTrending);
  const popular = filtered.filter((h) => h.isPopular);
  const all = [...filtered].sort((a, b) => b.trendScore - a.trendScore);
  const isEmpty = filtered.length === 0;

  return (
    <div className="space-y-10">
      {/* TagFilterBar — useSearchParams 포함, Suspense로 격리됨 */}
      <TagFilterBar tags={allTags} />

      {/* 필터 결과 없음 */}
      {isEmpty && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-sm font-medium">
            {activeTags.length > 0
              ? `#${activeTags.join(" + #")} 조건을 모두 충족하는 부업을 준비 중입니다.`
              : "해당 태그의 부업 정보를 준비 중입니다."}
          </p>
          {activeTags.length > 1 && (
            <p className="text-gray-400 text-xs mt-2">
              태그를 하나씩 해제해보면 더 많은 결과를 볼 수 있어요.
            </p>
          )}
        </div>
      )}

      {/* ── Section 1: 뜨는 부업 ────────────────────────────────────────── */}
      {trending.length > 0 && (
        <section aria-labelledby="section-trending">
          <SectionHeader emoji="🔥" title="뜨는 부업" />
          <div
            id="section-trending"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
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
          <div
            id="section-popular"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
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
          <div
            id="section-all"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
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
  );
}
