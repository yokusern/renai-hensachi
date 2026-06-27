import type { Metadata } from "next";
import ShukatsuResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "標準的就活生";
  const emoji = p.re ?? "📝";
  const ogUrl = `/api/og?type=shukatsu&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `就活偏差値【${dev}】${emoji} ${rank}｜就活偏差値テスト（文系）`,
    description: `就活偏差値${dev}（${rank}）でした。自己分析・業界研究・面接・ES・行動量の5軸で就活力を診断。`,
    openGraph: {
      title: `就活偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の就活力診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `就活偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で就活力を偏差値化しよう",
    },
  };
}

export default async function ShukatsuResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <ShukatsuResultClient params={p} />;
}
