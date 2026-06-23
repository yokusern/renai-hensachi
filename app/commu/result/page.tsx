import type { Metadata } from "next";
import CommuResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "標準的なコミュ力";
  const emoji = p.re ?? "💬";

  const ogUrl = `/api/og?d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}&type=commu`;

  return {
    title: `コミュ力偏差値【${dev}】${emoji} ${rank}｜コミュ力偏差値テスト`,
    description: `コミュ力偏差値${dev}（${rank}）でした。表現力・傾聴力・場の読みなど5軸で診断。あなたも試してみて。`,
    openGraph: {
      title: `コミュ力偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸のコミュ力診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `コミュ力偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問でコミュ力を診断しよう",
    },
  };
}

export default async function CommuResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <CommuResultClient params={p} />;
}
