import type { GuideStep } from "@/types";

interface StartGuideProps {
  steps: GuideStep[];
}

export default function StartGuide({ steps }: StartGuideProps) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-7">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">
          →
        </div>
        <h2 className="text-xl font-bold text-ink tracking-tight">
          시작 가이드
        </h2>
      </div>

      <ol className="space-y-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;

          return (
            <li key={step.step} className="flex gap-4">
              {/* Step number + connector — 색 순환 없이 잉크색 원형으로 통일 */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-ink/10 my-2" />}
              </div>

              {/* Step card */}
              <div
                className={`card-soft flex-1 bg-bg-card rounded-2xl p-4 ${isLast ? "mb-0" : "mb-3"}`}
              >
                <h3 className="font-bold text-ink mb-1.5 text-sm md:text-base leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
