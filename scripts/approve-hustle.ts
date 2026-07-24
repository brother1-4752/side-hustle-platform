/**
 * scripts/approve-hustle.ts
 *
 * `mine-hustle.ts`가 data/_inbox/에 저장한 검수 대기 항목을 사람이 검토한 뒤
 * side-hustles.json(공개 데이터)으로 승격시킨다.
 *
 * 사용법:
 *   npm run approve -- <slug>
 */

import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { resolve } from "path";
import type { SideHustle } from "../types";
import { validate } from "./mine-hustle";

const DATA_PATH = resolve(__dirname, "../data/side-hustles.json");
const INBOX_DIR = resolve(__dirname, "../data/_inbox");

function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("사용법: npm run approve -- <slug>");
    process.exit(1);
  }

  const inboxPath = resolve(INBOX_DIR, `${slug}.json`);
  if (!existsSync(inboxPath)) {
    console.error(`❌ 검수 대기 항목이 없습니다: ${inboxPath}`);
    process.exit(1);
  }

  const hustle: SideHustle = JSON.parse(readFileSync(inboxPath, "utf-8"));

  // mine-hustle.ts가 만들지 않은 항목(직접 손으로 작성한 JSON 등)도
  // 같은 구조 검증을 통과해야 승격 가능
  validate(hustle);

  const existing: SideHustle[] = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

  const dup = existing.find(
    (h) => h.slug === hustle.slug || h.id === hustle.id,
  );
  if (dup) throw new Error(`중복 항목 감지: slug="${dup.slug}"`);

  hustle.reviewStatus = "approved";
  existing.push(hustle);
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + "\n");
  unlinkSync(inboxPath);

  console.log(
    `✅ "${hustle.title}" 승인 완료 — side-hustles.json 총 ${existing.length}개 항목`,
  );
}

main();
