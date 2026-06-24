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
    description: "25問でコミュ力を偏差値で診断。無料。",
  },
};

const CATEGORIES = [
  { icon: "🗣️", label: "表現力", desc: "伝える力・言葉にする力" },
  { icon: "👂", label: "傾聴力", desc: "聞く力・記憶力・共感力" },
  { icon: "🎯", label: "場の読み", desc: "タイミング・非言語情報の把握" },
  { icon: "🔓", label: "自己開示力", desc: "オープンさ・弱みを見せる力" },
  { icon: "🤝", label: "関係維持力", desc: "つながりを長く保つ力" },
];

export default function CommuHome() {
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #060e1c 60%, #060b15 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#0ea5e9" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: "#7c3aed", opacity: 0.08 }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-16">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(14,165,233,0.12)", color: "#38bdf8", border: "1px solid rgba(14,165,233,0.25)" }}
          >
            💬 コミュ力診断
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
            style={{ letterSpacing: "-0.03em", color: "#e8f4ff" }}
          >
            コミュ力偏差値
            <br />
            <span style={{ color: "#0ea5e9" }}>テスト</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: "#4a7a99" }}>
            話す量じゃない。聞き方・場の読み・つながり方に差がある。
            <br />
            どの軸が詰まっているか、25問で具体的に分かる。
          </p>

          <Link
            href="/commu/quiz"
            className="inline-flex items-center gap-3 text-lg font-bold px-10 py-5 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
              boxShadow: "0 8px 32px rgba(14,165,233,0.4)",
            }}
          >
            診断スタート → 全25問・約5分・無料
          </Link>
        </div>

        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5 text-center" style={{ color: "#4a7a99" }}>
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
                  <p className="text-sm font-bold" style={{ color: "#e8f4ff" }}>{cat.label}</p>
                  <p className="text-xs" style={{ color: "#2a5a77" }}>{cat.desc}</p>
                </div>
              </div>
            ))}
            <div className="hidden sm:block" />
          </div>
        </div>

        {/* 他の診断テスト */}
        <div
          className="rounded-2xl p-5 mb-10"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center" style={{ color: "#2a5a77" }}>
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
                <p className="text-xs" style={{ color: "#6a4a6a" }}>表現力・察し力・告白力を5軸で診断 →</p>
              </div>
            </Link>
            <Link
              href="/inka"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(168,85,247,0.2)" }}
            >
              <span className="text-xl">🌙</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>陰キャ偏差値テスト</p>
                <p className="text-xs" style={{ color: "#5a3a7a" }}>人見知り度・ぼっち耐性・陰の趣味力を診断 →</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs leading-relaxed" style={{ color: "#1a3a55" }}>
          設問はSSI（Riggio 1986）・Active Listening Scale・Self-Monitoring Scale（Snyder 1974）をもとに設計しています。
        </p>
      </div>

      <footer className="relative z-10 w-full text-center py-8" style={{ color: "#1a3a55" }}>
        <p className="text-xs">
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">
            Portfolio
          </a>
        </p>
      </footer>
    </main>
  );
}
