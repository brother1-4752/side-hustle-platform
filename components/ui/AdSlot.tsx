'use client'

type AdSize =
  | 'rectangle'
  | 'half-page'
  | 'leaderboard'
  | 'in-feed'
  | 'in-content'
  | 'mobile-banner'

interface AdSlotProps {
  size: AdSize
  slotId?: string
  className?: string
}

const SIZE_CONFIG: Record<AdSize, { minHeight: number; maxWidth: number; label: string }> = {
  rectangle:       { minHeight: 250, maxWidth: 300, label: '300×250' },
  'half-page':     { minHeight: 600, maxWidth: 300, label: '300×600' },
  leaderboard:     { minHeight: 90,  maxWidth: 728, label: '728×90'  },
  'in-feed':       { minHeight: 90,  maxWidth: 728, label: '728×90'  },
  'in-content':    { minHeight: 90,  maxWidth: 728, label: '728×90'  },
  'mobile-banner': { minHeight: 100, maxWidth: 320, label: '320×100' },
}

export default function AdSlot({ size, slotId = '', className = '' }: AdSlotProps) {
  const { minHeight, maxWidth, label } = SIZE_CONFIG[size]

  return (
    <div
      className={`w-full overflow-hidden rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center ${className}`}
      style={{ minHeight, maxWidth }}
      aria-label={`광고 영역 ${label}`}
      role="complementary"
    >
      {/* Placeholder: slotId가 채워지면 실제 AdSense ins 태그로 교체 */}
      {!slotId && (
        <span className="text-xs text-gray-300 select-none pointer-events-none">
          광고 {label}
        </span>
      )}
    </div>
  )
}
