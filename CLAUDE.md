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
**Phase**: Discover ✅ → **Define** (Next)
**Status**: 🟢 Active

### Completed
- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
  - Business Goal, Problem Statement, Personas, User Journey Map, Sprint Questions, Data Architecture 확정

### Decisions Locked
- MVP 데이터: 30~50개 항목, 대분류 단위
- 스키마: 태그 기반 다중 분류, `isTrending` / `isPopular` Boolean 필드
- 홈 UX: 매거진형 카드 피드 (탐색 중심)
- 성공 지표: 방문자 30% 이상 상세 페이지 2개 이상 클릭
- 아키텍처: Next.js SSG / JAMstack, 정적 JSON

### Next Action
→ `sprint-define.md` 프롬프트로 DEFINE 단계 시작
