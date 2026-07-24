"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SideHustle } from "@/types";
import HustleCard from "@/components/ui/HustleCard";
import TagFilterBar from "@/components/ui/TagFilterBar";
import AdSlot from "@/components/ui/AdSlot";
import SectionHeader from "@/components/home/SectionHeader";
import CompareTray from "@/components/home/CompareTray";

const MAX_COMPARE = 3;

interface FilteredFeedProps {
  hustles: SideHustle[];
  categories: string[];
  featureTags: string[];
}

function readParam(
  searchParams: ReturnType<typeof useSearchParams>,
  key: string,
): string[] {
  const raw = searchParams.get(key) ?? "";
  return raw ? raw.split(",").filter(Boolean) : [];
}

export default function FilteredFeed({
  hustles,
  categories,
  featureTags,
}: FilteredFeedProps) {
  const searchParams = useSearchParams();
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < MAX_COMPARE
          ? [...prev, slug]
          : prev,
    );
  };
  const compareHustles = compareSlugs
    .map((slug) => hustles.find((h) => h.slug === slug))
    .filter((h): h is SideHustle => h !== undefined);
  const compareProp = (slug: string) => ({
    checked: compareSlugs.includes(slug),
    disabled:
      !compareSlugs.includes(slug) && compareSlugs.length >= MAX_COMPARE,
    onToggle: toggleCompare,
  });

  // 카테고리·난이도: 단일값 필드라 그룹 내 OR (여러 개 선택 = 그중 하나만 맞아도 통과)
  const activeCategories = readParam(searchParams, "category");
  const activeDifficulties = readParam(searchParams, "difficulty");
  // 특징 태그: 다중값 필드라 그룹 내 AND 유지 (SPRINT-002에서 실사용자 요청으로 검증된 동작)
  const activeTags = readParam(searchParams, "tag");

  const hasFilter =
    activeCategories.length > 0 ||
    activeDifficulties.length > 0 ||
    activeTags.length > 0;

  const filtered = hustles.filter((h) => {
    if (activeCategories.length > 0 && !activeCategories.includes(h.category))
      return false;
    if (
      activeDifficulties.length > 0 &&
      !activeDifficulties.includes(h.difficulty)
    )
      return false;
    if (activeTags.length > 0 && !activeTags.every((t) => h.tags.includes(t)))
      return false;
    return true;
  });

  // 하이라이트 레일 — trendScore 상위 4개만. "전체" 그리드와 일부 겹쳐도 됨(가로 스크롤
  // 강조 띠 1줄 vs 풀사이즈 그리드 2개를 겹쳐 보여주던 것의 차이). 겹침 자체가 문제가 아니라
  // 30개 항목을 트렌딩/인기/전체 세 개의 풀그리드로 중복 렌더링하던 게 문제였음.
  const rail = filtered
    .filter((h) => h.isTrending)
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 4);
  const all = [...filtered].sort((a, b) => b.trendScore - a.trendScore);
  const isEmpty = filtered.length === 0;

  return (
    <div className="space-y-10">
      {/* TagFilterBar — useSearchParams 포함, Suspense로 격리됨 */}
      <TagFilterBar categories={categories} featureTags={featureTags} />

      {/* 필터 결과 없음 */}
      {isEmpty && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-500 text-sm font-medium">
            선택한 조건을 모두 충족하는 부업이 아직 없어요.
          </p>
          {hasFilter && (
            <p className="text-gray-400 text-xs mt-2">
              필터를 하나씩 해제해보면 더 많은 결과를 볼 수 있어요.
            </p>
          )}
        </div>
      )}

      {/* ── Section 1: 지금 뜨는 부업 (가로 스크롤 하이라이트) ───────────── */}
      {rail.length > 0 && (
        <section aria-labelledby="section-trending">
          <SectionHeader emoji="🔥" title="지금 뜨는 부업" />
          <div
            id="section-trending"
            className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory"
          >
            {rail.map((h) => (
              <div key={h.id} className="w-64 flex-shrink-0 snap-start">
                <HustleCard hustle={h} compare={compareProp(h.slug)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Section 2: 모든 부업 (in-feed AdSlot 포함) ──────────────────── */}
      {!isEmpty && (
        <section aria-labelledby="section-all">
          <SectionHeader emoji="📚" title="모든 부업" />

          {/* 첫 6개 카드 */}
          <div
            id="section-all"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {all.slice(0, 6).map((h) => (
              <HustleCard key={h.id} hustle={h} compare={compareProp(h.slug)} />
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
                  <HustleCard
                    key={h.id}
                    hustle={h}
                    compare={compareProp(h.slug)}
                  />
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

      {compareHustles.length > 0 && <div className="h-16" aria-hidden="true" />}
      <CompareTray
        hustles={compareHustles}
        onRemove={(slug) =>
          setCompareSlugs((prev) => prev.filter((s) => s !== slug))
        }
        onClear={() => setCompareSlugs([])}
      />
    </div>
  );
}
