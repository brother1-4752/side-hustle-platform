"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { DIFFICULTY_CONFIG } from "@/components/ui/HustleCard";

type FacetKey = "category" | "difficulty" | "tag";

const DIFFICULTY_OPTIONS: [string, string][] = [
  ["beginner", DIFFICULTY_CONFIG.beginner.label],
  ["intermediate", DIFFICULTY_CONFIG.intermediate.label],
  ["advanced", DIFFICULTY_CONFIG.advanced.label],
];

interface TagFilterBarProps {
  categories: string[];
  featureTags: string[];
}

function readFacet(
  searchParams: { get(key: string): string | null },
  key: FacetKey,
): string[] {
  const raw = searchParams.get(key) ?? "";
  return raw ? raw.split(",").filter(Boolean) : [];
}

export default function TagFilterBar({
  categories,
  featureTags,
}: TagFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategories = readFacet(searchParams, "category");
  const activeDifficulties = readFacet(searchParams, "difficulty");
  const activeTags = readFacet(searchParams, "tag");
  const totalActive =
    activeCategories.length + activeDifficulties.length + activeTags.length;

  const toggle = (key: FacetKey, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = readFacet(params, key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    if (next.length === 0) params.delete(key);
    else params.set(key, next.join(","));

    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/", { scroll: false });
  };

  const clearAll = () => router.push("/", { scroll: false });

  const base =
    "chip-brutal text-sm px-4 py-1.5 rounded-full whitespace-nowrap select-none font-bold";
  const active = "bg-primary text-white";
  const idle = "bg-white text-gray-600";

  const Facet = ({
    label,
    facetKey,
    options,
    activeValues,
  }: {
    label: string;
    facetKey: FacetKey;
    options: [string, string][];
    activeValues: string[];
  }) => (
    <div>
      <p className="text-xs font-black text-ink/50 uppercase tracking-widest mb-1.5">
        {label}
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={`${label} 필터`}
      >
        {options.map(([value, display]) => {
          const isOn = activeValues.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggle(facetKey, value)}
              className={`${base} ${isOn ? active : idle}`}
              aria-pressed={isOn}
            >
              {display}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1 min-w-0">
          <Facet
            label="카테고리"
            facetKey="category"
            options={categories.map((c) => [c, c])}
            activeValues={activeCategories}
          />
          <Facet
            label="난이도"
            facetKey="difficulty"
            options={DIFFICULTY_OPTIONS}
            activeValues={activeDifficulties}
          />
          <Facet
            label="특징"
            facetKey="tag"
            options={featureTags.map((t) => [t, `#${t}`])}
            activeValues={activeTags}
          />
        </div>
        {totalActive > 0 && (
          <button
            onClick={clearAll}
            className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 mt-5"
          >
            전체 해제
          </button>
        )}
      </div>

      {/* 활성 필터 요약 — 실제 매칭 규칙과 동일하게 명시 (FilteredFeed 로직 참조) */}
      {totalActive > 0 && (
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">
            {totalActive}개 필터 적용 중
          </span>
          <span className="text-gray-300 mx-1.5">—</span>
          카테고리·난이도는 선택한 것 중 하나만 맞아도(OR), 특징 태그는 선택한
          걸 전부 포함해야(AND) 표시돼요.
        </p>
      )}
    </div>
  );
}
