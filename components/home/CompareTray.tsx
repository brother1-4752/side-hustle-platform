"use client";

import { useState } from "react";
import Link from "next/link";
import type { SideHustle } from "@/types";
import { DIFFICULTY_CONFIG } from "@/components/ui/HustleCard";

interface CompareTrayProps {
  hustles: SideHustle[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}

const ROWS: [string, (h: SideHustle) => string][] = [
  ["카테고리", (h) => h.category],
  ["난이도", (h) => DIFFICULTY_CONFIG[h.difficulty].label],
  [
    "예상 월 수익",
    (h) => `${h.expectedMonthlyIncome.min}~${h.expectedMonthlyIncome.max}만원`,
  ],
  [
    "초기 비용",
    (h) =>
      h.initialCost.amount === 0 ? "무자본" : `${h.initialCost.amount}만원`,
  ],
  ["첫 수입까지", (h) => h.timeToFirstIncome],
  ["하루 투입 시간", (h) => h.requiredHoursPerDay],
];

export default function CompareTray({
  hustles,
  onRemove,
  onClear,
}: CompareTrayProps) {
  const [open, setOpen] = useState(false);

  if (hustles.length === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {open && (
        <div className="bg-white border-t border-gray-200 shadow-[0_-8px_24px_rgba(20,20,20,0.06)] max-h-[70vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-gray-400 font-semibold uppercase pb-3 pr-4 w-28">
                      항목
                    </th>
                    {hustles.map((h) => (
                      <th
                        key={h.slug}
                        className="text-left pb-3 pr-4 min-w-[160px]"
                      >
                        <Link
                          href={`/side-hustle/${h.slug}`}
                          className="font-bold text-ink hover:text-primary transition-colors"
                        >
                          {h.icon} {h.title}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([label, getValue]) => (
                    <tr key={label} className="border-t border-gray-100">
                      <td className="text-xs font-semibold text-gray-400 py-3 pr-4 align-top">
                        {label}
                      </td>
                      {hustles.map((h) => (
                        <td
                          key={h.slug}
                          className="py-3 pr-4 text-gray-700 align-top font-medium"
                        >
                          {getValue(h)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="bg-ink text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 overflow-x-auto">
            {hustles.map((h) => (
              <span
                key={h.slug}
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs bg-white/10 rounded-full pl-3 pr-1.5 py-1 font-semibold"
              >
                {h.icon} {h.title}
                <button
                  type="button"
                  aria-label={`${h.title} 비교에서 빼기`}
                  onClick={() => onRemove(h.slug)}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-gray-400 hover:text-white underline underline-offset-2"
            >
              전체 해제
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              disabled={hustles.length < 2}
              className="chip-soft text-sm font-bold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {open ? "비교표 닫기" : `${hustles.length}개 비교하기`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
