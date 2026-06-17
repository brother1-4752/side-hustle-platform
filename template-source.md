I'll show you the best existing repositories and create a template structure:

### Key Repositories Found:

1. **product-on-purpose/pm-skills** - Design Sprint workflow documentation
   - URL: https://github.com/product-on-purpose/pm-skills
   - Contains: Foundation Sprint → Design Sprint → Delivery workflow
   - Files: `_workflows/foundation-sprint.md`, `_workflows/design-sprint.md`
2. **popey/Claude-Skills-3** - Sprint execution with CLAUDE.md
   - URL: https://github.com/popey/Claude-Skills-3
   - Contains: Real sprint tracking (sprint-11-05-2025)
   - CLAUDE.md structure with active sprint documentation

---

## 📋 AI-Optimized Sprint Template (7-Step Model)

Here's the GitHub template structure you should create:

```
project-root/
├── .claude/
│   ├── CLAUDE.md                    # Master project configuration
│   ├── agents/                      # Role-based agents
│   │   ├── product-owner.md
│   │   ├── designer.md
│   │   ├── developer.md
│   │   ├── marketer.md
│   │   └── project-manager.md
│   └── prompts/
│       ├── sprint-discover.md
│       ├── sprint-define.md
│       ├── sprint-design.md
│       ├── sprint-prompt-gen.md
│       ├── sprint-build.md
│       ├── sprint-validate.md
│       └── sprint-iterate.md
│
├── docs/
│   └── sprints/
│       └── SPRINT-001/
│           ├── 01_DISCOVER.md           # Day 1 - Problem understanding
│           ├── 02_DEFINE.md             # Day 1-2 - User research
│           ├── 03_DESIGN.md             # Day 2-3 - Solution sketches
│           ├── 04_PRD.md                # Day 3 - Product requirements
│           ├── 05_PROMPTS.md            # Day 3 - AI prompt engineering
│           ├── 06_BUILD.md              # Day 4 - Implementation with Claude Code
│           ├── 07_VALIDATE.md           # Day 5 - User testing
│           ├── 08_ITERATE.md            # Post-sprint - Refinement
│           ├── user-research/
│           ├── prototypes/
│           ├── feedback-notes/
│           └── metrics.md
│
├── SPRINT-TEMPLATE.md               # Master sprint guide
├── CLAUDE.md                        # Project-level Claude config
└── ROADMAP.md
```

---

## 📄 Core Sprint Documents (Templates)

### 1. **CLAUDE.md** (Project Level)

```markdown
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

- **Prototype**: Lovable, Cursor, Claude Code
- **Collaboration**: GitHub, Figma (optional)
- **Testing**: Manual user interviews (async OK)

---

## Current Sprint Status

**Sprint**: [SPRINT-001]
**Phase**: [Discover | Define | Design | Build | Validate | Iterate]
**Status**: [🟢 Active | 🟡 Blocked | ✅ Complete]

[Auto-update this section]
```

### 2. **SPRINT-TEMPLATE.md** (Per-Sprint Master)

```markdown
# Sprint: [PROJECT-NAME]

## 📍 Sprint Overview

**Sprint Number**: 001
**Duration**: 5 Days (compressed AI version: 2-3 days possible)
**Start Date**: [Date]
**End Date**: [Date]
**Decider**: [Name]
**Facilitator**: [Name/Claude Agent]

---

## 🔍 Phase 1: DISCOVER (Day 1)

**Goal**: Understand the problem deeply

**Outputs**:

- [ ] Business Goal statement
- [ ] Problem Statement
- [ ] Target User(s)
- [ ] User Journey Map
- [ ] Sprint Questions (3-5)

**Activities**:

### Expert Interview

- **Who**: Domain experts, current users
- **Prompt Template**:
```

Interview Guide for [Expert Name]:

1. What's the biggest friction point in [process]?
2. How do you currently solve for [problem]?
3. What's the cost of this friction? (time/money/pain)
4. Who else struggles with this?
5. What would success look like?

```

### User Journey Mapping
```

Stage → Trigger → Action → Emotion → Outcome → Next Step

1. Awareness
   - Problem discovered
   - Seeks solution
   - Frustrated
   - Considers options
2. Consideration
   - Evaluates solutions
   - Talks to peers
   - Hopeful
   - Narrows choices
3. Purchase/Adoption
   - Makes decision
   - Takes action
   - Committed
   - Uses product
4. Implementation
   - Uses product
   - Learns features
   - Satisfied/Struggling
   - Continues or abandons

````

**Output Files**:
- `01_DISCOVER.md` - All findings
- `user-research/interview-notes.md` - Raw notes
- `user-research/personas.md` - Proto-personas

---

## 📝 Phase 2: DEFINE (Day 1-2)

**Goal**: Clarify what we're building and why

