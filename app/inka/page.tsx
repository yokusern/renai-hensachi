import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "陰キャ偏差値テスト — 25問で陰キャ度を数値化",
  description: "25問で陰キャ度を偏差値化。人見知り度・ぼっち耐性・陰の趣味・群れ苦手度・目立ちたくなさの5軸で診断。あなたの陰キャ偏差値は？",
  openGraph: {
    title: "陰キャ偏差値テスト",
    description: "25問で陰キャ度を偏差値化。5軸レーダーチャート付き。",
    images: [{ url: "/api/og?d=50&r=標準的な陰キャ&e=🎮&type=inka", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "陰キャ偏差値テスト",
    description: "25問で陰キャ度を偏差値化。無料。",
  },
};

const AXES = [
  { n: "01", label: "人見知り度", desc: "初対面・電話への苦手意識", icon: "😰" },
  { n: "02", label: "ぼっち耐性", desc: "一人でいることの快適さ", icon: "🌙" },
  { n: "03", label: "陰の趣味力", desc: "インドア・オタク趣味への没頭", icon: "🎮" },
  { n: "04", label: "群れ苦手度", desc: "大人数・群れることへの抵抗感", icon: "🚷" },
  { n: "05", label: "目立ちたくなさ", desc: "空気のように存在したい欲求", icon: "👻" },
];

export default function InkaHome() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #120826 0%, #08051a 60%, #060318 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-24">

        {/* ヒーロー — 極大タイポグラフィ + 左揃え */}
        <div className="mb-16">

          {/* 極大タイポグラフィ — 意外な要素 */}
          <div className="mb-6">
            <p className="font-black leading-[0.85] tracking-tighter" style={{
              fontSize: "clamp(72px, 18vw, 140px)",
              color: "rgba(168,85,247,0.12)",
              userSelect: "none",
              marginBottom: "-0.15em",
            }}>
              陰キャ
            </p>
            <h1 className="font-black leading-[1.0] tracking-tight" style={{ fontSize: "clamp(36px, 7vw, 60px)", color: "#f0e8ff" }}>
              偏差値テスト
            </h1>
          </div>

          <p className="text-sm leading-loose max-w-sm mb-4" style={{ color: "#5a3a8a" }}>
            人見知り・ぼっち耐性・趣味没頭。5軸で数値化して自分がどのタイプか分類される。
          </p>

          <p className="text-xs mb-10 font-mono" style={{ color: "#3a1a5a" }}>
            日本人の約6割が陰キャ傾向と回答
          </p>

          <Link
            href="/inka/quiz"
            className="inline-flex items-center gap-3 font-bold px-8 py-4 text-white transition-opacity duration-200 hover:opacity-85 active:opacity-70"
            style={{
              background: "#9333ea",
              borderRadius: "14px",
              fontSize: "15px",
            }}
          >
            診断スタート
            <span className="font-mono text-xs opacity-70">25問 · 5分 · 無料</span>
          </Link>
        </div>

        {/* 区切り線 */}
        <div className="mb-10" style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }} />

        {/* 5軸 — 番号付き縦リスト、グリッドを使わない */}
        <div className="mb-14">
          <p className="text-xs font-bold mb-6" style={{ color: "#4a2a7a" }}>
            測定軸
          </p>
          <div className="space-y-0">
            {AXES.map((ax) => (
              <div
                key={ax.label}
                className="flex items-center gap-6 py-4"
                style={{ borderBottom: "1px solid rgba(168,85,247,0.06)" }}
              >
                <span className="text-xs font-mono w-6 shrink-0" style={{ color: "#3a1a5a" }}>{ax.n}</span>
                <span className="text-lg w-8 text-center shrink-0">{ax.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>{ax.label}</p>
                  <p className="text-xs" style={{ color: "#3a2a5a" }}>{ax.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-5" style={{ color: "#2a1a4a" }}>
            社交不安尺度・孤独親和性研究・Big Five内向性スケールをもとに設計
          </p>
        </div>

        {/* 偏差値シリーズ — コンパクト */}
        <div className="mb-10">
          <p className="text-xs font-bold mb-4" style={{ color: "#3a2a5a" }}>
            他のテスト
          </p>
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "rgba(233,30,140,0.06)", border: "1px solid rgba(233,30,140,0.15)" }}
            >
              <span>💘</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>恋愛偏差値</p>
                <p className="text-xs" style={{ color: "#4a2a4a" }}>表現力・察し力・告白力</p>
              </div>
            </Link>
            <Link
              href="/commu"
              className="flex-1 flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}
            >
              <span>💬</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>コミュ力偏差値</p>
                <p className="text-xs" style={{ color: "#1a3a55" }}>聞き方・場の読み・開示力</p>
              </div>
            </Link>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-xs" style={{ color: "#2a1a4a" }}>結果は保存されません</p>
          <div className="flex gap-4">
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "#2a1a4a" }}>
              @Yoko_ai_dev
            </a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "#2a1a4a" }}>
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
