import type { GuideStep } from '@/types'

interface StartGuideProps {
  steps: GuideStep[]
}

export default function StartGuide({ steps }: StartGuideProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-6">🚀 시작 가이드</h2>
      <ol className="space-y-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1
          return (
            <li key={step.step} className="flex gap-4">
              {/* 번호 배지 + 연결선 */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {step.step}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-gray-100 my-1" />
                )}
              </div>

              {/* 카드 */}
              <div className={`flex-1 bg-white rounded-xl border border-gray-100 shadow-card p-4 ${isLast ? 'mb-0' : 'mb-4'}`}>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
