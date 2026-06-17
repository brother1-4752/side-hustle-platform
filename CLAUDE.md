---
name: "AI Sprint Framework"
version: "1.0"
phases:
  ["Discover", "Define", "Design", "Prompt", "Build", "Validate", "Iterate"]
---

# Project CLAUDE.md

## Sprint Framework Configuration

### Roles & Responsibilities

**Designer Agent:**

- User journey mapping
- Storyboard creation
- Prototype fidelity decisions

**Developer Agent:**

- System architecture
- Technical feasibility
- Build execution

**Marketer Agent:**

- User persona validation
- Go-to-market strategy
- Competitive analysis

**Project Manager Agent:**

- Sprint timeline tracking
- Stakeholder communication
- Risk mitigation

**Product Owner:**

- Problem definition
- Success criteria
- Business goal alignment

### AI Vibe Coding Rules

- **Code Speed > Perfection**: Prioritize working prototype over polish
- **Test-Driven Decisions**: Make acceptance criteria explicit before building
- **User-Centered Validation**: 5 users minimum for sprint testing
- **Document-First**: All decisions logged in `.md` files before implementation

### Tools

- **Prototype**: Claude Code
- **Collaboration**: GitHub, Figma (optional)
- **Testing**: Manual user interviews (async OK)

---

## Current Sprint Status

**Sprint**: SPRINT-001
**Phase**: Discover ✅ → Define ✅ → Design ✅ → PRD ✅ → Build ✅ → **Validate** 🔍 (진행 중)
**Status**: 🚀 프로덕션 배포 완료

### 라이브 URL

| 환경 | URL |
|------|-----|
| Production | https://side-hustle-platform.vercel.app |
| Vercel 대시보드 | https://vercel.com/brother14752s-projects/side-hustle-platform |
| GitHub | https://github.com/brother1-4752/side-hustle-platform |

### Completed

- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
- [x] Define — `02_DEFINE.md` 완성 (2026-06-17) ⚠️ Scope Freeze
- [x] Design — `03_DESIGN.md` 완성 (2026-06-17)
- [x] PRD — `04_PRD.md` 완성 (2026-06-17) ⚠️ SCOPE FREEZE

### Build 진행 현황

- [x] Task 1: 디자인 토큰 + 데이터 구조 + 레이아웃 뼈대 (2026-06-17)
- [x] Task 2: Rich 카드 + URL 태그 필터 + 홈 3섹션 렌더링 (2026-06-17)
  - `HustleCard.tsx`: 아이콘/배지/수익/태그 Rich 카드, hover 애니메이션
  - `TagFilterBar.tsx`: useSearchParams + useRouter, URL `/?tag=` 동기화
  - `FilteredFeed.tsx`: Client Component, Suspense 격리, 3섹션 필터링
  - `app/page.tsx`: Server Component, Suspense 래핑, 사이드바 분리
  - `npm run build` 정적 빌드 성공 (lint 0, tsc 0, SSG 0 에러)
- [x] Task 3: 상세 페이지 동적 라우팅 + SSG (2026-06-17)
  - `app/side-hustle/[slug]/page.tsx`: generateStaticParams (5 slugs), generateMetadata, notFound
  - `components/detail/DetailHeader.tsx`: 아이콘 + 난이도 배지 + 트렌딩/인기 배지 + 태그
  - `components/detail/MetricPanel.tsx`: 난이도/예상월수익/초기비용/첫수입까지 4-메트릭 패널
  - `components/detail/StartGuide.tsx`: 번호 배지 + 타임라인 카드 리스트
  - `AdSlot.tsx`: `in-content` 사이즈 타입 추가 (728×90)
  - 사이드바: 관련 부업 2개 (공통 태그 기준, trendScore 정렬) + AdSlot rectangle/half-page
  - `npm run build` 정적 빌드 성공 (9/9 pages, lint 0, tsc 0, SSG 0 에러)
- [x] Task 4: 콘텐츠 데이터 확장 (2026-06-17)
  - `data/side-hustles.json`: 5개 → 30개 항목 확장
  - 카테고리: AI활용(5), 제휴마케팅(2), 이커머스(6), 지식창업(3), 크리에이터(5), 프리랜서(5), 교육(1), 기타(3)
  - 난이도: beginner(18), intermediate(11), advanced(1)
  - `npm run build` 34/34 pages SSG 성공 (lint 0, tsc 0, 에러 0)
- [x] Task 5: Analytics + SEO 메타태그 + 최종 점검 (2026-06-17)
  - `@vercel/analytics` + `@vercel/speed-insights` 패키지 설치
  - `app/layout.tsx`: `<Analytics />` + `<SpeedInsights />` 주입, `metadataBase` 설정, OG/Twitter 카드 메타태그 추가
  - `app/sitemap.ts`: Next.js 내장 MetadataRoute.Sitemap — 홈(priority 1.0) + 30개 상세 페이지(0.8) 자동 생성
  - `app/robots.ts`: Next.js 내장 MetadataRoute.Robots — All crawlers Allow, sitemap.xml 경로 명시
  - `npm run build` 36/36 pages 성공, `out/sitemap.xml` (31 URLs) + `out/robots.txt` 정상 출력 확인

### 기술 스택 (확정)

- Next.js 14.2.x, App Router, `output: 'export'`
- TypeScript + Tailwind CSS 3.4.x
- `next/font/google` (Noto Sans KR)
- Vercel Analytics, Google AdSense Level 2

### Next Action

→ Validate: 실 사용자 5명 피드백 수집 + Vercel Analytics 데이터 분석

### Validate 체크리스트

- [ ] 유저 5명에게 미션 부여: "관심 가는 부업 하나 찾아서 상세 가이드까지 읽어보세요"
- [ ] 행동 관찰: 어떤 카드를 먼저 누르는지, 태그 필터 사용 여부 확인
- [ ] 이탈 지점: 상세 페이지 어느 섹션(MetricPanel/StartGuide)에서 스크롤 멈추는지
- [ ] Analytics 대조: Vercel 대시보드에서 클릭 이벤트 + Core Web Vitals 확인
- [ ] KPI 달성 여부: 카드 클릭률 30% 이상, 상세 페이지 체류 60초+ 목표

## Automated Workflow Rules

- **자동 Git 워크플로우 (CRITICAL)**: 각 스프린트의 Phase(Discover, Define, Design, Build, Validate) 관련 문서 작업이나 코드 구현이 완료되면, 사용자에게 재확인("커밋할까요?")하지 말고 즉시 자동으로 Git 스테이징, 커밋, 푸시를 수행한다.
- **커밋 메시지 규격**: Conventional Commits 규격을 준수하되, 내용은 반드시 '한글'로 작성한다.
  - 형식: `<type>: SPRINT-001 <phase_name> 단계 완료 (<핵심 변경 사항>)`
  - 예시: `docs: SPRINT-001 디자인 단계 완료 (컴포넌트 및 데이터 스키마 확정)`
