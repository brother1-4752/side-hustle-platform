# Phase 4: PRD (Product Requirements Document)

> **Sprint**: SPRINT-001 | **Date**: 2026-06-17 | **Goal**: 빌드 기준 문서 확정
> **⚠️ SCOPE FREEZE**: 이 문서가 확정된 순간부터 Build 단계의 유일한 기준.
> 여기 없는 기능은 존재하지 않는다. PO 승인 없이 추가 구현 금지.

---

## 📋 Outputs Checklist

- [x] Overview (One-liner, Target User, Success Metric)
- [x] User Stories + Acceptance Criteria (4개)
- [x] Functional Requirements (FR-1 ~ FR-11)
- [x] Non-Functional Requirements (NFR-1 ~ NFR-13)
- [x] Feature List (P0 / P1 / P2)
- [x] Technical Stack & Architecture
- [x] Scope Freeze & Exclusion (절대 미구현 선언)

---

## 1. Overview

| 항목 | 내용 |
|------|------|
| **One-liner** | 사기 없이, 지금 시작할 수 있는 부업 정보를 한눈에 |
| **Target User** | 월급 외 수입을 원하지만 검색할 때마다 광고·강의 유도에 지친 한국 직장인·대학생 |
| **Problem** | 신뢰할 수 있는 부업 정보가 한 곳에 없어서, 유저들이 정보 탐색에 시간을 낭비하거나 아무것도 시작하지 못한다 |
| **Solution** | 30~50개의 고품질 부업 정보를 매거진형 카드 피드로 탐색하는 정보 애그리게이터 |
| **Success Metric** | 방문자의 **30% 이상**이 상세 페이지를 **2개 이상** 클릭 (Vercel Analytics 측정) |

---

## 2. User Stories & Acceptance Criteria

### US-1: 홈 피드 탐색

```
As a 직장인 김현우 (부업 정보 탐색자)
I want to  홈에서 뜨는/인기/전체 부업을 구분된 섹션으로 스크롤하며 탐색하고 싶다
So that    광고나 강의 유도 없이 신뢰할 수 있는 부업 목록을 한눈에 볼 수 있다
```

**Acceptance Criteria**:
- [ ] 홈(`/`) 로드 시 3개 섹션이 순서대로 표시된다: 🔥 뜨는 부업 → 💡 많이 찾는 부업 → 📚 모든 부업
- [ ] 뜨는 부업 섹션은 `isTrending: true` 항목만 표시한다 (최대 4개)
- [ ] 많이 찾는 부업 섹션은 `isPopular: true` 항목만 표시한다 (최대 4개)
- [ ] 모든 부업 섹션은 전체 항목을 `trendScore` 내림차순으로 표시한다
- [ ] 각 카드는 아이콘 / 난이도·특성 배지 / 제목 / 1줄 요약 / 수익 범위 / 태그를 포함한다
- [ ] 카드 클릭 시 `/side-hustle/[slug]`로 이동한다
- [ ] 데스크톱(1024px+): 뜨는/인기 섹션 2열, 모든 부업 섹션 3열 그리드
- [ ] 모바일(767px 이하): 모든 섹션 1열 그리드

---

### US-2: 태그 필터 & URL 공유

```
As a 대학생 이서연 (특정 조건의 부업을 탐색 중인 유저)
I want to  "#무자본" 태그를 클릭해 해당 부업만 보고, 그 URL을 친구에게 공유하고 싶다
So that    나와 친구 모두 관련 부업 목록을 같은 화면으로 바로 볼 수 있다
```

**Acceptance Criteria**:
- [ ] TagFilterBar의 태그 클릭 시 URL이 `/?tag=[tagname]`으로 업데이트된다 (페이지 새로고침 없음)
- [ ] URL `/?tag=무자본`으로 직접 접속 시 필터가 자동 적용된 상태로 렌더링된다
- [ ] 태그 필터 적용 시 3개 섹션 모두 해당 태그를 가진 항목만 표시한다
- [ ] 필터링 결과가 0개인 섹션은 숨긴다
- [ ] 3개 섹션 모두 결과가 0개이면 "해당 태그의 부업 정보를 준비 중입니다" 메시지를 표시한다
- [ ] 현재 선택된 태그 칩은 활성화 스타일(배경색 강조)을 표시한다
- [ ] 동일 태그 재클릭 시 필터 해제, URL은 `/`로 복귀한다
- [ ] MVP에서 태그 단일 선택만 지원한다 (다중 선택 Out of Scope)

