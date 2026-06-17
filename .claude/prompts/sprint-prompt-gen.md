# Prompt: Sprint Prompt Generation

> **Phase 4 — PRD & PROMPT ENGINEERING**
> 이 프롬프트는 Claude가 PRD를 기반으로 Claude Code 구현에 사용할 프롬프트를 자동 생성하는 단계입니다.
> `04_PRD.md`가 완성된 후 실행하세요.
> 결과물은 `docs/sprints/SPRINT-XXX/05_PROMPTS.md`에 기록합니다.

---

## Claude 실행 지침

시작 전 확인:
1. `04_PRD.md` 완성 여부 확인 (User Stories, Acceptance Criteria, 기술 스택 모두 작성됨)
2. `03_DESIGN.md`에서 선택된 솔루션 확인
3. `02_DEFINE.md`에서 Sprint Questions 확인

---

## STEP 1: PRD 내용 파악 및 검증

```
04_PRD.md를 읽고 Claude Code 프롬프트 생성을 시작합니다.

먼저 PRD에서 핵심 내용을 추출하겠습니다:

[Claude가 자동 추출]:
- 제품 One-liner: [작성]
- 기술 스택: [작성]
- P0 기능 목록: [작성]
- User Stories: [개수]개
- 가장 복잡한 기능: [작성]

누락되거나 불명확한 내용이 있나요?
특히 기술 스택이 확정되지 않았다면 지금 결정해봅시다.
```

**기술 스택 미결정 시 Claude의 추천 프로세스**:

```
다음 기준으로 기술 스택을 추천합니다:
- 팀 숙련도: [확인]
- 배포 목표: [웹/모바일/API]
- 빌드 기간: Day 4 (1일)
- 외부 서비스 연동: [있음/없음]

추천 스택: [스택명]
이유: [작성]

동의하시나요?
```

---

## STEP 2: System Architecture 프롬프트 생성

PRD 내용을 기반으로 Claude가 자동 생성:

```markdown
## [자동 생성] Prompt 1: System Architecture

```
당신은 시니어 소프트웨어 아키텍트입니다.
다음 제품의 MVP 시스템 아키텍처를 설계해주세요.

## 제품 개요
- 목적: [04_PRD.md One-liner]
- 타겟 사용자: [04_PRD.md Target User]

## 구현할 기능 (P0)
[04_PRD.md P0 기능 목록 자동 삽입]

## 기술 제약
- 스택: [04_PRD.md 기술 스택]
- 기간: 1일 (빠른 프로토타입)
- 팀 규모: 1명 + Claude Code

## 요청 사항
1. 컴포넌트 구조 (폴더/파일 트리)
2. 데이터 모델 (핵심 엔티티와 관계)
3. API 엔드포인트 목록 (있는 경우)
4. 외부 서비스 연동 계획
5. 프로젝트 초기화 명령어

제약: 과도한 추상화 금지. 지금 당장 작동하는 MVP에만 집중하세요.
```
```

---

## STEP 3: 기능별 구현 프롬프트 생성

P0 기능 각각에 대해 Claude가 자동 생성:

```
04_PRD.md의 P0 기능 [개수]개에 대한 구현 프롬프트를 생성합니다.
각 User Story와 Acceptance Criteria를 프롬프트에 포함합니다.
```

**Claude가 자동 생성하는 기능 프롬프트 형식**:

```markdown
## [자동 생성] Prompt 2-[번호]: [기능명]

```
다음 User Story를 구현해주세요.

## User Story
[04_PRD.md에서 해당 User Story 자동 삽입]

## Acceptance Criteria
[04_PRD.md에서 해당 AC 자동 삽입]

## 기술 요구사항
- 스택: [기술 스택]
- 아키텍처: Prompt 1의 설계를 따를 것
- 에러 처리: 사용자에게 친화적인 에러 메시지 표시

## 산출물
1. 작동하는 코드 (주석 포함)
2. 이 기능을 테스트하는 방법 (1-2개 테스트 케이스)
3. 다음 기능 연동 시 주의사항

제약: 이 기능만 구현하고 다른 기능은 TODO로 표시하세요.
```
```

---

## STEP 4: 테스트 전략 프롬프트 생성

```markdown
## [자동 생성] Prompt 3: Testing Strategy

```
다음 MVP의 테스트 계획을 작성하고 핵심 테스트를 구현해주세요.

## 테스트 대상 기능
[P0 기능 목록 자동 삽입]

## Acceptance Criteria 목록
[전체 AC 자동 삽입]

## 테스트 범위 (우선순위 순)
1. Happy Path: 사용자가 목표를 달성하는 정상 흐름
2. Critical Error: 앱이 다운되거나 데이터가 손실되는 경우
3. Edge Case: 빈 입력, 긴 텍스트, 중복 요청 등

## 산출물
- 각 케이스별 테스트 코드
- 수동 테스트 체크리스트 (Day 5 사용자 테스트 전 실행용)

제약: 전체 커버리지보다 치명적 버그 방지에 집중하세요.
```
```

---

## STEP 5: 배포 프롬프트 생성

```markdown
## [자동 생성] Prompt 4: Deployment

```
다음 MVP를 [배포 환경]에 배포하는 방법을 단계별로 안내하고
배포 스크립트를 작성해주세요.

## 기술 스택
[스택 자동 삽입]

## 배포 환경
- 플랫폼: [Vercel / Railway / Supabase 등]
- 도메인: 임시 URL 사용 가능
- 목적: Day 5 사용자 테스트용 (안정성 > 성능)

## 필요한 산출물
1. 환경 변수 목록 (.env.example)
2. 빌드 및 배포 명령어
3. 배포 후 헬스체크 방법
4. 빠른 롤백 방법

제약: 5분 안에 배포 완료 가능해야 합니다.
```
```

---

## STEP 6: 프롬프트 검토 및 05_PROMPTS.md 저장

```
생성된 프롬프트들을 검토해주세요:

1. 각 프롬프트가 해당 기능의 Acceptance Criteria를 모두 포함하나요?
2. 기술 스택 정보가 정확하게 반영되었나요?
3. 누락된 기능이 있나요?

수정이 필요한 프롬프트 번호를 알려주시면 즉시 수정하겠습니다.

확인이 완료되면 05_PROMPTS.md에 모두 저장합니다.
```

완료 후:

```
PRD & Prompt Engineering 단계가 완료되었습니다. ✅

생성된 프롬프트:
- Prompt 1: System Architecture
- Prompt 2-[A~C]: 기능별 구현 ([개수]개)
- Prompt 3: Testing Strategy
- Prompt 4: Deployment

다음 단계: BUILD
→ sprint-build.md 프롬프트를 사용하여 계속하세요.
→ Claude Code 세션에서 05_PROMPTS.md를 @file로 참조하세요.
```
