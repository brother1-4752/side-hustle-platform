# Phase 5: BUILD

> **Sprint**: SPRINT-001 | **Date**: 2026-06-17 | **Goal**: Claude Code로 작동하는 프로토타입을 구현한다
> **상태**: ✅ 빌드 완료 — 프로덕션 배포 성공

---

## 📋 Outputs Checklist

- [x] 작동하는 프로토타입 (Claude Code)
- [x] 배포 완료 (Vercel 프로덕션)
- [x] 빌드 검증 통과 (`npm run build` lint 0 / tsc 0 / SSG 에러 0)

---

## 🚀 빌드 시작 전 확인

- [x] `04_PRD.md` 최종 확인 완료
- [x] `05_PROMPTS.md` 프롬프트 준비 완료 (다이렉트 컨텍스트 방식으로 대체)
- [x] 개발 환경 세팅 완료 (Next.js 14 + TypeScript + Tailwind CSS)
- [x] 리포지토리 초기화 완료

---

## 📦 Build Progress

### Task 1: 디자인 토큰 + 데이터 구조 + 레이아웃 뼈대 — P0

| 항목                     | 상태       |
| ------------------------ | ---------- |
| 구현                     | ✅ 완료    |
| 테스트                   | ✅ 완료    |
| PRD User Story 연결      | US-1, US-3 |
| Acceptance Criteria 확인 | ✅         |

**구현 내역**:

- `tailwind.config.ts`: `primary`, `surface`, `card` 등 디자인 토큰 정의
- `types/index.ts`: `SideHustle`, `StartGuideStep`, `SidebarProps` 등 핵심 TypeScript 인터페이스 정의
- `public/data/side-hustles.json`: 초기 5개 데이터 구조 확정 (slug, icon, tags, difficulty, expectedMonthlyIncome, startGuide 필드)
- `app/layout.tsx`: Noto Sans KR (`next/font/google`) 적용, 전역 레이아웃 뼈대
- `components/layout/Navbar.tsx`: 로고 + 3개 앵커 링크 (검색 없음)
- `components/layout/Footer.tsx`: 브랜드명 + 저작권 + 데이터 업데이트 안내
- `components/layout/Sidebar.tsx`: 인기 태그 Top 8 + AdSlot 2개 영역
- `npm run build` 정적 빌드 성공 (lint 0, tsc 0, SSG 0 에러)

---

### Task 2: Rich 카드 + URL 태그 필터 + 홈 3섹션 렌더링 — P0

| 항목                     | 상태       |
| ------------------------ | ---------- |
| 구현                     | ✅ 완료    |
| 테스트                   | ✅ 완료    |
| PRD User Story 연결      | US-1, US-2 |
| Acceptance Criteria 확인 | ✅         |

**구현 내역**:

- `components/ui/HustleCard.tsx`: 아이콘/배지/수익/태그 Rich 카드, hover 애니메이션
  - 난이도 배지 (초급/중급/고급 색상 분기)
  - 뜨는 중 / 인기 상태 배지
  - 예상 월 수익 pill (emerald 색상)
  - 특성 태그(rose) + 일반 태그(gray) 구분 렌더링
- `components/ui/TagFilterBar.tsx`: `useSearchParams` + `useRouter` 기반 URL 동기화
  - `/?tag=[value]` URL 파라미터 읽기/쓰기
  - 동일 태그 재클릭 시 필터 해제 (URL → `/`)
  - 활성 태그 강조 스타일
- `components/home/FilteredFeed.tsx`: Client Component, Suspense 격리, 3섹션 필터링
  - 뜨는 부업 (`isTrending: true`, 최대 4개)
  - 많이 찾는 부업 (`isPopular: true`, 최대 4개)
  - 모든 부업 (`trendScore` 내림차순, 6번째 이후 AdSlot 삽입)
  - 결과 0개 섹션 자동 숨김 / 전체 0개 시 안내 메시지
- `app/page.tsx`: Server Component, Suspense 래핑, 사이드바 분리
- `npm run build` 정적 빌드 성공 (lint 0, tsc 0, SSG 0 에러)

---

### Task 3: 상세 페이지 동적 라우팅 + SSG — P0

| 항목                     | 상태       |
| ------------------------ | ---------- |
| 구현                     | ✅ 완료    |
| 테스트                   | ✅ 완료    |
| PRD User Story 연결      | US-3, US-4 |
| Acceptance Criteria 확인 | ✅         |

**구현 내역**:

- `app/side-hustle/[slug]/page.tsx`:
  - `generateStaticParams`: JSON 전체 slug 정적 경로 생성
  - `generateMetadata`: `<title>`, `<meta description>`, OG 태그 페이지별 고유 설정
  - `notFound()`: 존재하지 않는 slug 접근 시 Next.js 404 반환
- `components/detail/DetailHeader.tsx`: 아이콘 + 난이도 배지 + 트렌딩/인기 배지 + 태그
- `components/detail/MetricPanel.tsx`: 4-메트릭 그리드 — 난이도 / 예상월수익 / 초기비용 / 첫수입까지
- `components/detail/StartGuide.tsx`: step 오름차순, 번호 배지 + 타임라인 카드 리스트
- `components/ui/AdSlot.tsx`: `in-content` 사이즈 타입 추가 (728×90)
- 상세 페이지 사이드바: 관련 부업 2개 (공통 태그 기준, trendScore 정렬) + AdSlot rectangle/half-page
- `npm run build` 정적 빌드 성공 (9/9 pages, lint 0, tsc 0, SSG 0 에러)

---

### Task 4: 콘텐츠 데이터 확장 — P0