**Outputs**:
- [ ] Sprint Questions (validated)
- [ ] Assumption Scorecard (5-7 risks)
- [ ] Success Metrics
- [ ] MVP Scope
- [ ] Storyboard (6-frame narrative)

**Activities**:

### Sprint Questions Framework
```markdown
## Highest-Risk Assumptions

**Assumption 1**: [Describe what you believe]
- Why we believe this: [evidence]
- What would prove us wrong: [risk scenario]
- Test method: [how we'll validate in Day 5]

**Assumption 2**: [Next biggest risk]
...
````

### Storyboard Template

```
Frame 1: Character & Context
- Who is this? (specific, not generic)
- Where are they? What time?
- What's their emotional state?

Frame 2: Problem Emerges
- What friction do they encounter?
- How does it escalate?
- Emotional reaction?

Frame 3: "Oh Crap" Moment
- Peak pain/urgency
- Stakes become clear
- Triggers search for solution

Frame 4: Solution Appears
- How do they discover your product?
- Realistic entry point?
- First impression?

Frame 5: "Aha" Moment
- Breakthrough experience
- What changed?
- Emotional shift?

Frame 6: Life After
- New normal state
- Specific benefits
- Would they recommend?
```

**Output Files**:

- `02_DEFINE.md` - Sprint questions & assumptions
- `prototypes/storyboard.md` - 6-frame narrative

---

## 🎨 Phase 3: DESIGN (Day 2-3)

**Goal**: Sketch solutions before building

**Outputs**:

- [ ] Solution Sketches (3-5 approaches)
- [ ] Competitor Analysis
- [ ] Selected Solution + Rationale
- [ ] Detailed Storyboard (refined)

**Activities**:

### Lightning Demos (Benchmarking)

```markdown
## Competitor & Reference Solutions

**Reference 1**: [Product/Service Name]

- How they solve this: [description]
- What works: [3-5 strengths]
- What doesn't: [gaps/weaknesses]
- How we'll differentiate: [our edge]

**Reference 2**: [Next competitor]
...

## Our Differentiation

- [Unique advantage 1]
- [Unique advantage 2]
- [Unique advantage 3]
```

### Crazy 8s Exercise

```
8 Minutes → 8 Ideas

Sketch 1: [Quick idea]
Sketch 2: [Variation]
Sketch 3: [Radical reimagining]
...
Sketch 8: [Most feasible version]
```

**Output Files**:

- `03_DESIGN.md` - All sketches & decision rationale
- `prototypes/solution-sketches/` - Sketches

---

## 📋 Phase 4: PRD & PROMPT ENGINEERING (Day 3-4 morning)

**Goal**: Document what we're building + prepare AI for implementation

**Outputs**:

- [ ] Product Requirements Document (PRD)
- [ ] Acceptance Criteria per feature
- [ ] System Architecture diagram
- [ ] AI Implementation Prompts

### PRD Template

```markdown
# Product Requirements Document

## 1. Overview

- One-liner: [What does this solve?]
- Target user: [Who specifically?]
- Problem statement: [From Day 1 research]
- Success metric: [How we measure success]

## 2. User Stories
```

As a [user persona]
I want [specific behavior]
So that [business outcome]

Acceptance Criteria:

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

```

## 3. Feature List
- **P0 (Must-have MVP)**
  - Feature A
  - Feature B

- **P1 (Should-have)**
  - Feature C

- **P2 (Nice-to-have)**
  - Feature D

## 4. Technical Requirements
- Tech stack: [Frontend/Backend choices]
- Integration points: [APIs, third-party services]
- Data model: [Key entities]
- Performance targets: [Speed/scale requirements]

