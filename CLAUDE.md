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

**Sprint**: SPRINT-001
**Phase**: Discover ✅ → Define ✅ → Design ✅ → PRD ✅ → Build ✅ → Validate ✅ → **Iterate** ✅ (완결)
**Status**: ✅ SPRINT-001 전 단계 완료 — Sprint 002 진입 승인

### 라이브 URL

| 환경            | URL                                                            |
| --------------- | -------------------------------------------------------------- |
| Production      | https://side-hustle-platform.vercel.app                        |
| Vercel 대시보드 | https://vercel.com/brother14752s-projects/side-hustle-platform |
| GitHub          | https://github.com/brother1-4752/side-hustle-platform          |

### Completed — SPRINT-001 전 단계 ✅

- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
- [x] Define — `02_DEFINE.md` 완성 (2026-06-17) ⚠️ Scope Freeze
- [x] Design — `03_DESIGN.md` 완성 (2026-06-17)
- [x] PRD — `04_PRD.md` 완성 (2026-06-17) ⚠️ SCOPE FREEZE
- [x] Build — `06_BUILD.md` 완성 (2026-06-17) — Task 1~6 전체 구현, 36/36 pages SSG
- [x] Validate — `07_VALIDATE.md` 완성 (2026-06-17) — 유저 5명 테스트, KPI CTR 100% / 체류 75.4초
- [x] Iterate — `08_ITERATE.md` 완성 (2026-06-17) — Sprint 002 진입 승인

### 기술 스택 (확정)

- Next.js 14.2.x, App Router, `output: 'export'`
- TypeScript + Tailwind CSS 3.4.x
- `next/font/google` (Noto Sans KR)
- Vercel Analytics, Google AdSense Level 2

### Validate 결과 요약 ✅

- [x] 유저 5명 테스트 완료 (김지은, 이민우, 박서연, 최동현, 정정훈)
- [x] KPI 달성: 카드 클릭률 100% (목표 30% 초과), 평균 체류 75.4초 (목표 60초 초과)
- [x] 핵심 Pain Point: 직장인 '하루 투입 시간' 지표 누락 → Sprint 002 `requiredHoursPerDay` 필드 추가 예정
- [x] Go/No-Go: ITERATE 후 BUILD — Sprint 002 진입 승인

### Next Action

→ Sprint 002: `requiredHoursPerDay` 필드 + 다중 태그 필터 + AI 자동 데이터 수집 파이프라인 구축

## Automated Workflow Rules

- **자동 Git 워크플로우 (CRITICAL)**: 각 스프린트의 Phase(Discover, Define, Design, Build, Validate) 관련 문서 작업이나 코드 구현이 완료되면, 사용자에게 재확인("커밋할까요?")하지 말고 즉시 자동으로 Git 스테이징, 커밋, 푸시를 수행한다.
- **커밋 메시지 규격**: Conventional Commits 규격을 준수하되, 내용은 반드시 '한글'로 작성한다.
  - 형식: `<type>: SPRINT-001 <phase_name> 단계 완료 (<핵심 변경 사항>)`
  - 예시: `docs: SPRINT-001 디자인 단계 완료 (컴포넌트 및 데이터 스키마 확정)`
