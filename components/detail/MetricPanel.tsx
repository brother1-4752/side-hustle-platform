import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  beginner: {
    label: "초급",
    bg: "bg-badge-beginnerBg",
    text: "text-badge-beginnerText",
  },
  intermediate: {
    label: "중급",
    bg: "bg-badge-intermediateBg",
    text: "text-badge-intermediateText",
  },
  advanced: {
    label: "고급",
    bg: "bg-badge-advancedBg",
    text: "text-badge-advancedText",
  },
};

interface MetricPanelProps {
  hustle: SideHustle;
}

export default function MetricPanel({ hustle }: MetricPanelProps) {
  const diff = DIFFICULTY_CONFIG[hustle.difficulty];
  const { min, max, note: incomeNote } = hustle.expectedMonthlyIncome;
  const { amount, note: costNote } = hustle.initialCost;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
      {/* Row 1-left: 예상 월 수익 — hero, 다크 블록 + 그린 숫자 */}
      <div className="card-soft col-span-2 md:col-span-2 bg-ink rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
            예상 월 수익
          </p>
          <span className="text-lg" aria-hidden="true">
            💰
          </span>
        </div>
        <p className="text-3xl font-bold text-accent-lime tracking-tight">
          {min}~{max}
          <span className="text-lg font-semibold ml-1 text-accent-lime/80">
            만원
          </span>
        </p>
        {incomeNote && (
          <p className="text-xs text-white/40 mt-2 leading-snug">
            {incomeNote}
          </p>
        )}
      </div>

      {/* Row 1-right: 하루 투입 시간 — 코발트 블루 블록 */}
      <div className="card-soft col-span-2 md:col-span-1 bg-accent rounded-2xl p-5 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest">
            하루 투입 시간
          </p>
          <span className="text-lg" aria-hidden="true">
            ⏳
          </span>
        </div>
        <div>
          <p className="text-xl font-bold tracking-tight">
            {hustle.requiredHoursPerDay}
          </p>
          <p className="text-xs text-white/70 mt-1.5 leading-snug">
            직장인 퇴근 후 가능
          </p>
        </div>
      </div>

      {/* Row 2: 난이도 */}
      <div
        className={`card-soft ${diff.bg} rounded-2xl p-5 flex flex-col gap-2`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            난이도
          </p>
          <span className="text-base" aria-hidden="true">
            📊
          </span>
        </div>
        <p className={`text-xl font-bold ${diff.text}`}>{diff.label}</p>
      </div>

      {/* Row 2: 초기 비용 */}
      <div className="card-soft bg-bg-card rounded-2xl p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            초기 비용
          </p>
          <span className="text-base" aria-hidden="true">
            💳
          </span>
        </div>
        <p className="text-xl font-bold text-ink">
          {amount === 0 ? "무자본" : `${amount}만원`}
        </p>
        {costNote && (
          <p className="text-xs text-gray-500 leading-snug">{costNote}</p>
        )}
      </div>

      {/* Row 2: 첫 수입까지 */}
      <div className="card-soft col-span-2 md:col-span-1 bg-bg-card rounded-2xl p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            첫 수입까지
          </p>
          <span className="text-base" aria-hidden="true">
            ⏱️
          </span>
        </div>
        <p className="text-lg font-bold text-ink">{hustle.timeToFirstIncome}</p>
        <p className="text-xs text-gray-500 leading-snug">
          {hustle.weeklyTimeRequired} 필요
        </p>
      </div>
    </div>
  );
}
