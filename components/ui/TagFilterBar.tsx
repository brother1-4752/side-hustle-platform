"use client";

import { useSearchParams, useRouter } from "next/navigation";

interface TagFilterBarProps {
  tags: string[];
}

export default function TagFilterBar({ tags }: TagFilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Comma-separated → string[] (URLSearchParams auto-decodes Korean)
  const tagParam = searchParams.get("tag") ?? "";
  const activeTags = tagParam ? tagParam.split(",").filter(Boolean) : [];

  const toggle = (tag: string) => {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];

    if (next.length === 0) {
      router.push("/", { scroll: false });
    } else {
      const params = new URLSearchParams();
      params.set("tag", next.join(","));
      router.push(`/?${params.toString()}`, { scroll: false });
    }
  };

  const clearAll = () => router.push("/", { scroll: false });

  const base =
    "text-sm px-4 py-1.5 rounded-full border transition-all duration-150 whitespace-nowrap select-none";
  const active = "bg-primary text-white border-primary shadow-sm";
  const idle =
    "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary";

  return (
    <div className="space-y-3">
      {/* 필터 버튼 행 */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="태그 필터">
        <button
          onClick={clearAll}
          className={`${base} ${activeTags.length === 0 ? active : idle}`}
          aria-pressed={activeTags.length === 0}
        >
          전체
        </button>

        {tags.map((tag) => {
          const isOn = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`${base} ${isOn ? active : idle}`}
              aria-pressed={isOn}
            >
              #{tag}
            </button>
          );
        })}
      </div>

      {/* 활성 필터 요약 — 1개 이상 선택 시만 표시 */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">
            {activeTags.length}개 필터 적용 중
          </span>
          <span className="text-gray-300">—</span>
          {activeTags.map((t, i) => (
            <span key={t} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-[10px] font-bold text-primary/70 px-0.5">
                  AND
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                #{t}
                <button
                  onClick={() => toggle(t)}
                  aria-label={`${t} 필터 해제`}
                  className="ml-0.5 hover:opacity-60"
                >
                  ×
                </button>
              </span>
            </span>
          ))}
          <button
            onClick={clearAll}
            className="ml-1 text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            전체 해제
          </button>
        </div>
      )}
    </div>
  );
}
