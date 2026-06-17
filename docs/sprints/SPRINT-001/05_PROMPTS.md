# Phase 4: AI Prompt Engineering

> **Sprint**: SPRINT-001 | **Day**: 3-4 오전 | **Goal**: Claude Code 구현을 위한 프롬프트를 준비한다

---

## 📋 Outputs Checklist

- [ ] System Architecture 프롬프트
- [ ] 기능별 구현 프롬프트
- [ ] 테스트 전략 프롬프트
- [ ] 프롬프트 검토 및 정제 완료

---

## 사용 방법

> Claude Code 세션을 시작할 때 아래 순서대로 프롬프트를 사용하세요.

```
@file:04_PRD.md
@file:05_PROMPTS.md

위의 PRD와 프롬프트를 사용하여 빌드를 시작하세요.
시스템 아키텍처부터 시작하고, 우선순위 순서로 기능을 구현하세요.
```

---

## Prompt 1: System Architecture

```
당신은 시니어 아키텍트입니다. 다음을 위한 시스템을 설계하세요:

- 문제: [04_PRD.md의 Problem Statement]
- 사용자 스토리: [04_PRD.md의 User Stories]
- 제약 조건: [기술 스택, 타임라인, 리소스]

설계 항목:
1. 컴포넌트 다이어그램
2. 데이터 흐름
3. API 계약
4. 에러 처리 전략
5. 확장성 계획
```

---

## Prompt 2: Feature Implementation — [기능명]

> P0 기능마다 하나씩 작성하세요.

### Feature A: [기능명]

```
다음 사용자 스토리를 구현하세요:
[04_PRD.md의 User Story 1]

요구사항:
- 기술 스택: [04_PRD.md의 Technical Requirements]
- Acceptance Criteria: [04_PRD.md의 Acceptance Criteria]
- 에러 처리: [지정된 패턴]

산출물:
- 테스트가 포함된 코드
- 사용 방법을 설명하는 README 섹션
```

---

### Feature B: [기능명]

```
다음 사용자 스토리를 구현하세요:
[04_PRD.md의 User Story 2]

요구사항:
- 기술 스택: [작성]
- Acceptance Criteria: [작성]
- 에러 처리: [작성]

산출물:
- 테스트가 포함된 코드
- README 문서
```

---

### Feature C: [기능명]

```
다음 사용자 스토리를 구현하세요:
[04_PRD.md의 User Story 3]

요구사항:
- 기술 스택: [작성]
- Acceptance Criteria: [작성]
- 에러 처리: [작성]

산출물:
- 테스트가 포함된 코드
- README 문서
```

---

## Prompt 3: Testing Strategy

```
다음에 대한 테스트 계획을 작성하세요:
[기능/사용자 스토리]

커버리지:
- Happy Path (메인 플로우)
- Edge Cases (경계 조건)
- Error Scenarios (실패 모드)
- Performance (해당되는 경우)

형식:
- 각 케이스에 대한 테스트 코드 포함
- 예상 결과 명시
```

---

## Prompt 4: Deployment

```
다음 스택에 대한 배포 가이드를 작성하세요:
- 환경: [개발/스테이징/프로덕션]
- 기술 스택: [작성]
- 호스팅: [작성]

포함 항목:
1. 환경 변수 설정
2. 빌드 명령어
3. 배포 단계
4. 헬스체크 방법
5. 롤백 절차
```

---

## 📝 프롬프트 사용 로그

> 실제 사용 시 결과와 피드백을 여기에 기록하세요.

| 프롬프트   | 사용 일시 | 결과   | 개선 사항 |
| ---------- | --------- | ------ | --------- |
| Prompt 1   | [날짜]    | [결과] | [개선점]  |
| Prompt 2-A | [날짜]    | [결과] | [개선점]  |
| Prompt 2-B | [날짜]    | [결과] | [개선점]  |
| Prompt 3   | [날짜]    | [결과] | [개선점]  |

---

## 📁 Output Files

| 파일            | 설명                         | 상태      |
| --------------- | ---------------------------- | --------- |
| `05_PROMPTS.md` | 구현 프롬프트 모음 (이 파일) | 🟡 진행중 |
| `06_BUILD.md`   | 빌드 진행 노트               | ⬜ 미작성 |
