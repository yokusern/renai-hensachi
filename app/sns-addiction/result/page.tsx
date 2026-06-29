import type { Metadata } from "next";
import SnsResultClient from "./ResultClient";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const p = await searchParams;
  const dev = p.d ?? "50";
  const rank = p.r ?? "ギリギリ人間";
  const emoji = p.re ?? "😵";

  const brainPct =
    Number(dev) >= 70 ? 92 :
    Number(dev) >= 60 ? 74 :
    Number(dev) >= 50 ? 51 :
    Number(dev) >= 40 ? 33 : 12;

  const ogUrl = `/api/og?type=sns-addiction&d=${dev}&r=${encodeURIComponent(rank)}&e=${encodeURIComponent(emoji)}&bp=${brainPct}`;

  return {
    title: `SNS中毒度偏差値【${dev}】${emoji} ${rank}｜SNS中毒度偏差値テスト`,
    description: `SNS中毒度偏差値${dev}（${rank}）でした。脳の${brainPct}%がインターネットに支配されています。通知依存・FOMO・時間溶解・離脱不安の5軸で診断。`,
    openGraph: {
      title: `SNS中毒度偏差値【${dev}】${emoji} — 脳の${brainPct}%支配`,
      description: `${rank} — 25問・5軸のSNS中毒診断`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `SNS中毒度偏差値【${dev}】${emoji} ${rank}`,
      description: `脳の${brainPct}%がインターネットに支配されています。あなたも診断してみて`,
    },
  };
}

export default async function SnsAddictionResultPage({ searchParams }: Props) {
  const p = await searchParams;
  return <SnsResultClient params={p} />;
}
