import type { Metadata } from "next";
import DokuoyaResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "影響が続いている";
  const emoji = p.re ?? "😔";
  const ogUrl = `/api/og?type=dokuoya&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `毒親育ち偏差値【${dev}】${emoji} ${rank}｜毒親育ち偏差値テスト`,
    description: `毒親育ち偏差値${dev}（${rank}）でした。過干渉・条件付き愛・罪悪感の植え付け・自己肯定感・共依存の5軸で診断。`,
    openGraph: {
      title: `毒親育ち偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の親子関係影響診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `毒親育ち偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で幼少期の環境の影響を偏差値化しよう",
    },
  };
}

export default async function DokuoyaResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <DokuoyaResultClient params={p} />;
}
