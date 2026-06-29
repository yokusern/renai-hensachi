import type { Metadata } from "next";
import SeikakuWarusaResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "ちょい毒舌キャラ";
  const emoji = p.re ?? "😏";
  const ogUrl = `/api/og?type=seikaku-warusa&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `性格の悪さ偏差値【${dev}】${emoji} ${rank}｜性格の悪さ偏差値テスト`,
    description: `性格の悪さ偏差値${dev}（${rank}）でした。マウント癖・計算高さ・共感の薄さ・嫉妬深さ・利用上手度の5軸で診断。`,
    openGraph: {
      title: `性格の悪さ偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の性格診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `性格の悪さ偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で性格の悪さを偏差値化しよう",
    },
  };
}

export default async function SeikakuWarusaResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <SeikakuWarusaResultClient params={p} />;
}
