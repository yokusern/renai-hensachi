import type { Metadata } from "next";
import InkaResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "標準的な陰キャ";
  const emoji = p.re ?? "🎮";

  const ogUrl = `/api/og?d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}&type=inka`;

  return {
    title: `陰キャ偏差値【${dev}】${emoji} ${rank}｜陰キャ偏差値テスト`,
    description: `陰キャ偏差値${dev}（${rank}）でした。人見知り・ぼっち耐性・陰の趣味など5軸で診断。あなたも試してみて。`,
    openGraph: {
      title: `陰キャ偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の陰キャ度診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `陰キャ偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で陰キャ度を診断しよう",
    },
  };
}

export default async function InkaResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <InkaResultClient params={p} />;
}
