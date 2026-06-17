# SPRINT-002 PRD

> **Sprint**: SPRINT-002 | **시작일**: 2026-06-17 | **기반**: SPRINT-001 Iterate 결과
> **상태**: 🔨 Build 진행 중

---

## 1. 배경 및 목표

SPRINT-001 Validate 단계에서 유저 5명 테스트 결과, 핵심 KPI(CTR 100%, 체류 75.4초)는 달성했으나 두 가지 구조적 문제가 발견됨.

| Pain Point               | 근거                                                                  | 심각도    |
| ------------------------ | --------------------------------------------------------------------- | --------- |
| 하루 투입 시간 지표 누락 | 직장인 정정훈(User 5) 이탈 — "몇 시간을 부어야 이 돈이 나오는지 없다" | 🔴 High   |
| 단일 태그 필터의 한계    | 이민우(User 2) — "AI활용이면서 초기 비용 0인 것만 보고 싶다"          | 🟡 Medium |

**Sprint 002 핵심 가설**: 하루 투입 시간 지표와 다중 필터를 추가하면 직장인 페르소나의 이탈률이 감소한다.

---

## 2. 목표 및 성공 지표

| 항목          | 내용                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **목표**      | 직장인 페르소나 이탈 방지 + AdSense 승인 준비 완료 + 데이터 수집 자동화 기반 마련 |
| **핵심 가설** | `requiredHoursPerDay` 지표 추가 시 직장인 체류 시간 60초 → 90초 이상으로 개선     |
| **성공 기준** | Task 1~4 빌드 완료 + SSG 에러 0 + AdSense 승인 신청 가능 상태                     |

---

## 3. Feature List

### ✅ Task 1 — 하루 권장 투입 시간 스키마 및 UI 반영 (완료)

**근거**: SPRINT-001 Iterate 우선순위 1

- `types/index.ts`: `SideHustle` 인터페이스에 `requiredHoursPerDay: string` 필드 추가
- `data/side-hustles.json`: 30개 항목 전체에 부업 특성별 값 주입
  - `"30분 이하"` (크몽 전자책, 마플샵 등 패시브형)
  - `"1시간 이하"` (스톡·무재고 등 경량형)
  - `"1~2시간"` (SNS·번역·과외 등 직장인 가능)
  - `"2~3시간"` (AI SaaS·콘텐츠 대행 등 집중 작업형)
  - `"2~4시간"` (배달·워드프레스 등 고투입형)
- `MetricPanel.tsx`: 4메트릭 → 5메트릭 벤토 그리드 재설계
  - `grid-cols-2 md:grid-cols-3` 레이아웃
  - **하루 투입 시간** 카드 (violet 액센트) — 수익 히어로 카드 옆 배치

**커밋**: `f2dc4d2` | `feat: SPRINT-002 하루 권장 투입 시간 스키마 및 UI 반영`

---

### ✅ Task 2 — AdSense 승인용 법적 문서 페이지 신설 (완료)

**근거**: SPRINT-001 Scope Freeze에서 "AdSense 승인 신청 전 추가" 명시

- `app/privacy/page.tsx`: 개인정보처리방침 (8개 섹션)
  - Google AdSense DoubleClick 쿠키 안내
  - 맞춤형 광고 옵트아웃 링크 (`google.com/settings/ads`)
  - 브라우저별 쿠키 차단 방법 (Chrome·Safari·Firefox·Edge)
  - 개인정보 보호책임자 연락처
- `app/terms/page.tsx`: 이용약관 (9개 조항)
  - 제4조: 수익 정보는 참고용, 투자 책임은 이용자 본인
  - 제5조: 허용/금지 이용 2분할 카드
  - 목차 nav (앵커 링크)
- `components/layout/Footer.tsx`: 개인정보처리방침·이용약관 링크 추가
- `app/sitemap.ts`: `/privacy`, `/terms` 경로 추가

**커밋**: `2197adf` | `feat: SPRINT-002 애드센스 승인용 개인정보처리방침 및 이용약관 페이지 신설`

---

### ✅ Task 3 — 다중 태그 복합 필터링 기능 구현 (완료)

**근거**: SPRINT-001 Iterate 우선순위 3

- `TagFilterBar.tsx`: 단일 → 다중 선택 토글 구조 전환
  - URL 스키마: `/?tag=AI활용,이커머스` (comma-separated, URLSearchParams 인코딩)
  - 활성 필터 요약 행: `N개 필터 적용 중 — #태그1 AND #태그2 [×] 전체 해제`
  - 개별 태그 pill에 × 버튼으로 단건 해제
- `FilteredFeed.tsx`: AND 교차 필터 로직
  - `activeTags.every(t => h.tags.includes(t))` — 선택한 모든 태그 보유 항목만 통과
  - 다중 필터 결과 없음 시 힌트 메시지 ("태그를 하나씩 해제해보면...")
  - Suspense 격리 구조 유지 (`output: 'export'` SSG 호환)

**커밋**: `e38c4a7` | `feat: SPRINT-002 다중 태그 복합 필터링 기능 구현`

---

### ⬜ Task 4 — AI 자동 데이터 수집 파이프라인 기반 구축 (미시작)

**근거**: SPRINT-001 Iterate "시도해볼 것" — AI 에이전트 유튜브 자막 파싱

**목표**: 부업 데이터를 수동으로 JSON에 입력하는 방식 → AI 에이전트가 자동 수집·가공하도록 파이프라인 구축

**예상 구현 범위**:

- [ ] 데이터 수집 프롬프트 스펙 확정 (`requiredHoursPerDay` 포함 전체 필드)
- [ ] 수집 대상 정의 (유튜브 자막, 블로그 포스트, 커뮤니티 글 등)
- [ ] 파싱 스크립트 또는 Claude API 연동 워크플로우 설계
- [ ] 수집된 데이터 검증 및 `side-hustles.json` 자동 갱신 방식 결정
- [ ] 데이터 30개 → 50개 이상으로 확장

---

## 4. 기술 제약 사항

- `output: 'export'` SSG — 모든 신규 페이지는 정적 생성 가능해야 함
- `useSearchParams` 사용 시 반드시 `<Suspense>` 경계 내부에 위치
- 신규 데이터 필드 추가 시 `types/index.ts` 인터페이스 먼저 업데이트

---

## 5. 빌드 현황

| 시점           | 페이지 수 | lint | tsc | SSG |
| -------------- | --------- | ---- | --- | --- |
| Task 1 완료 후 | 36 pages  | 0    | 0   | ✅  |
| Task 2 완료 후 | 38 pages  | 0    | 0   | ✅  |
| Task 3 완료 후 | 38 pages  | 0    | 0   | ✅  |
| Task 4 완료 후 | 38+ pages | -    | -   | ⬜  |
