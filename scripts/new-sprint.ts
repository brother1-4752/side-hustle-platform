/**
 * scripts/new-sprint.ts
 *
 * 새 스프린트의 8단계 문서 스켈레톤을 생성한다. SPRINT-002가 8단계 중
 * 2개(01_PRD.md, 02_BUILD.md)만 만들고 나머지를 건너뛴 전례를 막기 위함 —
 * 파일이 미리 존재하면 "안 채워졌다"가 눈에 보이지만, 파일 자체가 없으면
 * 건너뛴 사실조차 드러나지 않는다.
 *
 * 사용법:
 *   npm run new-sprint -- 003
 */

import { mkdirSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const PHASES: [string, string][] = [
  ["01_DISCOVER.md", "Phase 1: DISCOVER"],
  ["02_DEFINE.md", "Phase 2: DEFINE"],
  ["03_DESIGN.md", "Phase 3: DESIGN"],
  ["04_PRD.md", "Phase 4: PRD & PROMPT ENGINEERING"],
  ["05_PROMPTS.md", "Phase 4: AI Implementation Prompts"],
  ["06_BUILD.md", "Phase 5: BUILD"],
  ["07_VALIDATE.md", "Phase 6: VALIDATE"],
  ["08_ITERATE.md", "Phase 7: ITERATE"],
];

function main() {
  const num = process.argv[2];
  if (!num) {
    console.error("사용법: npm run new-sprint -- <번호> (예: 003)");
    process.exit(1);
  }

  const sprintId = `SPRINT-${num.padStart(3, "0")}`;
  const dir = resolve(__dirname, `../docs/sprints/${sprintId}`);

  if (existsSync(dir)) {
    console.error(`❌ 이미 존재합니다: ${dir}`);
    process.exit(1);
  }

  for (const sub of ["user-research", "prototypes", "feedback-notes"]) {
    mkdirSync(resolve(dir, sub), { recursive: true });
    writeFileSync(resolve(dir, sub, ".gitkeep"), "");
  }

  for (const [file, title] of PHASES) {
    writeFileSync(
      resolve(dir, file),
      `# ${title}\n\n> **Sprint**: ${sprintId} | **상태**: ⬜ 미작성\n> 템플릿: SPRINT-TEMPLATE.md 참조\n`,
    );
  }

  console.log(`✅ ${sprintId} 스켈레톤 생성 완료 — docs/sprints/${sprintId}/`);
  console.log(`   8단계 문서 전부 "⬜ 미작성" 상태로 시작됩니다.`);
}

main();
