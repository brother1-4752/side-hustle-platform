/**
 * scripts/mine-hustle.ts
 *
 * 유튜브 부업 영상 → Claude AI → SideHustle JSON 자동 수집 엔진
 *
 * 사용법:
 *   ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/mine-hustle.ts <VIDEO_ID_OR_URL>
 *   npm run mine -- <VIDEO_ID_OR_URL>
 *
 * 예시:
 *   npm run mine -- dQw4w9WgXcQ
 *   npm run mine -- https://youtu.be/dQw4w9WgXcQ
 */

import { YoutubeTranscript } from "youtube-transcript";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import type { SideHustle } from "../types";

const DATA_PATH = resolve(__dirname, "../data/side-hustles.json");

// ─── Step 1: YouTube ID 파싱 ────────────────────────────────────────────────

function extractVideoId(input: string): string {
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/, // youtube.com/watch?v=ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/, // youtu.be/ID
    /embed\/([a-zA-Z0-9_-]{11})/, // youtube.com/embed/ID
    /^([a-zA-Z0-9_-]{11})$/, // raw 11-char ID
  ];

  for (const re of patterns) {
    const m = input.match(re);
    if (m) return m[1];
  }

  throw new Error(`유효하지 않은 YouTube URL 또는 ID: "${input}"`);
}

// ─── Step 2: 자막 추출 ──────────────────────────────────────────────────────

async function fetchTranscript(videoId: string): Promise<string> {
  console.log(`\n📥 [Step 1] 자막 추출 중 — https://youtu.be/${videoId}`);

  let segments;
  try {
    segments = await YoutubeTranscript.fetchTranscript(videoId, { lang: "ko" });
    console.log("  ℹ️  한국어 자막 사용");
  } catch {
    console.log("  ⚠️  한국어 자막 없음 → 기본 언어로 재시도");
    segments = await YoutubeTranscript.fetchTranscript(videoId);
  }

  const text = segments
    .map((s) => s.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  console.log(`  ✅ ${text.length.toLocaleString()}자 추출 완료`);
  return text;
}

// ─── Step 3: Claude API 호출 ────────────────────────────────────────────────

const SYSTEM_PROMPT = `
당신은 한국 부업 정보를 JSON으로 정형화하는 전문 데이터 추출 AI입니다.
제공되는 유튜브 영상 자막을 분석하여, 아래 TypeScript 스펙을 100% 준수하는 단일 JSON 객체만 반환하십시오.

## TypeScript 인터페이스 (필드 21개, 전부 필수)

type Difficulty = "beginner" | "intermediate" | "advanced";

{
  "id": string,               // slug와 동일값. 영문 소문자+하이픈 (예: "ai-shorts-creator")
  "slug": string,             // URL용 영문 소문자+하이픈 (예: "ai-shorts-creator")
  "icon": string,             // 단일 이모지 1개 (예: "🎬")
  "title": string,            // 한국어 부업명 15자 이내 (예: "AI 쇼츠 크리에이터")
  "summary": string,          // 한국어 한 줄 요약 40~80자
  "difficulty": "beginner" | "intermediate" | "advanced",
  "expectedMonthlyIncome": {
    "min": number,            // 월 최저 예상 수익 (원 단위 정수, 예: 500000)
    "max": number,            // 월 최고 예상 수익 (원 단위 정수, 예: 3000000)
    "note": string            // 수익 조건 설명 (예: "조회수·구독자 규모에 따라 크게 다름")
  },
  "initialCost": {
    "amount": number,         // 초기 비용 원 단위 정수 (무료면 0)
    "note": string            // 비용 설명 (예: "기본 스마트폰과 무료 편집앱으로 시작 가능")
  },
  "timeToFirstIncome": string,     // 첫 수입까지 기간 (예: "1~3개월", "2~4주")
  "weeklyTimeRequired": string,    // 주당 필요 시간 (예: "10~15시간/주")
  "requiredHoursPerDay": string,   // 하루 투입 시간 (예: "1~2시간", "30분 이하", "2~4시간")
  "category": string,              // 한국어 카테고리 (예: "콘텐츠 창작", "이커머스", "디지털 서비스", "프리랜서")
  "tags": string[],                // 한국어 태그 3~5개 (예: ["AI활용", "초보가능", "재택", "스마트폰"])
  "isTrending": boolean,           // 최근 급상승 트렌드면 true
  "isPopular": boolean,            // 검증된 대중적 부업이면 true
  "trendScore": number,            // 트렌드 점수 1~100 정수 (수익성·접근성·트렌드 종합)
  "overview": string,              // 한국어 상세 설명 100~200자
  "startGuide": [                  // 4~6단계
    { "step": number, "title": string, "description": string }
  ],
  "relatedTags": string[],         // 관련 부업 슬러그 2~4개 (예: ["youtube-channel", "ai-content-creation"])
  "lastUpdated": string,           // 오늘 날짜 YYYY-MM-DD (예: "2026-06-17")
  "dataVersion": string            // 항상 "2.0"
}

## 출력 규칙 (엄수)

1. JSON 객체만 반환 — 마크다운 코드블록(\`\`\`), 설명 텍스트, 줄바꿈 앞뒤 공백 없이 순수 JSON만
2. 모든 필드 필수 포함 (note 포함)
3. 숫자 필드는 반드시 number 타입 (string 불가)
4. 사용자 노출 텍스트(title, summary, overview, tags, startGuide 등)는 한국어
5. slug·id: 영문 소문자·숫자·하이픈만 허용, 두 값 동일
6. trendScore: 수익성(40%) + 트렌드(40%) + 접근성(20%) 기준 1~100 정수
7. startGuide: step은 1부터 시작, 각 description은 30~80자 실용적 행동 지침
8. 자막에 수치 없으면 합리적 추정값 사용 (예: min: 300000, max: 1500000)
`.trim();

async function callClaude(transcript: string): Promise<SideHustle> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY 환경변수가 없습니다.\n" +
        "  export ANTHROPIC_API_KEY=sk-ant-...",
    );
  }

  // 자막이 너무 길면 앞 8000자만 사용 (토큰 절약)
  const excerpt =
    transcript.length > 8000
      ? transcript.slice(0, 8000) + "\n\n[이하 자막 생략]"
      : transcript;

  console.log(
    `\n🤖 [Step 2] Claude API 호출 중 (${excerpt.length.toLocaleString()}자 입력)`,
  );

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `다음은 유튜브 부업 영상 자막입니다. JSON으로 변환해주세요.\n\n---\n${excerpt}\n---`,
      },
    ],
  });

  const raw =
    response.content[0].type === "text" ? response.content[0].text : "";

  // 마크다운 코드블록 잔재 제거 (방어적 파싱)
  const cleaned = raw
    .replace(/^```(?:json)?\s*/m, "")
    .replace(/\s*```\s*$/m, "")
    .trim();

  let parsed: SideHustle;
  try {
    parsed = JSON.parse(cleaned) as SideHustle;
  } catch {
    console.error("\n[파싱 오류] Claude 원본 응답:\n", raw.slice(0, 500));
    throw new Error("Claude 응답이 유효한 JSON이 아닙니다.");
  }

  console.log("  ✅ 응답 파싱 완료");
  return parsed;
}