| 항목                     | 상태       |
| ------------------------ | ---------- |
| 구현                     | ✅ 완료    |
| 테스트                   | ✅ 완료    |
| PRD User Story 연결      | US-1, US-3 |
| Acceptance Criteria 확인 | ✅         |

**구현 내역**:

- `public/data/side-hustles.json`: 5개 → 30개 항목 확장
  - AI활용(5), 제휴마케팅(2), 이커머스(6), 지식창업(3), 크리에이터(5), 프리랜서(5), 교육(1), 기타(3)
  - 난이도: beginner(18), intermediate(11), advanced(1)
  - 모든 항목에 slug, icon, tags, isTrending, isPopular, trendScore, startGuide 필드 완비
- `npm run build` 34/34 pages SSG 성공 (lint 0, tsc 0, 에러 0)

---

### Task 5: Analytics + SEO 메타태그 + 최종 점검 — P0/P1

| 항목                     | 상태                  |
| ------------------------ | --------------------- |
| 구현                     | ✅ 완료               |
| 테스트                   | ✅ 완료               |
| PRD User Story 연결      | FR-20, FR-21, NFR-1~6 |
| Acceptance Criteria 확인 | ✅                    |

**구현 내역**:

- `@vercel/analytics` + `@vercel/speed-insights` 패키지 설치
- `app/layout.tsx`:
  - `<Analytics />` + `<SpeedInsights />` 주입
  - `metadataBase` 설정 (프로덕션 URL 기준)
  - OG / Twitter 카드 메타태그 추가
- `app/sitemap.ts`: Next.js 내장 `MetadataRoute.Sitemap`
  - 홈(priority 1.0) + 30개 상세 페이지(0.8) 자동 생성
- `app/robots.ts`: Next.js 내장 `MetadataRoute.Robots`
  - All crawlers Allow, sitemap.xml 경로 명시
- `npm run build` 36/36 pages 성공, `out/sitemap.xml` (31 URLs) + `out/robots.txt` 정상 출력 확인

---

### Task 6 (추가): FR-21 HustleCard 클릭 트래킹 — P0

| 항목                     | 상태    |
| ------------------------ | ------- |
| 구현                     | ✅ 완료 |
| 테스트                   | ✅ 완료 |
| PRD User Story 연결      | FR-21   |
| Acceptance Criteria 확인 | ✅      |

**구현 내역**:

- `components/ui/HustleCard.tsx`:
  - `'use client'` 디렉티브 추가 (Client Component로 전환)
  - `track` from `@vercel/analytics` import
  - `<Link onClick>` 핸들러: `track('hustle_card_click', { slug, title })` 전송

---

## 🧪 Testing Checklist

### Happy Path (정상 흐름)

- [x] 홈(`/`) 로드 → 3섹션 카드 피드 렌더링 확인
- [x] 태그 클릭 → URL `/?tag=[value]` 업데이트 + 필터 적용 확인
- [x] 카드 클릭 → `/side-hustle/[slug]` 상세 페이지 이동 확인
- [x] 상세 페이지 MetricPanel 4개 지표 표시 확인
- [x] 상세 페이지 StartGuide 단계 순서 표시 확인
- [x] "← 모든 부업 보기" 링크 홈 복귀 확인

### Edge Cases (경계 조건)

- [x] 존재하지 않는 slug → 404 페이지 반환
- [x] 결과 0개 태그 필터 → 안내 메시지 표시
- [x] AdSlot slotId="" → placeholder 렌더링 (CLS 방지)

### SSG 빌드 검증

- [x] `npm run build`: 36/36 pages 정적 생성 성공
- [x] lint 에러 0 / TypeScript 에러 0 / SSG 에러 0
- [x] `out/sitemap.xml` 31 URLs 생성 확인
- [x] `out/robots.txt` 정상 출력 확인

---

## 🚢 Deployment

**배포 환경**: 프로덕션 (Vercel)
**배포 URL**: https://side-hustle-platform.vercel.app
**배포 일시**: 2026-06-17

### 배포 단계

```bash
# 1. 로컬 빌드 검증
npm run build

# 2. Git 커밋 & 푸시 (main 브랜치)
git add -A && git commit -m "feat: ..." && git push

# 3. Vercel 자동 배포 (GitHub 연동)
# → Vercel 대시보드에서 배포 상태 확인
# https://vercel.com/brother14752s-projects/side-hustle-platform
```

---

## 🐛 이슈 로그

| #   | 이슈                                                  | 심각도 | 해결 방법                                                        | 상태 |
| --- | ----------------------------------------------------- | ------ | ---------------------------------------------------------------- | ---- |
| 1   | `useSearchParams` 정적 빌드 에러                      | 🔴     | `TagFilterBar`를 `<Suspense>`로 감싸기 (`output: 'export'` 호환) | ✅   |
| 2   | `HustleCard`가 Server Component라 `track()` 사용 불가 | 🟡     | `'use client'` 디렉티브 추가로 Client Component 전환             | ✅   |

---

## ✅ 빌드 완료 기준

- [x] 모든 P0 기능 구현 완료 (FR-1 ~ FR-21)
- [x] P1 기능 일부 구현 (sitemap, robots, 관련 부업 사이드바)
- [x] 빌드 검증 통과 (36 pages SSG)
- [x] 프로덕션 배포 완료 및 접근 가능
- [x] Validate 단계 진입 준비 완료

---

## 📁 Output Files

| 파일            | 설명                        | 상태    |
| --------------- | --------------------------- | ------- |
| `06_BUILD.md`   | 빌드 진행 노트 (이 파일)    | ✅ 완료 |
| `out/`          | 정적 빌드 산출물 (36 pages) | ✅ 완료 |
| Vercel 프로덕션 | 라이브 배포                 | ✅ 완료 |
