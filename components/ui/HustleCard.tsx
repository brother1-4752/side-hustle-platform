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

// 카테고리 문자열 → 절제된 톤의 상단 스트라이프 색 순환 배정 (하드코딩 매핑 없이 해시로 결정)
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
      className="card-soft group relative block bg-bg-card rounded-2xl overflow-hidden"
    >
      {/* 카테고리 스트라이프 */}
      <div className={`h-1 ${stripeColor(hustle.category)}`} />

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
          className={`chip-soft absolute top-4 left-3 z-10 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
            compare.checked
              ? "bg-primary border-primary text-white"
              : "bg-white border-gray-300 text-transparent hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed"
          }`}
        >
          ✓
        </button>
      )}
      <div className="p-5">
        {/* Icon + Status badges */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="w-12 h-12 flex items-center justify-center text-2xl bg-bg-sidebar rounded-xl"
            aria-hidden="true"
          >
            {hustle.icon}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {hustle.isTrending && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary text-white font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                뜨는 중
              </span>
            )}
            {hustle.isPopular && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent-lime/15 text-accent-lime font-semibold">
                ★ 인기
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold ${badge.chip}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-ink mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1 tracking-tight">
          {hustle.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {hustle.summary}
        </p>

        {/* Income block — 다크 블록 + 그린 숫자 */}
        <div className="flex items-center justify-between mb-4 px-3.5 py-2.5 rounded-xl bg-ink text-white">
          <span className="text-xs font-medium text-white/60">
            예상 월 수익
          </span>
          <span className="text-sm font-bold text-accent-lime">
            {min}~{max}만원
          </span>
        </div>

        {/* Feature + topic tags */}
        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold"
            >
              {f}
            </span>
          ))}
          {restTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
