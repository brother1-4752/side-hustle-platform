/**
 * scripts/reject-video.ts
 *
 * 검토는 했지만 등록하지 않기로 한 영상을 data/_seen-videos.json에 기록해,
 * discover-new-videos.ts가 다음 실행 때 같은 영상을 다시 추천하지 않게 한다.
 *
 * 사용법:
 *   npm run reject -- <videoId> "사유"
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const SEEN_PATH = resolve(__dirname, "../data/_seen-videos.json");

function main() {
  const [videoId, reason] = process.argv.slice(2);
  if (!videoId || !reason) {
    console.error('사용법: npm run reject -- <videoId> "사유"');
    process.exit(1);
  }

  const seen = JSON.parse(readFileSync(SEEN_PATH, "utf-8"));
  seen[videoId] = {
    status: "rejected",
    reason,
    date: new Date().toISOString().slice(0, 10),
  };
  writeFileSync(SEEN_PATH, JSON.stringify(seen, null, 2) + "\n");

  console.log(`✅ ${videoId} 제외 기록 완료 — 사유: ${reason}`);
}

main();
