import Link from "next/link";
import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; chip: string; dot: string }
> = {
  beginner: {
    label: "초급",
    chip: "bg-emerald-50 text-emerald-700 border border-emerald-200/70",
    dot: "bg-emerald-400",
  },
  intermediate: {
    label: "중급",
    chip: "bg-amber-50 text-amber-700 border border-amber-200/70",
    dot: "bg-amber-400",
  },
  advanced: {
    label: "고급",
    chip: "bg-red-50 text-red-700 border border-red-200/70",
    dot: "bg-red-400",
  },
};

const FEATURE_TAGS = new Set(["무자본", "재택", "AI활용", "프리랜서"]);

interface HustleCardProps {
  hustle: SideHustle;
}

export default function HustleCard({ hustle }: HustleCardProps) {
  const badge = DIFFICULTY_CONFIG[hustle.difficulty];
  const features = hustle.tags.filter((t) => FEATURE_TAGS.has(t)).slice(0, 2);
  const restTags = hustle.tags.filter((t) => !FEATURE_TAGS.has(t)).slice(0, 3);
  const { min, max } = hustle.expectedMonthlyIncome;

  return (
    <Link
      href={`/side-hustle/${hustle.slug}`}
      className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.10)] hover:-translate-y-1.5 hover:border-black/[0.08] transition-all duration-300 ease-out"
    >
      <div className="p-5">
        {/* Icon + Status badges */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-50 rounded-xl border border-black/[0.04] group-hover:scale-105 transition-transform duration-300"
            aria-hidden="true"
          >
            {hustle.icon}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {hustle.isTrending && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200/70 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                뜨는 중
              </span>
            )}
            {hustle.isPopular && (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/70 font-medium">
                <span className="text-amber-400 text-[10px]">★</span>
                인기
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${badge.chip}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1 tracking-tight">
          {hustle.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {hustle.summary}
        </p>

        {/* Income pill */}
        <div className="flex items-center justify-between mb-4 px-3.5 py-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80">
          <span className="text-xs font-medium text-emerald-600/70">
            예상 월 수익
          </span>
          <span className="text-sm font-bold text-emerald-700">
            {min}~{max}만원
          </span>
        </div>

        {/* Feature + topic tags */}
        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/60 font-medium"
            >
              {f}
            </span>
          ))}
          {restTags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-400 border border-gray-200/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