---

### US-3: 부업 상세 정보 확인

```
As a 직장인 김현우
I want to  부업 카드를 클릭해 난이도·초기비용·예상수익·시작 가이드를 확인하고 싶다
So that    "나도 할 수 있겠다"는 판단을 내리고 즉시 첫 단계를 실행할 수 있다
```

**Acceptance Criteria**:
- [ ] 모든 부업 상세 페이지는 빌드 타임에 정적으로 생성된다 (`generateStaticParams`)
- [ ] 존재하지 않는 slug 접근 시 Next.js 404 페이지를 반환한다 (`notFound()`)
- [ ] MetricPanel은 4개 지표를 표시한다: 난이도 / 초기 비용 / 예상 월 수익 / 첫 수입까지 기간
- [ ] StartGuide는 step 번호 순서대로 모든 단계를 표시한다 (최소 3단계)
- [ ] `<title>` 태그: `[title] 부업 가이드 | 부업레이더` 형식
- [ ] `<meta description>`: summary 필드 기반, 160자 이내
- [ ] OG 태그 (`og:title`, `og:description`)가 각 페이지 고유하게 설정된다
- [ ] 상세 페이지에서 홈으로 돌아가는 링크가 존재한다

---

### US-4: 광고 노출 (AdSense Level 2)

```
As a 사이트 운영자
I want to  광고 슬롯이 콘텐츠 신뢰도를 해치지 않으면서 레이아웃에 안정적으로 삽입되길 원한다
So that    AdSense 승인 후 slotId만 채우면 즉시 광고가 활성화될 수 있다
```

**Acceptance Criteria**:
- [ ] AdSlot 컴포넌트는 `slotId`가 빈 문자열(`""`)일 때 회색 placeholder를 고정 크기로 렌더링한다
- [ ] AdSlot 컨테이너는 slotId 유무와 무관하게 항상 규격 높이를 유지한다 (CLS 방지)
- [ ] 사이드바 AdSlot(300×250, 300×600)은 데스크톱에서만 표시된다
- [ ] 모바일 배너 AdSlot(320×100)은 모바일에서만 표시된다
- [ ] AdSense 스크립트는 `next/script strategy="afterInteractive"`로 삽입된다 (LCP 차단 방지)

---

## 3. Functional Requirements

### 홈 페이지 (`/`)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-1 | JSON에서 `isTrending: true` 항목만 필터링해 뜨는 부업 섹션에 최대 4개 표시 | P0 |
| FR-2 | JSON에서 `isPopular: true` 항목만 필터링해 많이 찾는 부업 섹션에 최대 4개 표시 | P0 |
| FR-3 | 전체 항목을 `trendScore` 내림차순 정렬해 모든 부업 섹션에 표시 | P0 |
| FR-4 | URL `/?tag=[value]` 파라미터 적용 시 3섹션을 해당 태그 보유 항목으로 동시 필터링 | P0 |
| FR-5 | TagFilterBar 태그 클릭 → `useSearchParams` + `router.push`로 URL 업데이트 (리렌더 없이) | P0 |
| FR-6 | TagFilterBar는 반드시 `<Suspense>` 경계로 감싸야 함 (`output: 'export'` 호환 요건) | P0 |
| FR-7 | 필터링 후 항목 0개 섹션 숨김, 전체 0개 시 안내 메시지 표시 | P0 |
| FR-8 | 모든 부업 섹션 6번째 카드 이후 in-feed AdSlot(728×90) 삽입 | P0 |
| FR-9 | 사이드바: 인기 태그 목록(JSON에서 가장 많이 등장하는 태그 Top 8) + AdSlot 2개 | P0 |

### 상세 페이지 (`/side-hustle/[slug]`)

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-10 | 빌드 타임에 JSON 전체 slug로 `generateStaticParams` 실행, 모든 경로 정적 생성 | P0 |
| FR-11 | 존재하지 않는 slug → `notFound()` 호출, Next.js 기본 404 반환 | P0 |
| FR-12 | DetailHeader: 아이콘 + 배지 행(difficulty + 특성 태그) + title + summary | P0 |
| FR-13 | MetricPanel: 4칸 그리드 — 난이도 / 초기 비용 / 예상 월 수익 / 첫 수입까지 기간 | P0 |
| FR-14 | 개요(overview)와 시작 가이드(startGuide) 사이에 in-content AdSlot(728×90) 삽입 | P0 |
| FR-15 | StartGuide: step 오름차순으로 title + description을 번호형 리스트로 표시 | P0 |
| FR-16 | 사이드바: sticky AdSlot(300×250) + 관련 부업 최대 2개 (공통 태그 기준) | P1 |
| FR-17 | "← 모든 부업 보기" 링크로 홈(`/`)으로 복귀 | P0 |

