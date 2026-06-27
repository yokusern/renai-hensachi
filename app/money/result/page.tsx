import type { Metadata } from "next";
import MoneyResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "普通の金銭感覚";
  const emoji = p.re ?? "💴";
  const ogUrl = `/api/og?type=money&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}`;
  return {
    title: `お金リテラシー偏差値【${dev}】${emoji} ${rank}｜お金リテラシー偏差値テスト`,
    description: `お金リテラシー偏差値${dev}（${rank}）でした。貯蓄・投資・借入・制度活用・リスク認識の5軸で金融リテラシーを診断。`,
    openGraph: {
      title: `お金リテラシー偏差値【${dev}】${emoji}`,
      description: `${rank} — 5軸の金融リテラシー診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `お金リテラシー偏差値【${dev}】${emoji} ${rank}`,
      description: "あなたも25問でお金リテラシーを偏差値化しよう",
    },
  };
}

export default async function MoneyResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <MoneyResultClient params={p} />;
}
