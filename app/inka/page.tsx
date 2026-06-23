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

const CATEGORIES = [
  { icon: "😰", label: "人見知り度", desc: "初対面・電話への苦手意識" },
  { icon: "🌙", label: "ぼっち耐性", desc: "一人でいることの快適さ" },
  { icon: "🎮", label: "陰の趣味力", desc: "インドア・オタク趣味への没頭" },
  { icon: "🚷", label: "群れ苦手度", desc: "大人数・群れることへの抵抗感" },
  { icon: "👻", label: "目立ちたくなさ", desc: "空気のように存在したい欲求" },
];

export default function InkaHome() {
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #120826 0%, #08051a 60%, #060318 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#a855f7" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#6d28d9" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-16">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}
          >
            🌙 陰キャ度診断
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
            style={{ letterSpacing: "-0.03em", color: "#f0e8ff" }}
          >
            陰キャ偏差値
            <br />
            <span style={{ color: "#a855f7" }}>テスト</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: "#5a4a7a" }}>
            25問に答えるだけで、あなたの陰キャ度を偏差値で数値化。
            <br />
            5軸のレーダーチャートで「どんな陰キャか」を可視化します。
          </p>

          <Link
            href="/inka/quiz"
            className="inline-flex items-center gap-3 text-lg font-bold px-10 py-5 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              boxShadow: "0 8px 32px rgba(168,85,247,0.4)",
            }}
          >
            診断スタート
            <span className="text-xl">→</span>
          </Link>

          <p className="mt-4 text-sm" style={{ color: "#3a2a5a" }}>
            所要時間 約5分 ・ 全25問 ・ 無料
          </p>
        </div>

        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5 text-center" style={{ color: "#5a4a7a" }}>
            診断する5つの軸
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <span className="text-2xl shrink-0">{cat.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>{cat.label}</p>
                  <p className="text-xs" style={{ color: "#3a2a5a" }}>{cat.desc}</p>
                </div>
              </div>
            ))}
            <div className="hidden sm:block" />
          </div>
        </div>

        {/* 偏差値シリーズ */}
        <div
          className="rounded-2xl p-5 mb-10"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center" style={{ color: "#3a2a5a" }}>
            偏差値シリーズ
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(233,30,140,0.2)" }}
            >
              <span className="text-xl">💘</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>恋愛偏差値テスト</p>
                <p className="text-xs" style={{ color: "#3a2a4a" }}>恋愛力を5軸で診断 → Gottman研究ベース</p>
              </div>
            </Link>
            <Link
              href="/commu"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(14,165,233,0.2)" }}
            >
              <span className="text-xl">💬</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>コミュ力偏差値テスト</p>
                <p className="text-xs" style={{ color: "#1a3a55" }}>コミュ力を5軸で診断 → SSI研究ベース</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs leading-relaxed" style={{ color: "#2a1a4a" }}>
          調査根拠: 約6割が陰キャ傾向（20%「陰キャ」+ 39%「どちらかといえば陰キャ」と回答）。
          <br />
          設問は社交不安尺度・孤独親和性研究・Big Fiveをもとに設計。
        </p>
      </div>

      <footer className="relative z-10 w-full text-center py-8" style={{ color: "#2a1a4a" }}>
        <p className="text-xs">
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">
            Portfolio
          </a>
        </p>
      </footer>
    </main>
  );
}
