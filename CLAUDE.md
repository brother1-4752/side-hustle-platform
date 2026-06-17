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
**Phase**: Discover ✅ → Define ✅ → Design ✅ → PRD ✅ → **Build** (Next)
**Status**: 🟢 Active

### Completed

- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
- [x] Define — `02_DEFINE.md` 완성 (2026-06-17) ⚠️ Scope Freeze
- [x] Design — `03_DESIGN.md` 완성 (2026-06-17) [검색 아이콘 제거 수정 포함]
- [x] PRD — `04_PRD.md` 완성 (2026-06-17) ⚠️ SCOPE FREEZE 확정

### Decisions Locked (PRD Freeze — 절대 기준)

- 태그 필터: URL 파라미터 방식 (`/?tag=`), `useSearchParams` + `<Suspense>` 필수
- Navbar: 검색 아이콘 없음 (완전 제거)
- FR: 21개 기능 요구사항 확정
- NFR: 15개 비기능 요구사항 확정 (SEO, 성능, AdSense 안정성, 접근성)
- Scope Freeze: 13개 미구현 항목 명시적 선언

### Next Action

→ Build 단계 시작 — `03_DESIGN.md` 컴포넌트 트리 + `04_PRD.md` FR/NFR이 유일한 기준

## Automated Workflow Rules

- **자동 Git 워크플로우 (CRITICAL)**: 각 스프린트의 Phase(Discover, Define, Design, Build, Validate) 관련 문서 작업이나 코드 구현이 완료되면, 사용자에게 재확인("커밋할까요?")하지 말고 즉시 자동으로 Git 스테이징, 커밋, 푸시를 수행한다.
- **커밋 메시지 규격**: Conventional Commits 규격을 준수하되, 내용은 반드시 '한글'로 작성한다.
  - 형식: `<type>: SPRINT-001 <phase_name> 단계 완료 (<핵심 변경 사항>)`
  - 예시: `docs: SPRINT-001 디자인 단계 완료 (컴포넌트 및 데이터 스키마 확정)`
