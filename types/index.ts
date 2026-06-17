export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface MonthlyIncome {
  min: number
  max: number
  note?: string
}

export interface InitialCost {
  amount: number
  note?: string
}

export interface GuideStep {
  step: number
  title: string
  description: string
}

export interface SideHustle {
  id: string
  slug: string
  icon: string
  title: string
  summary: string
  difficulty: Difficulty
  expectedMonthlyIncome: MonthlyIncome
  initialCost: InitialCost
  timeToFirstIncome: string
  weeklyTimeRequired: string
  category: string
  tags: string[]
  isTrending: boolean
  isPopular: boolean
  trendScore: number
  overview: string
  startGuide: GuideStep[]
  relatedTags: string[]
  lastUpdated: string
  dataVersion: string
}
