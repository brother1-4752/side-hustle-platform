import AdSlot from '@/components/ui/AdSlot'

const POPULAR_TAGS = [
  '무자본', 'AI활용', '재택', '스마트스토어',
  '블로그', '영상편집', '제휴마케팅', '프리랜서',
]

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col w-72 xl:w-80 flex-shrink-0 gap-5">
      <div className="sticky top-20 flex flex-col gap-5">
        {/* AdSlot — rectangle (300×250) */}
        <AdSlot size="rectangle" slotId="" />

        {/* 인기 태그 */}
        <div className="bg-bg-sidebar rounded-card p-4">
          <h3 className="text-sm font-bold text-gray-700 mb-3">인기 태그</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map((tag) => (
              <a
                key={tag}
                href={`/?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>

        {/* AdSlot — half-page (300×600) */}
        <AdSlot size="half-page" slotId="" />
      </div>
    </aside>
  )
}
