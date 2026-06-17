import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  beginner: {
    label: "초급",
    color: "text-emerald-700",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200/60",
  },
  intermediate: {
    label: "중급",
    color: "text-amber-700",
    bg: "bg-amber-50/80",
    border: "border-amber-200/60",
  },
  advanced: {
    label: "고급",
    color: "text-red-700",
    bg: "bg-red-50/80",
    border: "border-red-200/60",
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
      {/* Row 1-left: 예상 월 수익 — hero, 2/3 on desktop */}
      <div className="col-span-2 md:col-span-2 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white rounded-2xl border border-emerald-100/80 shadow-[0_2px_16px_rgb(0,0,0,0.04)] p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-emerald-600/70 uppercase tracking-widest">
            예상 월 수익
          </p>
          <span className="text-lg" aria-hidden="true">
            💰
          </span>
        </div>
        <p className="text-3xl font-bold text-emerald-700 tracking-tight">
          {min}~{max}
          <span className="text-lg font-semibold ml-1 text-emerald-600">
            만원
          </span>
        </p>
        {incomeNote && (
          <p className="text-xs text-emerald-600/60 mt-2 leading-snug">
            {incomeNote}
          </p>
        )}
      </div>

      {/* Row 1-right: 하루 투입 시간 — new! 1/3 on desktop */}
      <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-white rounded-2xl border border-violet-200/60 shadow-[0_2px_16px_rgb(0,0,0,0.04)] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-violet-600/70 uppercase tracking-widest">
            하루 투입 시간
          </p>
          <span className="text-lg" aria-hidden="true">
            ⏳
          </span>
        </div>
        <div>
          <p className="text-xl font-bold text-violet-700 tracking-tight">
            {hustle.requiredHoursPerDay}
          </p>
          <p className="text-xs text-violet-500/70 mt-1.5 leading-snug">
            직장인 퇴근 후 가능
          </p>
        </div>
      </div>

      {/* Row 2: 난이도 */}
      <div
        className={`${diff.bg} rounded-2xl border ${diff.border} shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-2`}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            난이도
          </p>
          <span className="text-base" aria-hidden="true">
            📊
          </span>
        </div>
        <p className={`text-xl font-bold ${diff.color}`}>{diff.label}</p>
      </div>

      {/* Row 2: 초기 비용 */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            초기 비용
          </p>
          <span className="text-base" aria-hidden="true">
            💳
          </span>
        </div>
        <p className="text-xl font-bold text-gray-800">
          {amount === 0 ? "무자본" : `${amount}만원`}
        </p>
        {costNote && (
          <p className="text-xs text-gray-400 leading-snug">{costNote}</p>
        )}
      </div>

      {/* Row 2: 첫 수입까지 */}
      <div className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            첫 수입까지
          </p>
          <span className="text-base" aria-hidden="true">
            ⏱️
          </span>
        </div>
        <p className="text-lg font-bold text-gray-800">
          {hustle.timeToFirstIncome}
        </p>
        <p className="text-xs text-gray-400 leading-snug">
          {hustle.weeklyTimeRequired} 필요
        </p>
      </div>
    </div>
  );
}
