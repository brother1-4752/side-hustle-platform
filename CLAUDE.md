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
**Phase**: Discover ✅ → Define ✅ → Design ✅ → PRD ✅ → **Build** 🔨 (진행 중)
**Status**: 🟢 Active

### Completed

- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
- [x] Define — `02_DEFINE.md` 완성 (2026-06-17) ⚠️ Scope Freeze
- [x] Design — `03_DESIGN.md` 완성 (2026-06-17)
- [x] PRD — `04_PRD.md` 완성 (2026-06-17) ⚠️ SCOPE FREEZE

### Build 진행 현황

- [x] Task 1: 디자인 토큰 + 데이터 구조 + 레이아웃 뼈대 (2026-06-17)
  - `tailwind.config.ts`, `globals.css`, `next.config.mjs`
  - `data/side-hustles.json` (5개 Mock 데이터, 17필드 완전 스펙)
  - `app/layout.tsx`, `Navbar`, `Footer`, `Sidebar`, `AdSlot`
  - 린트 에러 0, TypeScript 에러 0 확인
- [ ] Task 2: 홈 카드 피드 (HustleCard, TagFilterBar, 3섹션 렌더링)
- [ ] Task 3: 상세 페이지 (generateStaticParams, MetricPanel, StartGuide)
- [ ] Task 4: 콘텐츠 데이터 (30~50개 항목 완성)
- [ ] Task 5: Analytics + SEO 메타태그 + 최종 점검

### 기술 스택 (확정)

- Next.js 14.2.x, App Router, `output: 'export'`
- TypeScript + Tailwind CSS 3.4.x
- `next/font/google` (Noto Sans KR)
- Vercel Analytics, Google AdSense Level 2

### Next Action

→ Task 2: 홈 카드 피드 구현 (HustleCard Rich 컴포넌트, TagFilterBar URL 파라미터)

## Automated Workflow Rules

- **자동 Git 워크플로우 (CRITICAL)**: 각 스프린트의 Phase(Discover, Define, Design, Build, Validate) 관련 문서 작업이나 코드 구현이 완료되면, 사용자에게 재확인("커밋할까요?")하지 말고 즉시 자동으로 Git 스테이징, 커밋, 푸시를 수행한다.
- **커밋 메시지 규격**: Conventional Commits 규격을 준수하되, 내용은 반드시 '한글'로 작성한다.
  - 형식: `<type>: SPRINT-001 <phase_name> 단계 완료 (<핵심 변경 사항>)`
  - 예시: `docs: SPRINT-001 디자인 단계 완료 (컴포넌트 및 데이터 스키마 확정)`
