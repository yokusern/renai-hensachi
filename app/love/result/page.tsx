import type { Metadata } from "next";
import LoveResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "標準的な恋愛力";
  const emoji = p.re ?? "💙";
  const ogUrl = `/api/og?type=renai&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `恋愛偏差値【${dev}】${emoji} ${rank}｜恋愛偏差値テスト`,
    description: `恋愛偏差値${dev}（${rank}）でした。5軸で恋愛力を診断。あなたも試してみて。`,
    openGraph: {
      title: `恋愛偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の恋愛力診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `恋愛偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で恋愛力を診断しよう",
    },
  };
}

export default async function LoveResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <LoveResultClient params={p} />;
}
