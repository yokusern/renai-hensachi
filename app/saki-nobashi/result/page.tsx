import type { Metadata } from "next";
import SakiNobashiResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "ギリギリ常習犯";
  const emoji = p.re ?? "😅";
  const ogUrl = `/api/og?type=saki-nobashi&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `先延ばし偏差値【${dev}】${emoji} ${rank}｜先延ばし偏差値テスト`,
    description: `先延ばし偏差値${dev}（${rank}）でした。回避・決断・楽観バイアス・自己管理・完璧主義の5軸で診断。`,
    openGraph: {
      title: `先延ばし偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の先延ばし診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `先延ばし偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問で先延ばし度を偏差値化しよう",
    },
  };
}

export default async function SakiNobashiResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <SakiNobashiResultClient params={p} />;
}
