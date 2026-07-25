import type { SideHustle } from "@/types";

const DIFFICULTY_CONFIG: Record<string, { label: string; dot: string }> = {
  beginner: { label: "초급", dot: "bg-success" },
  intermediate: { label: "중급", dot: "bg-amber-500" },
  advanced: { label: "고급", dot: "bg-red-500" },
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
      {/* Row 1-left: 예상 월 수익 — hero, 유일한 다크 블록 */}
      <div className="card-soft col-span-2 md:col-span-2 bg-ink rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest">
            예상 월 수익
          </p>
          <span className="text-lg" aria-hidden="true">
            💰
          </span>
        </div>
        <p className="text-3xl font-bold text-success tracking-tight">
          {min}~{max}
          <span className="text-lg font-semibold ml-1 text-success/80">
            만원
          </span>
        </p>
        {incomeNote && (
          <p className="text-xs text-white/40 mt-2 leading-snug">
            {incomeNote}
          </p>
        )}
      </div>

      {/* Row 1-right: 하루 투입 시간 */}
      <div className="card-soft col-span-2 md:col-span-1 bg-bg-card rounded-2xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            하루 투입 시간
          </p>
          <span className="text-lg" aria-hidden="true">
            ⏳
          </span>
        </div>
        <div>
          <p className="text-xl font-bold text-ink tracking-tight">
            {hustle.requiredHoursPerDay}
          </p>
          <p className="text-xs text-gray-500 mt-1.5 leading-snug">
            직장인 퇴근 후 가능
          </p>
        </div>
      </div>

      {/* Row 2: 난이도 */}
      <div className="card-soft bg-bg-card rounded-2xl p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            난이도
          </p>
          <span className="text-base" aria-hidden="true">
            📊
          </span>
        </div>
        <p className="text-xl font-bold text-ink flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
          {diff.label}
        </p>
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
