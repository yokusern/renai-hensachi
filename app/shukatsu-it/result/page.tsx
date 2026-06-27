import type { Metadata } from "next";
import ShukatsuItResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "普通のCS学生";
  const emoji = p.re ?? "💻";
  const ogUrl = `/api/og?type=shukatsu-it&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `就活偏差値【${dev}】${emoji} ${rank}｜就活偏差値テスト（IT系）`,
    description: `就活偏差値${dev}（${rank}）でした。技術力・ポートフォリオ・コミュ力・業界理解・自走力の5軸でエンジニア就活力を診断。`,
    openGraph: {
      title: `就活偏差値（IT系）【${dev}】${emoji}`,
      description: `${rank} — 5軸のエンジニア就活力診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `就活偏差値（IT系）【${dev}】${emoji} ${rank}`,
      description: "あなたも25問でエンジニア就活力を偏差値化しよう",
    },
  };
}

export default async function ShukatsuItResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <ShukatsuItResultClient params={p} />;
}
