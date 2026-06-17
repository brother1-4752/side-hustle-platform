'use client'

import { useSearchParams, useRouter } from 'next/navigation'

interface TagFilterBarProps {
  tags: string[]
}

export default function TagFilterBar({ tags }: TagFilterBarProps) {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const activeTag    = searchParams.get('tag')

  const handleClick = (tag: string) => {
    const next = activeTag === tag
      ? '/'
      : `/?tag=${encodeURIComponent(tag)}`
    router.push(next, { scroll: false })
  }

  const btnBase    = 'text-sm px-4 py-1.5 rounded-full border transition-colors whitespace-nowrap'
  const btnActive  = 'bg-primary text-white border-primary'
  const btnDefault = 'bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary'

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="태그 필터"
    >
      {/* 전체 버튼 */}
      <button
        onClick={() => router.push('/', { scroll: false })}
        className={`${btnBase} ${!activeTag ? btnActive : btnDefault}`}
        aria-pressed={!activeTag}
      >
        전체
      </button>

      {/* 태그별 버튼 */}
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={`${btnBase} ${activeTag === tag ? btnActive : btnDefault}`}
          aria-pressed={activeTag === tag}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}
