import type { Metadata } from "next";
import OshiKakinResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "中堅オタク";
  const emoji = p.re ?? "⭐";
  const ogUrl = `/api/og?type=oshi-kakin&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `推し課金偏差値【${dev}】${emoji} ${rank}｜推し課金偏差値テスト`,
    description: `推し課金偏差値${dev}（${rank}）でした。課金額・遠征力・グッズ収集度・布教力・沼の深さの5軸で診断。`,
    openGraph: {
      title: `推し課金偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の推し活診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `推し課金偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で推し活レベルを偏差値化しよう",
    },
  };
}

export default async function OshiKakinResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <OshiKakinResultClient params={p} />;
}
