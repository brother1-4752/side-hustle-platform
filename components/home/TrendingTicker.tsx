import type { SideHustle } from "@/types";

interface TrendingTickerProps {
  hustles: SideHustle[];
}

/** 홈 상단 가로 스크롤 티커 — 순수 CSS 애니메이션, 별도 의존성 없음 */
export default function TrendingTicker({ hustles }: TrendingTickerProps) {
  const items = hustles
    .filter((h) => h.isTrending)
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 8);

  if (items.length === 0) return null;

  const strip = (
    <>
      {items.map((h) => (
        <span key={h.slug} className="inline-flex items-center gap-2 px-6">
          <span aria-hidden="true">{h.icon}</span>
          <span className="font-bold">{h.title}</span>
          <span className="text-success font-bold">
            {h.expectedMonthlyIncome.min}~{h.expectedMonthlyIncome.max}만원
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="bg-ink text-white overflow-hidden whitespace-nowrap py-2.5 mb-8">
      <div className="animate-marquee inline-flex w-max" aria-hidden="true">
        {strip}
        {strip}
      </div>
      <span className="sr-only">
        지금 뜨는 부업: {items.map((h) => h.title).join(", ")}
      </span>
    </div>
  );
}
