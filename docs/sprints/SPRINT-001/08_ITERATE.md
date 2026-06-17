# SPRINT-001: ITERATE 단계 결과 보고서

> **Sprint**: SPRINT-001 | **Post-Sprint** | **Goal**: 학습을 바탕으로 다듬고, 다음 스프린트를 계획한다
> **상태**: ✅ 완료 — Sprint 002 진입 승인

## 📋 Outputs Checklist

- [x] Iteration Plan (계속 진행하는 경우)
- [x] Next Sprint Brief (Sprint 002 방향 확정)
- [x] Lessons Captured
- [x] Go-to-market 계획 (Validate 결과 기반)

## 🚦 결정: ITERATE 후 BUILD

- **유저 피드백 반영**: 직장인 페르소나의 이탈을 막기 위해 '하루 권장 투입 시간' 지표가 필수적임을 확인.
- **반자동 UI 수정**: `MetricPanel`에 해당 지표 레이아웃을 확장할 수 있도록 구조화 예정.
- **Sprint 002 연계**: AI 수집 에이전트가 유튜브 자막 등을 파싱하여 데이터를 가공할 때 `requiredHoursPerDay` 필드를 추출하도록 프롬프트 스펙을 확정하고 Sprint 002로 진입함.

## 📊 개선 항목 (우선순위 순)

| 우선순위 | 개선 항목                        | 근거                                   | 대상 Sprint |
| -------- | -------------------------------- | -------------------------------------- | ----------- |
| 1        | `requiredHoursPerDay` 필드 추가  | 직장인 이탈 원인 (정정훈, 07_VALIDATE) | Sprint 002  |
| 2        | MetricPanel 5번째 지표 슬롯 확장 | 하루 투입 시간 UI 표시                 | Sprint 002  |
| 3        | 다중 태그 필터 (복합 쿼리스트링) | 2/5명이 다중 필터 니즈 표현            | Sprint 002  |

## 📚 Lessons Captured

### 잘 된 것 (Keep)

- 매거진형 카드 디자인 — 신뢰감 + 클릭 유도에 효과적 (CTR 100%)
- MetricPanel 4개 지표 — 체류 시간 75.4초로 목표(60초) 초과 달성
- 정적 SSG + Vercel 배포 조합 — 빌드 속도 및 SEO 최적화 효율적

### 개선할 것 (Improve)

- 데이터 스키마에 직장인 관심 지표(`requiredHoursPerDay`) 미포함 — 다음 스크래핑 스펙에 반영 필수
- 단일 태그 필터만으로는 교차 조건 검색 불가 — 복합 필터 설계 필요

### 하지 말아야 할 것 (Stop)

- 데이터 구조 설계 시 직장인 맥락(시간 제약) 제외 — 핵심 페르소나 이탈 원인이 됨

### 시도해볼 것 (Try)

- 복합 쿼리스트링 필터 (`/?tag=AI활용&difficulty=beginner`)
- AI 에이전트 자동 데이터 수집 파이프라인 (유튜브 자막 파싱)

## 🗺️ Next Sprint Brief

**Sprint 번호**: SPRINT-002
**목표**: AI 자동 데이터 수집 파이프라인 구축 + `requiredHoursPerDay` 필드 포함 데이터 확장 + 다중 태그 필터 구현
**핵심 가설**: 하루 투입 시간 지표를 추가하면 직장인 페르소나의 이탈률이 감소한다
**예상 기간**: 1주
**우선 검증할 것**: `requiredHoursPerDay` 추가 후 직장인 페르소나 재테스트 — 이탈 지점 재확인

## 📁 Output Files

| 파일             | 설명                      | 상태    |
| ---------------- | ------------------------- | ------- |
| `08_ITERATE.md`  | Iteration Plan (이 파일)  | ✅ 완료 |
| `07_VALIDATE.md` | Validate 결과 (근거 문서) | ✅ 완료 |
