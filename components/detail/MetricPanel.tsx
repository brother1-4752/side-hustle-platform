import type { SideHustle } from '@/types'

const DIFFICULTY_LABEL: Record<string, { label: string; color: string }> = {
  beginner:     { label: '초급', color: 'text-emerald-600' },
  intermediate: { label: '중급', color: 'text-amber-600'  },
  advanced:     { label: '고급', color: 'text-red-500'    },
}

interface MetricCardProps {
  emoji: string
  label: string
  value: string
  sub?: string
  valueClassName?: string
}

function MetricCard({ emoji, label, value, sub, valueClassName = 'text-gray-900' }: MetricCardProps) {
  return (
    <div className="bg-bg-sidebar rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none">{emoji}</span>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      </div>
      <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 leading-snug">{sub}</p>}
    </div>
  )
}

interface MetricPanelProps {
  hustle: SideHustle
}

export default function MetricPanel({ hustle }: MetricPanelProps) {
  const diff = DIFFICULTY_LABEL[hustle.difficulty]
  const { min, max, note: incomeNote } = hustle.expectedMonthlyIncome
  const { amount, note: costNote } = hustle.initialCost

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      <MetricCard
        emoji="📊"
        label="난이도"
        value={diff.label}
        valueClassName={diff.color}
      />
      <MetricCard
        emoji="💰"
        label="예상 월 수익"
        value={`${min}~${max}만원`}
        sub={incomeNote}
        valueClassName="text-emerald-600"
      />
      <MetricCard
        emoji="💳"
        label="초기 비용"
        value={amount === 0 ? '무자본' : `${amount}만원`}
        sub={costNote}
      />
      <MetricCard
        emoji="⏱️"
        label="첫 수입까지"
        value={hustle.timeToFirstIncome}
        sub={`${hustle.weeklyTimeRequired} 필요`}
      />
    </div>
  )
}
