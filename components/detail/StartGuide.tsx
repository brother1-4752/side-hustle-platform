import type { GuideStep } from "@/types";

const STEP_GRADIENTS = [
  "from-violet-500 to-indigo-500 shadow-[0_2px_8px_rgba(99,102,241,0.35)]",
  "from-indigo-500 to-blue-500 shadow-[0_2px_8px_rgba(59,130,246,0.35)]",
  "from-blue-500 to-cyan-500 shadow-[0_2px_8px_rgba(6,182,212,0.35)]",
  "from-cyan-500 to-teal-500 shadow-[0_2px_8px_rgba(20,184,166,0.35)]",
  "from-teal-500 to-emerald-500 shadow-[0_2px_8px_rgba(52,211,153,0.35)]",
];

interface StartGuideProps {
  steps: GuideStep[];
}

export default function StartGuide({ steps }: StartGuideProps) {
  return (
    <section>
      <div className="flex items-center gap-2.5 mb-7">
        <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-sm font-bold shadow-[0_2px_8px_rgba(99,102,241,0.3)]">
          →
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          시작 가이드
        </h2>
      </div>

      <ol className="space-y-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const gradient = STEP_GRADIENTS[idx % STEP_GRADIENTS.length];

          return (
            <li key={step.step} className="flex gap-4">
              {/* Step number + connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {step.step}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-gradient-to-b from-indigo-200 to-transparent my-2" />
                )}
              </div>

              {/* Step card */}
              <div
                className={`flex-1 bg-white/70 backdrop-blur-sm rounded-2xl border border-black/[0.04] shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:border-black/[0.07] transition-all duration-200 p-4 ${isLast ? "mb-0" : "mb-3"}`}
              >
                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm md:text-base leading-snug">
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
