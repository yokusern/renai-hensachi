import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コミュ力偏差値テスト — 25問で人間関係スキルを数値化",
  description: "25問に答えるだけで、あなたのコミュ力を偏差値で診断。表現力・傾聴力・場の読み・自己開示力・関係維持力の5軸でレーダーチャート表示。",
  openGraph: {
    title: "コミュ力偏差値テスト",
    description: "25問でコミュニケーション力を偏差値化。5軸レーダーチャート付き。",
    images: [{ url: "/api/og?d=50&r=標準的なコミュ力&e=💬&type=commu", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "コミュ力偏差値テスト",
    description: "25問でコミュ力を偏差値化。無料。",
  },
};

const AXES = [
  { label: "表現力", desc: "伝える・言語化する力", icon: "🗣️", color: "#0ea5e9" },
  { label: "傾聴力", desc: "聞く・記憶する・共感する", icon: "👂", color: "#38bdf8" },
  { label: "場の読み", desc: "タイミング・非言語情報", icon: "🎯", color: "#7dd3fc" },
  { label: "自己開示力", desc: "オープンさ・弱みを見せる", icon: "🔓", color: "#0ea5e9" },
  { label: "関係維持力", desc: "つながりを長く保つ力", icon: "🤝", color: "#38bdf8" },
];

export default function CommuHome() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #060e1c 60%, #060b15 100%)" }}
    >
      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "#0ea5e9", opacity: 0.05 }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl" style={{ background: "#7c3aed", opacity: 0.05 }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-24">

        {/* ヒーロー — 左揃え + CTA先出し */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-8" style={{ color: "#1a4a6a" }}>
            COMMUNICATION
          </p>

          <h1 className="font-black leading-[0.9] tracking-tight mb-6" style={{ fontSize: "clamp(48px, 9vw, 80px)", color: "#e8f4ff" }}>
            コミュ力は<br />
            <span style={{ color: "#0ea5e9" }}>聞き方</span>に<br />
            出る
          </h1>

          <p className="text-sm leading-loose max-w-sm mb-10" style={{ color: "#2a5a77" }}>
            話す量で決まらない。傾聴力・場の読み・自己開示力を5軸で数値化。
            どこが詰まっているか25問で分かる。
          </p>

          <Link
            href="/commu/quiz"
            className="inline-flex items-center gap-3 font-bold px-8 py-4 text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
              boxShadow: "0 8px 32px rgba(14,165,233,0.35)",
              borderRadius: "14px",
              fontSize: "15px",
            }}
          >
            診断スタート
            <span className="font-mono text-xs opacity-70">25問 · 5分 · 無料</span>
          </Link>
        </div>

        {/* 区切り線 */}
        <div className="mb-10" style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }} />

        {/* 5軸 — 縦リスト、スコアバー風テイク */}
        <div className="mb-14">
          <p className="text-xs font-mono tracking-[0.25em] uppercase mb-6" style={{ color: "#1a4a6a" }}>
            DIAGNOSIS AXES
          </p>
          <div className="space-y-1">
            {AXES.map((ax, i) => (
              <div
                key={ax.label}
                className="flex items-center gap-5 px-5 py-4 rounded-xl"
                style={{
                  background: i % 2 === 0 ? "rgba(14,165,233,0.04)" : "transparent",
                  borderLeft: `2px solid rgba(14,165,233,${0.12 + i * 0.04})`,
                }}
              >
                <span className="text-xl w-8 text-center shrink-0">{ax.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: "#e8f4ff" }}>{ax.label}</p>
                  <p className="text-xs" style={{ color: "#2a5a77" }}>{ax.desc}</p>
                </div>
                <div className="shrink-0 w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: "50%", background: ax.color, opacity: 0.5 }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 pl-5" style={{ color: "#1a3a55" }}>
            SSI（Riggio 1986）・Active Listening Scale・Self-Monitoring Scale（Snyder 1974）をもとに設計
          </p>
        </div>

        {/* 偏差値シリーズ — コンパクト */}
        <div className="mb-10">
          <p className="text-xs font-mono tracking-[0.25em] uppercase mb-4" style={{ color: "#1a3a55" }}>
            OTHER TESTS
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
              href="/inka"
              className="flex-1 flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
            >
              <span>🌙</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>陰キャ偏差値</p>
                <p className="text-xs" style={{ color: "#3a2a5a" }}>人見知り・ぼっち耐性</p>
              </div>
            </Link>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-xs" style={{ color: "#1a3a55" }}>結果は保存されません</p>
          <div className="flex gap-4">
            <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "#1a3a55" }}>
              @Yoko_ai_dev
            </a>
            <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white" style={{ color: "#1a3a55" }}>
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