### 공통

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-18 | Navbar: 로고 + [뜨는 부업 / 인기 부업 / 모든 부업] 링크. **검색 아이콘 없음** | P0 |
| FR-19 | Footer: 브랜드명 + 저작권 + "데이터는 정기적으로 업데이트됩니다" 안내 | P0 |
| FR-20 | Vercel Analytics 초기화 및 페이지별 pageview 이벤트 트래킹 | P0 |
| FR-21 | HustleCard 클릭 이벤트를 Analytics에 전송 (slug 포함) | P0 |

---

## 4. Non-Functional Requirements

### SEO

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| NFR-1 | 홈 `<title>`: "부업레이더 — 뜨는 부업, 인기 부업 한눈에 보기" | P0 |
| NFR-2 | 상세 페이지 `<title>`: `[title] 부업 완전 가이드 \| 부업레이더` | P0 |
| NFR-3 | 상세 페이지 `<meta name="description">`: summary 필드 기반, 160자 이내 | P0 |
| NFR-4 | OG 태그: `og:title`, `og:description` 페이지별 고유 설정 | P0 |
| NFR-5 | `sitemap.xml`: 빌드 시 자동 생성 (홈 + 전체 상세 페이지 URL) | P1 |
| NFR-6 | `robots.txt`: 모든 페이지 크롤링 허용 | P1 |

### 성능

| ID | 요구사항 | 측정 기준 |
|----|----------|-----------|
| NFR-7 | Lighthouse Performance Score 90+ | Vercel 배포 후 측정 |
| NFR-8 | First Contentful Paint < 1.5초 | Vercel Edge Network 기준 |
| NFR-9 | CLS(Cumulative Layout Shift) 0.1 이하 | AdSlot 고정 높이로 달성 |
| NFR-10 | 폰트: `next/font`로 Noto Sans KR 로드 (FOUT 방지) | 빌드 시 검증 |

### AdSense 레이아웃 안정성

| ID | 요구사항 |
|----|----------|
| NFR-11 | AdSlot 컨테이너는 `min-height` 고정 (rectangle: 250px, leaderboard: 90px 등) |
| NFR-12 | AdSense 스크립트는 `next/script strategy="afterInteractive"` 로드 |
| NFR-13 | AdSlot 사이드바/모바일 분기: `hidden md:block` / `block md:hidden` CSS 패턴 |

### 접근성

| ID | 요구사항 |
|----|----------|
| NFR-14 | 모든 클릭 가능 요소에 `aria-label` 또는 텍스트 레이블 |
| NFR-15 | 색상 대비비 WCAG AA 기준 이상 (텍스트 4.5:1) |

---

## 5. Feature List

### P0 — 반드시 구현 (Build Day)

- [x] 홈 3섹션 카드 피드 (뜨는/인기/전체)
- [x] URL 태그 필터 (`/?tag=`) + `<Suspense>` 래핑
- [x] Rich HustleCard 컴포넌트
- [x] 상세 페이지 정적 생성 (`generateStaticParams`)
- [x] MetricPanel (4개 지표)
- [x] StartGuide 스텝 컴포넌트
- [x] AdSlot 5개 위치 (placeholder 상태)
- [x] Vercel Analytics + 클릭 이벤트 트래킹
- [x] 반응형 레이아웃 (모바일 사이드바 → 하단)
- [x] SEO 메타태그 (title, description, OG)
- [x] `side-hustles.json` 30~50개 데이터
- [x] Navbar (검색 없음), Footer

### P1 — 시간 여유 시 구현

- [ ] `sitemap.xml` + `robots.txt` 자동 생성
- [ ] 관련 부업 (상세 페이지 사이드바, 공통 태그 기준)
- [ ] 모바일 Navbar 햄버거 메뉴 (토글)
- [ ] 상세 페이지 breadcrumb

### P2 — 다음 스프린트 (Backlog)

