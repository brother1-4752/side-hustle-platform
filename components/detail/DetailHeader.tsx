import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; chip: string; dot: string; glow: string }
> = {
  beginner: {
    label: "초급",
    chip: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_0_3px_rgba(52,211,153,0.15)]",
  },
  intermediate: {
    label: "중급",
    chip: "bg-amber-50 text-amber-700 border border-amber-200/80",
    dot: "bg-amber-400",
    glow: "shadow-[0_0_0_3px_rgba(251,191,36,0.15)]",
  },
  advanced: {
    label: "고급",
    chip: "bg-red-50 text-red-700 border border-red-200/80",
    dot: "bg-red-400",
    glow: "shadow-[0_0_0_3px_rgba(248,113,113,0.15)]",
  },
};

interface DetailHeaderProps {
  hustle: SideHustle;
}

export default function DetailHeader({ hustle }: DetailHeaderProps) {
  const diff = DIFFICULTY_CONFIG[hustle.difficulty];

  return (
    <div className="mb-10">
      {/* Icon + Badges */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <div className="w-14 h-14 flex items-center justify-center text-3xl bg-white rounded-2xl border border-black/[0.06] shadow-[0_2px_12px_rgb(0,0,0,0.05)]">
          {hustle.icon}
        </div>

        <span
          className={`inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full font-semibold ${diff.chip} ${diff.glow}`}
        >
          <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
          {diff.label}
        </span>

        {hustle.isTrending && (
          <span className="inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80 font-semibold shadow-[0_0_0_3px_rgba(244,63,94,0.10)]">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            뜨는 중
          </span>
        )}

        {hustle.isPopular && (
          <span className="inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/80 font-semibold shadow-[0_0_0_3px_rgba(251,191,36,0.10)]">
            <span className="text-amber-400 text-xs leading-none">★</span>
            인기
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-[2rem] font-bold text-gray-900 mb-3 leading-tight tracking-tight">
        {hustle.title}
      </h1>

      {/* Summary */}
      <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
        {hustle.summary}
      </p>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2 mt-5">
        {hustle.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-200/80 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-150 cursor-default"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
