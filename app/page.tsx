import Link from "next/link";

const TESTS = [
  {
    href: "/",
    startHref: "/quiz",
    emoji: "💘",
    title: "恋愛偏差値テスト",
    desc: "恋愛力を偏差値で数値化",
    accent: "#e91e8c",
    accentBg: "rgba(233,30,140,0.12)",
    accentBorder: "rgba(233,30,140,0.25)",
    accentGlow: "rgba(233,30,140,0.4)",
    categories: ["コミュニケーション力", "自己理解度", "相手への理解度", "行動力", "メンタル安定度"],
    research: "Gottman / ECR-R / 感情知性尺度",
  },
  {
    href: "/commu",
    startHref: "/commu/quiz",
    emoji: "💬",
    title: "コミュ力偏差値テスト",
    desc: "コミュ力を偏差値で数値化",
    accent: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.12)",
    accentBorder: "rgba(14,165,233,0.25)",
    accentGlow: "rgba(14,165,233,0.4)",
    categories: ["表現力", "傾聴力", "場の読み", "自己開示力", "関係維持力"],
    research: "SSI (Riggio) / Active Listening Scale / Self-Monitoring (Snyder)",
  },
];

export default function Hub() {
  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #0d0820 0%, #080612 60%, #060410 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full opacity-8 blur-3xl" style={{ background: "#e91e8c" }} />
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#0ea5e9" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-16">
        {/* ヒーロー */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", color: "#8888aa", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            📊 偏差値シリーズ
          </div>

          <h1
            className="text-5xl sm:text-6xl font-black mb-5 leading-tight"
            style={{ letterSpacing: "-0.03em", color: "#f0eeff" }}
          >
            あなたの
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {" "}偏差値{" "}
            </span>
            を測る
          </h1>

          <p className="text-base leading-relaxed" style={{ color: "#5a5a7a" }}>
            25問の心理学ベース診断で、自分を数値化しよう。
          </p>
        </div>

        {/* テスト一覧 */}
        <div className="flex flex-col gap-6 mb-12">
          {TESTS.map((test) => (
            <div
              key={test.href}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.08)` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="text-4xl">{test.emoji}</span>
                <div>
                  <p className="text-xl font-black" style={{ color: "#f0eeff" }}>{test.title}</p>
                  <p className="text-sm mt-0.5" style={{ color: "#5a5a7a" }}>{test.desc}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {test.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: test.accentBg, color: test.accent, border: `1px solid ${test.accentBorder}` }}
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <p className="text-xs mb-5" style={{ color: "#3a3a5a" }}>
                設計根拠: {test.research}
              </p>

              <Link
                href={test.startHref}
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${test.accent}, ${test.accent}cc)`,
                  boxShadow: `0 4px 20px ${test.accentGlow}`,
                }}
              >
                診断スタート → 全25問・約5分・無料
              </Link>
            </div>
          ))}
        </div>

        {/* 注意書き */}
        <p className="text-center text-xs leading-relaxed" style={{ color: "#2a2a4a" }}>
          結果は保存されません。偏差値はN(50,10)を想定した正規化スコアです。
        </p>
      </div>

      <footer className="relative z-10 w-full text-center py-8" style={{ color: "#2a2a4a" }}>
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
