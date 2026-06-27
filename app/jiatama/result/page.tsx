import type { Metadata } from "next";
import JiatamaResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "平均的";
  const emoji = p.re ?? "📊";
  const ogUrl = `/api/og?type=jiatama&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `地頭偏差値【${dev}】${emoji} ${rank}｜地頭偏差値テスト`,
    description: `地頭偏差値${dev}（${rank}）でした。パターン認識・論理推論・直感抑制など5軸で認知力を診断。`,
    openGraph: {
      title: `地頭偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の認知力診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `地頭偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で地頭力を偏差値化しよう",
    },
  };
}

export default async function JiatamaResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <JiatamaResultClient params={p} />;
}
