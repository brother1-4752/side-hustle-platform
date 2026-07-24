export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface MonthlyIncome {
  min: number;
  max: number;
  note?: string;
}

export interface InitialCost {
  amount: number;
  note?: string;
}

export interface GuideStep {
  step: number;
  title: string;
  description: string;
}

export interface SideHustle {
  id: string;
  slug: string;
  icon: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  expectedMonthlyIncome: MonthlyIncome;
  initialCost: InitialCost;
  timeToFirstIncome: string;
  weeklyTimeRequired: string;
  requiredHoursPerDay: string;
  category: string;
  tags: string[];
  isTrending: boolean;
  isPopular: boolean;
  trendScore: number;
  overview: string;
  startGuide: GuideStep[];
  relatedTags: string[];
  lastUpdated: string;
  dataVersion: string;
  /** 흔한 실패 요인·주의사항 3~5개 (수동 큐레이션 항목은 없음) */
  pitfalls?: string[];
  /** AI 마이닝 파이프라인 출처 (수동 큐레이션 항목은 없음) */
  sourceUrl?: string;
  /** AI 마이닝 결과의 검수 상태. 없으면 수동 큐레이션(이미 신뢰됨)으로 간주 */
  reviewStatus?: "pending" | "approved";
}
