import Link from "next/link";

const CATEGORIES = [
  { icon: "💬", label: "コミュニケーション力", desc: "伝える力・聞く力" },
  { icon: "🪞", label: "自己理解度", desc: "自分の恋愛パターンの把握" },
  { icon: "🫂", label: "相手への理解度", desc: "共感力・気づく力" },
  { icon: "⚡", label: "行動力", desc: "誘う・告白する積極性" },
  { icon: "🧘", label: "メンタル安定度", desc: "嫉妬・不安・依存の度合い" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center" style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%, #12041f 100%)" }}>
      {/* 装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#e91e8c" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#7c3aed" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-16">
        {/* ヒーロー */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(233,30,140,0.12)", color: "#f472b6", border: "1px solid rgba(233,30,140,0.25)" }}
          >
            💘 恋愛力診断
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
            style={{ letterSpacing: "-0.03em", color: "#f0e8ff" }}
          >
            恋愛偏差値
            <br />
            <span style={{ color: "#e91e8c" }}>テスト</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-10" style={{ color: "#9876aa" }}>
            25問に答えるだけで、あなたの恋愛力を偏差値で数値化。
            <br />
            強みと弱みを5軸のレーダーチャートで可視化します。
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 text-lg font-bold px-10 py-5 rounded-2xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #e91e8c, #c2185b)",
              boxShadow: "0 8px 32px rgba(233,30,140,0.4)",
            }}
          >
            診断スタート
            <span className="text-xl">→</span>
          </Link>

          <p className="mt-4 text-sm" style={{ color: "#6b5b7b" }}>
            所要時間 約5分 ・ 全25問 ・ 無料
          </p>
        </div>

        {/* 5カテゴリ */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5 text-center" style={{ color: "#9876aa" }}>
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
                  <p className="text-xs" style={{ color: "#6b5b7b" }}>{cat.desc}</p>
                </div>
              </div>
            ))}
            {/* 5カテゴリを2列に並べると1つ余るのでspanで調整 */}
            <div className="hidden sm:block" />
          </div>
        </div>

        {/* 注意書き */}
        <p className="text-center text-xs leading-relaxed" style={{ color: "#4a3a5a" }}>
          恋愛経験がない方でも答えられる設問です。結果は保存されません。
          <br />
          設問は心理学研究（Gottman, ECR-R, 感情知性尺度）をもとに設計しています。
        </p>
      </div>

      {/* フッター */}
      <footer className="relative z-10 w-full text-center py-8" style={{ color: "#3a2a4a" }}>
        <p className="text-xs">
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400 transition-colors">
            Portfolio
          </a>
        </p>
      </footer>
    </main>
  );
}
