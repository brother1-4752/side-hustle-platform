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
**Phase**: Discover ✅ → Define ✅ → **Design** (Next)
**Status**: 🟢 Active

### Completed
- [x] Discover — `01_DISCOVER.md` 완성 (2026-06-17)
- [x] Define — `02_DEFINE.md` 완성 (2026-06-17) ⚠️ Scope Freeze

### Decisions Locked (Scope Freeze)
- MVP 데이터: 30~50개 항목, 대분류 단위, AI 초안 + PO 검수, 1주 내 완성 목표
- 스키마: 태그 기반 다중 분류, `isTrending` / `isPopular` Boolean
- 홈 UX: 매거진형 카드 피드 (탐색 중심)
- Analytics: GA4 또는 Vercel Analytics (P0, 클릭 이벤트 포함)
- AdSense: 레이아웃 + 코드 삽입만 (승인 신청은 KPI 검증 후)
- 성공 지표 (Go): Engagement Rate 30% + 정성 신뢰도 5명 중 4명 이상
- 아키텍처: Next.js SSG / JAMstack, Vercel 배포

### Next Action
→ `sprint-design.md` 프롬프트로 DESIGN 단계 시작