## 5. Out of Scope
- [What we're NOT building]
- [Why not]
```

### AI Prompt Generation

```markdown
# Implementation Prompts for Claude Code

## Prompt 1: System Architecture
```

You are a senior architect. Design the system for:

- Problem: [From PRD]
- User stories: [From PRD]
- Constraints: [Tech stack, timeline, resources]

Design:

1. Component diagram
2. Data flow
3. API contracts
4. Error handling strategy
5. Scalability plan

```

## Prompt 2: Feature Implementation
```

Implement this user story:
[User story from PRD]

Requirements:

- Tech stack: [From PRD]
- Acceptance criteria: [From PRD]
- Error handling: [Specified patterns]

Deliverables:

- Code with tests
- README documenting

```

## Prompt 3: Testing Strategy
```

Create test plan for:
[Feature/User story]

Coverage:

- Happy path (main flow)
- Edge cases (boundary conditions)
- Error scenarios (failure modes)
- Performance (if relevant)

```

```

**Output Files**:

- `04_PRD.md` - Full product requirements
- `05_PROMPTS.md` - Implementation prompts ready for Claude Code
- `docs/architecture.md` - System design

---

## 💻 Phase 5: BUILD (Day 4)

**Goal**: Implement working prototype with Claude Code

**Inputs**:

- PRD from Phase 4
- Prompts from Phase 4

**Outputs**:

- [ ] Working prototype (Lovable/Cursor/Claude Code)
- [ ] Deployment instructions
- [ ] Testing checklist

**How to Execute**:

### Using Claude Code (Recommended)

1. **Initialize Claude Code session**:

   ```
   @file:04_PRD.md
   @file:05_PROMPTS.md

   Start building using the PRD and prompts above.
   Begin with system architecture, then implement features in priority order.
   ```

2. **Reference the PRD continuously**:
   - Each feature → map to PRD user story
   - Each test → map to acceptance criteria
   - Each error → check PRD error scenarios
3. **Track progress**:

   ```markdown
   ## Build Progress (Day 4)

   - [ ] Feature 1: [In progress | Complete]
   - [ ] Feature 2: [Not started]
   - [ ] Tests: [Status]
   - [ ] Deployment: [Status]
   ```

**Output Files**:

- `06_BUILD.md` - Build progress notes
- Repository with working code
- Deployment guide

---

## 🧪 Phase 6: VALIDATE (Day 5)

**Goal**: Test assumptions with real users (5 people minimum)

**Outputs**:

- [ ] User Interview Notes
- [ ] Pain Point Summary
- [ ] Validation Results (Pass/Fail per assumption)
- [ ] Go/No-Go Decision

### User Testing Template

```markdown
# User Test Session Notes

**Participant**: [Name/ID]
**Date/Time**: [When]
**Duration**: [Length]
**Scenario**: [What task they're doing]

## Observation Notes

### Task 1: [Scenario]

- What did they do?
- Did they succeed?
- Where did they struggle?
- What was their emotional reaction?

### Key Quotes

- "..." — participant
- "..." — participant

### Insights

- [Pattern 1]
- [Pattern 2]

### Pain Points

- [Pain 1 - severity]
- [Pain 2 - severity]
```

### Validation Scorecard

```markdown
## Sprint Questions Validation Results

**Assumption 1**: [From Day 1]

- Status: ✅ VALIDATED | ❌ DISPROVEN | 🟡 INCONCLUSIVE
- Evidence: [From user tests]
- Next: [Build | Pivot | Iterate]

**Assumption 2**: [Next]
...

## Overall Recommendation

**Go/No-Go Decision**: [BUILD | ITERATE | PIVOT | STOP]

**Rationale**: [Why this decision]

**If BUILD**: [Which features first]
**If ITERATE**: [What to change]
**If PIVOT**: [New direction]
```

**Output Files**:

- `07_VALIDATE.md` - All test notes
- `feedback-notes/user-interviews.md` - Raw feedback
- `metrics.md` - Validation results

---

## 🔄 Phase 7: ITERATE (Post-Sprint)

**Goal**: Refine based on learning, plan next sprint

**Outputs**:

- [ ] Iteration Plan (if continuing)
- [ ] Next Sprint Brief (if pivoting)
- [ ] Lessons Captured
- [ ] Go-to-market plan (if shipping)

### Decisions after Day 5 testing:

1. **BUILD** → Go to production
2. **ITERATE** → One-sprint refinement
3. **PIVOT** → Change direction based on learning
4. **STOP** → Learnings captured for future

**Output Files**:

- `08_ITERATE.md` - Iteration plan
- `ROADMAP.md` - Updated prioritization

---

## 📊 Sprint Metrics & Success Criteria

```markdown
# Sprint Success Dashboard

## Business Metrics

- Problem relevance: [Validated with 5+ users?]
- User interest: [% who would use it?]
- Differentiation: [Clear vs competitors?]

## Product Metrics

- MVP scope: [Complete as planned?]
- Code quality: [Tests passing?]
- Performance: [Meets targets?]

## Team Metrics

- Collaboration: [Communication smooth?]
- Decision velocity: [Decisions made promptly?]
- Learning: [Assumptions validated/disproven?]
```

---

## 🚀 Key Differences: Traditional Sprint vs AI Sprint

| Aspect         | Traditional           | AI Sprint                   |
| -------------- | --------------------- | --------------------------- |
| **Prototype**  | Figma mockup (days)   | Lovable/Cursor MVP (hours)  |
| **Handoff**    | Design → Dev          | PRD + Prompts → Claude Code |
| **Iteration**  | Next sprint (2 weeks) | Same sprint or next day     |
| **Cost**       | Design labor          | API tokens (minimal)        |
| **Validation** | 5-day wait            | Immediate feedback          |

---

Would you like me to:

1. **Create a complete GitHub template repository** with all these files?
2. **Generate specific Claude prompts** for each sprint phase?
3. **Map your roles** (Designer, Developer, Marketer, PM, Director) to Claude agents?
4. **Create CI/CD automation** to track sprint progress?
5. **Build a sprint dashboard** (GitHub Project Board)?