- [ ] 텍스트 검색 기능
- [ ] 태그별 전용 페이지 (`/category/[tag]`)
- [ ] 북마크 (localStorage 기반)
- [ ] 댓글 / 사용자 후기

---

## 6. Technical Stack & Architecture

| 항목 | 결정 |
|------|------|
| **Framework** | Next.js 14+ (App Router, `output: 'export'` SSG) |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS |
| **폰트** | Noto Sans KR (`next/font/google`) |
| **데이터** | `public/data/side-hustles.json` (정적 파일) |
| **Analytics** | Vercel Analytics (`@vercel/analytics`) |
| **광고** | Google AdSense (코드 삽입, slotId 미설정 상태) |
| **배포** | Vercel (GitHub 연동 자동 배포) |
| **버전 관리** | GitHub (`main` 브랜치 직배포) |

### 핵심 구현 패턴

```typescript
// 1. 데이터 로딩 — 서버 컴포넌트에서 JSON 직접 import
import hustles from '@/public/data/side-hustles.json'

// 2. 정적 경로 생성
export async function generateStaticParams() {
  return hustles.map((h) => ({ slug: h.slug }))
}

// 3. 태그 필터 — TagFilterBar는 반드시 Suspense로 감싸기
// app/page.tsx (Server Component)
<Suspense fallback={<TagFilterBarSkeleton />}>
  <TagFilterBar allTags={allTags} />
</Suspense>

// 4. TagFilterBar 내부 (Client Component)
'use client'
const searchParams = useSearchParams()
const router = useRouter()
const activeTag = searchParams.get('tag')

const handleTagClick = (tag: string) => {
  const next = activeTag === tag ? '/' : `/?tag=${tag}`
  router.push(next, { scroll: false })
}
```

---

## 7. Scope Freeze — 절대 미구현 선언

> 아래 항목은 SPRINT-001 Build 단계에서 **어떤 이유로도 구현하지 않는다.**
> 개발 중 "이거 빨리 추가할 수 있지 않나?"라는 판단이 들면 이 목록을 확인한다.

| 미구현 항목 | 이유 |
|-------------|------|
| 검색창 (Navbar 포함, 어떤 형태든) | 미완성 UI는 신뢰도 손상. 가설 검증 후 SPRINT-002에서 제대로 구현 |
| 회원가입 / 로그인 | 인증 없이도 핵심 가치(정보 탐색) 검증 가능 |
| 좋아요 / 북마크 | 상태 저장 인프라 필요, 핵심 KPI와 무관 |
| 댓글 / 사용자 후기 | 콘텐츠 신뢰도 검증 후 도입 |
| 태그별 전용 URL 페이지 (`/category/[tag]`) | URL 필터(`/?tag=`)로 동일 목적 달성 가능 |
| 다중 태그 필터 | 단일 태그 필터로 MVP 검증 충분 |
| AdSense 승인 신청 | KPI 30% 달성 후 트래픽 확보 시점에 진행 |
| 프라이버시 정책 / 이용약관 페이지 | AdSense 승인 신청 전 추가. 지금은 스코프 외 |
| 부업 매칭 / 채용 연결 | 정보 애그리게이터 역할 범위 초과 |
| 실시간 크롤러 / AI 데이터 자동 수집 | 수동 운영 검증 완료 후 자동화 |
| 다국어 지원 | 한국 시장 검증이 먼저 |
| 다크 모드 | 파스텔 매거진 컨셉과 상충, SPRINT-002 이후 |
| 이미지/썸네일 업로드 | 아이콘(emoji) 기반으로 충분. 이미지는 빌드 복잡도 증가 |

---

## 📁 Output Files

| 파일 | 설명 | 상태 |
|------|------|------|
| `04_PRD.md` | Product Requirements (이 파일) | ✅ 완료 |
| `03_DESIGN.md` | 검색 아이콘 제거 수정 완료 | ✅ 수정 |

---

> **⚠️ SCOPE FREEZE 최종 선언** — 2026-06-17
> 이 PRD 외 기능 추가는 PO(운영자) 명시적 승인 필요.
> "빠르게 추가 가능해 보이는" 기능도 이번 스프린트에서는 절대 추가하지 않는다.
>
> **다음 단계**: Build (`06_BUILD.md`)
> → `03_DESIGN.md` 컴포넌트 트리 + `04_PRD.md` FR/NFR 목록이 구현의 유일한 기준.
