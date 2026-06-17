import type { SideHustle } from '@/types'

const DIFFICULTY_BADGE: Record<string, { label: string; className: string }> = {
  beginner:     { label: '초급', className: 'bg-green-100 text-green-800' },
  intermediate: { label: '중급', className: 'bg-yellow-100 text-yellow-800' },
  advanced:     { label: '고급', className: 'bg-red-100 text-red-800' },
}

interface DetailHeaderProps {
  hustle: SideHustle
}

export default function DetailHeader({ hustle }: DetailHeaderProps) {
  const badge = DIFFICULTY_BADGE[hustle.difficulty]

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <span className="text-4xl leading-none" aria-hidden="true">
          {hustle.icon}
        </span>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${badge.className}`}>
          {badge.label}
        </span>
        {hustle.isTrending && (
          <span className="text-sm px-3 py-1 rounded-full bg-rose-50 text-rose-500 font-medium">
            🔥 뜨는 중
          </span>
        )}
        {hustle.isPopular && (
          <span className="text-sm px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">
            💡 인기
          </span>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {hustle.title}
      </h1>

      <p className="text-base text-gray-500 leading-relaxed max-w-2xl">
        {hustle.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {hustle.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
