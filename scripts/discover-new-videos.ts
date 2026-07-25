/**
 * scripts/discover-new-videos.ts
 *
 * 등록된 신뢰 채널(scripts/trusted-channels.json)의 무료 RSS 피드를 읽어,
 * 아직 검토하지 않은(data/_seen-videos.json에 없는) 새 영상을 찾아 출력한다.
 * YouTube Data API 키·쿼터가 전혀 필요 없다 — 채널별 공개 RSS만 사용.
 *
 * 사용법:
 *   npm run discover
 */

import { readFileSync } from "fs";
import { resolve } from "path";

interface Channel {
  name: string;
  channelId: string;
  note?: string;
}

interface VideoEntry {
  videoId: string;
  title: string;
  published: string;
}

const CHANNELS_PATH = resolve(__dirname, "trusted-channels.json");
const SEEN_PATH = resolve(__dirname, "../data/_seen-videos.json");

function unescapeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchChannelEntries(channelId: string): Promise<VideoEntry[]> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  );
  if (!res.ok) throw new Error(`RSS 요청 실패 (HTTP ${res.status})`);
  const xml = await res.text();

  return xml
    .split("<entry>")
    .slice(1)
    .map((chunk) => ({
      videoId: chunk.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? "",
      title: unescapeXml(chunk.match(/<title>(.*?)<\/title>/)?.[1] ?? ""),
      published: chunk.match(/<published>(.*?)<\/published>/)?.[1] ?? "",
    }))
    .filter((e) => e.videoId);
}

async function main() {
  const channels: Channel[] = JSON.parse(readFileSync(CHANNELS_PATH, "utf-8"));
  const seen: Record<string, unknown> = JSON.parse(
    readFileSync(SEEN_PATH, "utf-8"),
  );

  console.log(`🔍 신뢰 채널 ${channels.length}개에서 새 영상 탐색 중...\n`);

  let found = 0;
  for (const channel of channels) {
    let entries: VideoEntry[];
    try {
      entries = await fetchChannelEntries(channel.channelId);
    } catch (err) {
      console.error(
        `  ⚠️  ${channel.name}: ${err instanceof Error ? err.message : err}`,
      );
      continue;
    }

    const newEntries = entries.filter((e) => !seen[e.videoId]);
    if (newEntries.length === 0) continue;

    console.log(
      `📺 ${channel.name}${channel.note ? ` — ⚠️  ${channel.note}` : ""}`,
    );
    for (const e of newEntries) {
      console.log(
        `  - [${e.videoId}] ${e.title} (${e.published.slice(0, 10)})`,
      );
      console.log(`    https://www.youtube.com/watch?v=${e.videoId}`);
      found++;
    }
    console.log();
  }

  if (found === 0) {
    console.log("새로 검토할 영상이 없습니다.");
  } else {
    console.log(
      `총 ${found}개 신규 영상 발견.\n` +
        `각각 npm run transcript -- <videoId> 로 자막 확인 후,\n` +
        `채택하면 data/_inbox/에 등록, 제외하면 npm run reject -- <videoId> "사유" 로 기록하세요.`,
    );
  }
}

main();
