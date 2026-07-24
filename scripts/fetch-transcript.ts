/**
 * scripts/fetch-transcript.ts
 *
 * mine-hustle.ts에서 자막 추출 부분만 떼어낸 스크립트. Anthropic API 키가
 * 필요 없다 — Claude Code(에이전트)가 이 출력을 직접 읽고 구조화된 JSON을
 * 작성해 data/_inbox/에 넣은 뒤, `npm run approve`로 검증·승격하면 된다.
 *
 * 사용법:
 *   npm run transcript -- <VIDEO_ID_OR_URL>
 */

import { extractVideoId, fetchTranscript } from "./mine-hustle";

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("사용법: npm run transcript -- <VIDEO_ID_OR_URL>");
    process.exit(1);
  }

  const videoId = extractVideoId(input);
  const transcript = await fetchTranscript(videoId);
  console.log(`\n--- TRANSCRIPT (${videoId}) ---\n`);
  console.log(transcript);
}

main().catch((err) => {
  console.error("\n❌ 오류:", err instanceof Error ? err.message : err);
  process.exit(1);
});
