# SPRINT-002 BUILD LOG

> **Sprint**: SPRINT-002 | **상태**: 🔨 진행 중 (Task 3/4 완료)

---

## 진행 현황 요약

| Task   | 제목                                     | 상태      | 커밋      |
| ------ | ---------------------------------------- | --------- | --------- |
| Task 1 | 하루 권장 투입 시간 스키마 및 UI 반영    | ✅ 완료   | `f2dc4d2` |
| Task 2 | AdSense 승인용 법적 문서 페이지 신설     | ✅ 완료   | `2197adf` |
| Task 3 | 다중 태그 복합 필터링 기능 구현          | ✅ 완료   | `e38c4a7` |
| Task 4 | AI 자동 데이터 수집 파이프라인 기반 구축 | ⬜ 미시작 | —         |

---

## Task 1: 하루 권장 투입 시간 스키마 및 UI 반영 ✅

**날짜**: 2026-06-17 | **커밋**: `f2dc4d2`

### 변경 파일

| 파일                                | 변경 내용                                                              |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `types/index.ts`                    | `requiredHoursPerDay: string` 필드 추가 (weeklyTimeRequired 바로 다음) |
| `data/side-hustles.json`            | 30개 항목 전체에 `requiredHoursPerDay` 주입                            |
| `components/detail/MetricPanel.tsx` | 4메트릭 → 5메트릭 벤토 그리드 재설계                                   |

### MetricPanel 레이아웃 변경

```
[기존 — 2열 그리드]
┌─────────────────────────┐
│    예상 월 수익 (hero)   │  ← col-span-2
├────────────┬────────────┤
│   난이도   │  초기 비용  │
├─────────────────────────┤
│     첫 수입까지 (wide)   │  ← col-span-2
└─────────────────────────┘

[신규 — 2/3열 벤토 그리드]
┌──────────────┬──────────┐
│ 예상 월 수익  │ 하루투입  │  ← md:col-span-2 + col-span-1
├──────┬───────┴──────────┤
│난이도│ 초기 비용 │ 첫수입 │  ← 3등분
└──────┴──────────┴───────┘
```

### requiredHoursPerDay 값 매핑 기준

| 값             | 해당 부업 유형                                      |
| -------------- | --------------------------------------------------- |
| `"30분 이하"`  | 크몽 전자책, 마플샵 (초기 세팅 후 거의 자동)        |
| `"1시간 이하"` | 스톡 이미지, 노션 템플릿, 중고 판매 등              |
| `"1~2시간"`    | 블로그, SNS 관리, 과외, 번역 등 직장인 퇴근 후 가능 |
| `"2~3시간"`    | AI 콘텐츠 대행, ChatGPT SaaS, 스마트스토어          |
| `"2~4시간"`    | 배달 라이더, 워드프레스 제작 (집중 투입 필요)       |

---

## Task 2: AdSense 승인용 법적 문서 페이지 신설 ✅

**날짜**: 2026-06-17 | **커밋**: `2197adf`

### 변경 파일

| 파일                           | 변경 내용                                 |
| ------------------------------ | ----------------------------------------- |
| `app/privacy/page.tsx`         | 개인정보처리방침 신규 생성 (8개 섹션)     |
| `app/terms/page.tsx`           | 이용약관 신규 생성 (9개 조항)             |
| `components/layout/Footer.tsx` | 법적 문서 링크 2개 추가                   |
| `app/sitemap.ts`               | /privacy, /terms 경로 추가 (priority 0.3) |

### AdSense 승인 필수 요건 체크

- [x] 수집하는 개인정보 항목 및 수집 방법 (Vercel Analytics)
- [x] Google AdSense DoubleClick 쿠키 사용 명시
- [x] 맞춤형 광고 옵트아웃 링크
- [x] 브라우저별 쿠키 차단 방법 (4종)
- [x] 개인정보 보호책임자 이메일
- [x] 수익 정보 참고용 명시 (투자 책임은 이용자)
- [x] 콘텐츠 저작권 조항

### 빌드 결과

- 36 pages → **38 pages** (+`/privacy`, `/terms` 정적 생성)

---

## Task 3: 다중 태그 복합 필터링 기능 구현 ✅

**날짜**: 2026-06-17 | **커밋**: `e38c4a7`

### 변경 파일

| 파일                               | 변경 내용                  |
| ---------------------------------- | -------------------------- |
| `components/ui/TagFilterBar.tsx`   | 단일 → 다중 선택 토글 전환 |
| `components/home/FilteredFeed.tsx` | AND 교차 필터 로직 적용    |

### URL 스키마 설계 결정

```
[기존] /?tag=AI활용          (단일, string | null)
[신규] /?tag=AI활용,이커머스   (다중, comma-separated)
```

`URLSearchParams.set("tag", tags.join(","))` 방식으로 한글 자동 인코딩.
`searchParams.get("tag")` → 자동 디코딩 → `.split(",")` 파싱.

### 필터 로직

```ts
// AND 교차: 선택한 모든 태그를 보유한 항목만 통과
const filtered =
  activeTags.length > 0
    ? hustles.filter((h) => activeTags.every((t) => h.tags.includes(t)))
    : hustles;
```

### UI 추가 사항

- 활성 필터 요약 행: `N개 필터 적용 중 — #태그1 AND #태그2`
- 각 태그 pill에 `×` 버튼 (개별 해제)
- 전체 해제 버튼
- 결과 0건 시 다중 필터 힌트 메시지

---

## Task 4: AI 자동 데이터 수집 파이프라인 기반 구축 ⬜

**상태**: 미시작

### 배경

현재 `data/side-hustles.json` (30개 항목)은 전부 수동 입력. SPRINT-001 Iterate에서 "AI 에이전트 자동 데이터 수집 파이프라인"을 다음 시도 항목으로 지정.

### 예상 구현 방향

```
[수집 타겟]
유튜브 자막 → Claude API 파싱 → JSON 스키마 변환 → side-hustles.json 갱신

[필드 추출 대상]
title, summary, difficulty, expectedMonthlyIncome,
initialCost, timeToFirstIncome, weeklyTimeRequired,
requiredHoursPerDay, overview, startGuide (steps)
```

### 작업 예정 항목

- [ ] 데이터 수집 프롬프트 스펙 작성 (모든 JSON 필드 추출 가이드)
- [ ] 수집 대상 소스 확정 (유튜브 영상 URL 목록 또는 블로그 URL)
- [ ] Claude API 활용 파싱 스크립트 작성 (`scripts/collect.ts` 또는 `collect.mjs`)
- [ ] 수집 결과 검증 로직 (필수 필드 누락 체크)
- [ ] 데이터 30개 → 50개 이상으로 확장
- [ ] 빌드 검증 (`npm run build`)

---

## 🐛 이슈 로그

| #   | 이슈                                                                  | 심각도 | 해결 방법                       | 상태 |
| --- | --------------------------------------------------------------------- | ------ | ------------------------------- | ---- |
| 1   | HustleCard가 Server Component라 `track()` 사용 불가 (SPRINT-001 잔류) | 🟡     | `'use client'` 추가             | ✅   |
| 2   | `useSearchParams` 다중 태그 파싱 시 한글 인코딩                       | 🟢     | URLSearchParams.set() 자동 처리 | ✅   |
