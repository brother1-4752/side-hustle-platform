# SPRINT-002 BUILD LOG

> **Sprint**: SPRINT-002 | **상태**: ✅ Build 완료 (Task 4/4 완료)

---

## 진행 현황 요약

| Task   | 제목                                     | 상태    | 커밋      |
| ------ | ---------------------------------------- | ------- | --------- |
| Task 1 | 하루 권장 투입 시간 스키마 및 UI 반영    | ✅ 완료 | `f2dc4d2` |
| Task 2 | AdSense 승인용 법적 문서 페이지 신설     | ✅ 완료 | `2197adf` |
| Task 3 | 다중 태그 복합 필터링 기능 구현          | ✅ 완료 | `e38c4a7` |
| Task 4 | AI 자동 데이터 수집 파이프라인 기반 구축 | ✅ 완료 | `152727b` |

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

## Task 4: AI 자동 데이터 수집 파이프라인 기반 구축 ✅

**날짜**: 2026-06-17 | **커밋**: `152727b`

### 변경 파일

| 파일                     | 변경 내용                                                    |
| ------------------------ | ------------------------------------------------------------ |
| `scripts/mine-hustle.ts` | 3단계 AI 마이닝 파이프라인 스크립트 신규 작성                |
| `package.json`           | `"mine"` npm 스크립트 추가 (`tsx` 기반)                      |
| `package-lock.json`      | `youtube-transcript`, `@anthropic-ai/sdk`, `tsx` 의존성 추가 |

### 파이프라인 구조

```
입력: npm run mine -- <YouTube URL or ID>

[Step 1] URL → Video ID 파싱
  → 정규식 4패턴: watch?v= / youtu.be/ / embed/ / raw 11자 ID

[Step 2] YoutubeTranscript.fetchTranscript() 자막 추출
  → 한국어(ko) 자막 우선, 없으면 기본 언어 폴백
  → 8,000자 초과 시 앞부분만 전달 (토큰 최적화)
  → 공백 정규화 후 단일 string으로 병합

[Step 3] Claude Sonnet 4.6 API 호출
  → SYSTEM_PROMPT: 21개 필드 TypeScript 스펙 + 8개 출력 규칙 내장
  → 순수 JSON 반환 강제 (마크다운 코드블록 방어 파싱)

[검증]
  → 21개 필드 필수 존재 확인
  → difficulty enum 값 검증 (beginner|intermediate|advanced)
  → trendScore 범위 검증 (1~100 정수)
  → startGuide 최소 단계 수 확인 (3개 이상)

[병합]
  → slug/id 중복 감지 후 에러 종료
  → side-hustles.json 배열 append + 파일 저장
```

### 추가된 의존성 (devDependencies)

| 패키지               | 버전     | 용도                     |
| -------------------- | -------- | ------------------------ |
| `youtube-transcript` | ^1.3.1   | YouTube 자막 추출        |
| `@anthropic-ai/sdk`  | ^0.104.2 | Claude API 공식 SDK      |
| `tsx`                | ^4.22.4  | TypeScript 스크립트 실행 |

### 사용법

```bash
export ANTHROPIC_API_KEY=sk-ant-...

# Video ID 직접 입력
npm run mine -- dQw4w9WgXcQ

# 또는 YouTube URL 전달
npm run mine -- https://youtu.be/dQw4w9WgXcQ
npm run mine -- "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

### 완료된 구현 항목

- [x] 데이터 수집 프롬프트 스펙 확정 (21개 필드 전체 + 8개 출력 규칙)
- [x] 수집 대상 소스: 유튜브 영상 (ID 또는 URL)
- [x] Claude Sonnet 4.6 API 연동 파싱 스크립트 (`scripts/mine-hustle.ts`)
- [x] 수집 결과 검증 로직 (21개 필드 + enum + 범위 검증)
- [x] `side-hustles.json` 자동 병합 및 중복 방지
- [x] Next.js 빌드 영향 없음 확인 (38/38 pages SSG)

---

## 🐛 이슈 로그

| #   | 이슈                                                                  | 심각도 | 해결 방법                       | 상태 |
| --- | --------------------------------------------------------------------- | ------ | ------------------------------- | ---- |
| 1   | HustleCard가 Server Component라 `track()` 사용 불가 (SPRINT-001 잔류) | 🟡     | `'use client'` 추가             | ✅   |
| 2   | `useSearchParams` 다중 태그 파싱 시 한글 인코딩                       | 🟢     | URLSearchParams.set() 자동 처리 | ✅   |
