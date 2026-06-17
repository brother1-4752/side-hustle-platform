import Link from 'next/link'
import type { SideHustle } from '@/types'

const DIFFICULTY_BADGE: Record<string, { label: string; className: string }> = {
  beginner:     { label: '초급', className: 'bg-green-100 text-green-800' },
  intermediate: { label: '중급', className: 'bg-yellow-100 text-yellow-800' },
  advanced:     { label: '고급', className: 'bg-red-100 text-red-800'    },
}

const FEATURE_TAGS = new Set(['무자본', '재택', 'AI활용', '프리랜서'])

interface HustleCardProps {
  hustle: SideHustle
}

export default function HustleCard({ hustle }: HustleCardProps) {
  const badge   = DIFFICULTY_BADGE[hustle.difficulty]
  const features = hustle.tags.filter((t) => FEATURE_TAGS.has(t)).slice(0, 2)
  const { min, max } = hustle.expectedMonthlyIncome

  return (
    <Link
      href={`/side-hustle/${hustle.slug}`}
      className="group block bg-white rounded-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200"
    >
      <div className="p-5">
        {/* ① 아이콘 + 배지 행 */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-2xl leading-none" aria-hidden="true">
            {hustle.icon}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${badge.className}`}>
            {badge.label}
          </span>
          {features.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary-light text-rose-600 font-medium"
            >
              {f}
            </span>
          ))}
        </div>

        {/* ② 제목 */}
        <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
          {hustle.title}
        </h3>

        {/* ③ 1줄 요약 */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
          {hustle.summary}
        </p>

        {/* ④ 예상 월 수익 */}
        <p className="text-sm font-semibold text-emerald-600 mb-3">
          💰 월 {min}만 ~ {max}만원
        </p>

        {/* ⑤ 태그 칩 */}
        <div className="flex flex-wrap gap-1.5">
          {hustle.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