// ─── 검증 ───────────────────────────────────────────────────────────────────

const REQUIRED_KEYS: (keyof SideHustle)[] = [
  "id",
  "slug",
  "icon",
  "title",
  "summary",
  "difficulty",
  "expectedMonthlyIncome",
  "initialCost",
  "timeToFirstIncome",
  "weeklyTimeRequired",
  "requiredHoursPerDay",
  "category",
  "tags",
  "isTrending",
  "isPopular",
  "trendScore",
  "overview",
  "startGuide",
  "relatedTags",
  "lastUpdated",
  "dataVersion",
];

function validate(hustle: SideHustle): void {
  const missing = REQUIRED_KEYS.filter(
    (k) => hustle[k] === undefined || hustle[k] === null,
  );
  if (missing.length > 0)
    throw new Error(`필수 필드 누락: ${missing.join(", ")}`);

  if (!["beginner", "intermediate", "advanced"].includes(hustle.difficulty))
    throw new Error(`difficulty 값 오류: "${hustle.difficulty}"`);

  if (!Array.isArray(hustle.tags) || hustle.tags.length === 0)
    throw new Error("tags 배열이 비어있습니다.");

  if (!Array.isArray(hustle.startGuide) || hustle.startGuide.length < 3)
    throw new Error(
      `startGuide 단계 부족: ${hustle.startGuide.length}개 (최소 3개 필요)`,
    );

  const score = hustle.trendScore;
  if (typeof score !== "number" || score < 1 || score > 100)
    throw new Error(`trendScore 범위 오류: ${score} (1~100 정수 필요)`);

  console.log("  ✅ 검증 통과 (21개 필드)");
}

// ─── Step 3: 병합 ───────────────────────────────────────────────────────────

function mergeIntoJson(hustle: SideHustle): void {
  console.log(`\n💾 [Step 3] side-hustles.json에 병합`);

  const existing: SideHustle[] = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

  const dup = existing.find(
    (h) => h.slug === hustle.slug || h.id === hustle.id,
  );
  if (dup) throw new Error(`중복 항목 감지: slug="${dup.slug}"`);

  existing.push(hustle);
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");

  console.log(
    `  ✅ "${hustle.title}" 추가 완료 — 총 ${existing.length}개 항목`,
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error(
      [
        "",
        "🚀 부업레이더 AI 리서치 마이닝 엔진",
        "",
        "사용법:",
        "  ANTHROPIC_API_KEY=sk-ant-... npx tsx scripts/mine-hustle.ts <VIDEO_ID_OR_URL>",
        "  npm run mine -- <VIDEO_ID_OR_URL>",
        "",
        "예시:",
        "  npm run mine -- dQw4w9WgXcQ",
        "  npm run mine -- https://youtu.be/dQw4w9WgXcQ",
        "",
      ].join("\n"),
    );
    process.exit(1);
  }

  try {
    const videoId = extractVideoId(input);
    const transcript = await fetchTranscript(videoId);
    const hustle = await callClaude(transcript);

    console.log(`\n📋 [미리보기]`);
    console.log(`   제목:     ${hustle.title}`);
    console.log(`   슬러그:   ${hustle.slug}`);
    console.log(`   카테고리: ${hustle.category}`);
    console.log(`   난이도:   ${hustle.difficulty}`);
    console.log(
      `   수익:     ${hustle.expectedMonthlyIncome.min.toLocaleString()}~${hustle.expectedMonthlyIncome.max.toLocaleString()}원/월`,
    );
    console.log(`   하루 투입: ${hustle.requiredHoursPerDay}`);
    console.log(`   태그:     ${hustle.tags.join(", ")}`);
    console.log(`   트렌드 점수: ${hustle.trendScore}/100`);

    validate(hustle);
    mergeIntoJson(hustle);

    console.log("\n🎉 완료! npm run build 로 SSG 페이지 생성을 확인하세요.\n");
  } catch (err) {
    console.error("\n❌ 오류:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
