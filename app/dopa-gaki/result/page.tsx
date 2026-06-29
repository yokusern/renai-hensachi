import type { Metadata } from "next";
import DopaGakiResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "ギリ人間";
  const emoji = p.re ?? "😐";

  const brainPct =
    Number(dev) >= 70 ? 95 :
    Number(dev) >= 60 ? 78 :
    Number(dev) >= 50 ? 56 :
    Number(dev) >= 40 ? 32 : 8;

  const ogUrl = `/api/og?type=dopa-gaki&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}&bp=${brainPct}`;

  return {
    title: `ドパガキ偏差値【${dev}】${emoji} ${rank}｜ドパガキ偏差値テスト`,
    description: `ドパガキ偏差値${dev}（${rank}）でした。脳のドーパミン汚染度${brainPct}%。即時報酬依存・短尺中毒・退屈耐性の5軸で診断。`,
    openGraph: {
      title: `ドパガキ偏差値【${dev}】${emoji} — 脳のドーパミン汚染度${brainPct}%`,
      description: `${rank} — 15問・5軸のドーパミン中毒診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `ドパガキ偏差値【${dev}】${emoji} ${rank}`,
      description: `脳のドーパミン汚染度${brainPct}%。あなたも診断してみて`,
    },
  };
}

export default async function DopaGakiResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <DopaGakiResultClient params={p} />;
}
