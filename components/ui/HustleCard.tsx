"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import type { SideHustle } from "@/types";

export const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; chip: string; dot: string }
> = {
  beginner: {
    label: "초급",
    chip: "bg-badge-beginnerBg text-badge-beginnerText",
    dot: "bg-emerald-500",
  },
  intermediate: {
    label: "중급",
    chip: "bg-badge-intermediateBg text-badge-intermediateText",
    dot: "bg-amber-500",
  },
  advanced: {
    label: "고급",
    chip: "bg-badge-advancedBg text-badge-advancedText",
    dot: "bg-red-500",
  },
};

const FEATURE_TAGS = new Set(["무자본", "재택", "AI활용", "프리랜서"]);

// 카테고리 문자열 → 강렬한 스트라이프 색 순환 배정 (하드코딩 매핑 없이 해시로 결정)
const STRIPE_COLORS = [
  "bg-accent",
  "bg-primary",
  "bg-accent-lime",
  "bg-amber-400",
  "bg-emerald-400",
];
function stripeColor(category: string): string {
  const hash = Array.from(category).reduce((h, c) => h + c.charCodeAt(0), 0);
  return STRIPE_COLORS[hash % STRIPE_COLORS.length];
}

interface HustleCardProps {
  hustle: SideHustle;
  compare?: {
    checked: boolean;
    disabled?: boolean;
    onToggle: (slug: string) => void;
  };
}

export default function HustleCard({ hustle, compare }: HustleCardProps) {
  const badge = DIFFICULTY_CONFIG[hustle.difficulty];
  const features = hustle.tags.filter((t) => FEATURE_TAGS.has(t)).slice(0, 2);
  const restTags = hustle.tags.filter((t) => !FEATURE_TAGS.has(t)).slice(0, 3);
  const { min, max } = hustle.expectedMonthlyIncome;

  return (
    <Link
      href={`/side-hustle/${hustle.slug}`}
      onClick={() =>
        track("hustle_card_click", { slug: hustle.slug, title: hustle.title })
      }
      className="card-brutal group relative block bg-bg-card rounded-xl overflow-hidden"
    >
      {/* 카테고리 스트라이프 */}
      <div className={`h-1.5 ${stripeColor(hustle.category)}`} />

      {compare && (
        <button
          type="button"
          aria-label={
            compare.checked ? "비교 목록에서 빼기" : "비교 목록에 담기"
          }
          aria-pressed={compare.checked}
          disabled={compare.disabled}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            compare.onToggle(hustle.slug);
          }}
          className={`chip-brutal absolute top-4 left-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black transition-colors ${
            compare.checked
              ? "bg-primary text-white"
              : "bg-bg-card text-transparent hover:text-ink/20 disabled:opacity-30 disabled:cursor-not-allowed"
          }`}
        >
          ✓
        </button>
      )}
      <div className="p-5">
        {/* Icon(스티커) + Status badges */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="chip-brutal w-12 h-12 flex items-center justify-center text-2xl bg-bg-sidebar rounded-xl -rotate-3 group-hover:rotate-3 transition-transform duration-300"
            aria-hidden="true"
          >
            {hustle.icon}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {hustle.isTrending && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary text-white font-bold border-2 border-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                뜨는 중
              </span>
            )}
            {hustle.isPopular && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent-lime text-ink font-bold border-2 border-ink">
                ★ 인기
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold border-2 border-ink ${badge.chip}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-ink mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1 tracking-tight">
          {hustle.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {hustle.summary}
        </p>

        {/* Income block — 파스텔 대신 솔리드 컬러 블록 */}
        <div className="flex items-center justify-between mb-4 px-3.5 py-2.5 rounded-lg bg-ink text-white">
          <span className="text-xs font-medium text-white/70">
            예상 월 수익
          </span>
          <span className="text-sm font-black text-accent-lime">
            {min}~{max}만원
          </span>
        </div>

        {/* Feature + topic tags */}
        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-bold"
            >
              {f}
            </span>
          ))}
          {restTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
