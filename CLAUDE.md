---
name: "Side Hustle Information Platform"
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

**Sprint**: SPRINT-002
**Phase**: Build ✅ (Task 4/4 완료) → Validate 단계 진입 대기
**Status**: ✅ SPRINT-002 Build 완료 — Validate 준비 중

### 라이브 URL

| 환경            | URL                                                            |
| --------------- | -------------------------------------------------------------- |
| Production      | https://side-hustle-platform.vercel.app                        |
| Vercel 대시보드 | https://vercel.com/brother14752s-projects/side-hustle-platform |
| GitHub          | https://github.com/brother1-4752/side-hustle-platform          |

### SPRINT-001 — 전 단계 완결 ✅

- [x] Discover / Define / Design / PRD — `01~04_*.md` 완성 (2026-06-17)
- [x] Build — `06_BUILD.md` 완성 (2026-06-17) — 36/36 pages SSG
- [x] Validate — `07_VALIDATE.md` 완성 (2026-06-17) — CTR 100%, 체류 75.4초
- [x] Iterate — `08_ITERATE.md` 완성 (2026-06-17) — Sprint 002 진입 승인

### SPRINT-002 — Build 완료 ✅

- [x] Task 1: `requiredHoursPerDay` 스키마 + MetricPanel 5메트릭 벤토 그리드 (커밋: `f2dc4d2`)
- [x] Task 2: AdSense 승인용 Privacy·Terms 페이지 신설 + Footer 링크 (커밋: `2197adf`)
- [x] Task 3: 다중 태그 AND 교차 필터링 + URL 동기화 (커밋: `e38c4a7`)
- [x] Task 4: AI 자동 데이터 수집 파이프라인 구축 — `scripts/mine-hustle.ts` (커밋: `152727b`)

### 기술 스택 (확정)

- Next.js 14.2.x, App Router, `output: 'export'`
- TypeScript + Tailwind CSS 3.4.x
- `next/font/google` (Noto Sans KR)
- Vercel Analytics, Google AdSense Level 2

### 기술 스택 추가 (SPRINT-002)

- `youtube-transcript` — YouTube 자막 추출
- `@anthropic-ai/sdk` — Claude API 공식 SDK
- `tsx` — TypeScript 스크립트 실행기

### Next Action

→ SPRINT-002 Validate: `mine-hustle.ts`로 실제 영상 수집 테스트 + 유저 5명 재검증

## Automated Workflow Rules

- **자동 Git 워크플로우 (CRITICAL)**: 각 스프린트의 Phase(Discover, Define, Design, Build, Validate) 관련 문서 작업이나 코드 구현이 완료되면, 사용자에게 재확인("커밋할까요?")하지 말고 즉시 자동으로 Git 스테이징, 커밋, 푸시를 수행한다.
- **커밋 메시지 규격**: Conventional Commits 규격을 준수하되, 내용은 반드시 '한글'로 작성한다.
  - 형식: `<type>: SPRINT-001 <phase_name> 단계 완료 (<핵심 변경 사항>)`
  - 예시: `docs: SPRINT-001 디자인 단계 완료 (컴포넌트 및 데이터 스키마 확정)`
