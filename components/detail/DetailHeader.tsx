import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<string, { label: string; chip: string }> = {
  beginner: {
    label: "초급",
    chip: "bg-badge-beginnerBg text-badge-beginnerText",
  },
  intermediate: {
    label: "중급",
    chip: "bg-badge-intermediateBg text-badge-intermediateText",
  },
  advanced: {
    label: "고급",
    chip: "bg-badge-advancedBg text-badge-advancedText",
  },
};

interface DetailHeaderProps {
  hustle: SideHustle;
}

export default function DetailHeader({ hustle }: DetailHeaderProps) {
  const diff = DIFFICULTY_CONFIG[hustle.difficulty];

  return (
    <div className="mb-10">
      {/* Icon(스티커) + Badges */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <div className="chip-brutal w-16 h-16 flex items-center justify-center text-3xl bg-bg-sidebar rounded-2xl -rotate-2">
          {hustle.icon}
        </div>

        <span
          className={`inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full font-bold border-2 border-ink ${diff.chip}`}
        >
          {diff.label}
        </span>

        {hustle.isTrending && (
          <span className="inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full bg-primary text-white font-bold border-2 border-ink">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            뜨는 중
          </span>
        )}

        {hustle.isPopular && (
          <span className="inline-flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-full bg-accent-lime text-ink font-bold border-2 border-ink">
            ★ 인기
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-[2.25rem] font-black text-ink mb-3 leading-tight tracking-tight">
        {hustle.title}
      </h1>

      {/* Summary */}
      <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
        {hustle.summary}
      </p>

      {/* Tag chips */}
      <div className="flex flex-wrap gap-2 mt-5">
        {hustle.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-white text-gray-600 border-2 border-ink/15 hover:border-primary hover:text-primary transition-colors duration-150 cursor-default"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
