import Link from "next/link";

export default function Hub() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0d0820 0%, #080612 60%, #060410 100%)" }}
    >
      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "#e91e8c", opacity: 0.06 }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "#0ea5e9", opacity: 0.05 }} />
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full blur-3xl" style={{ background: "#a855f7", opacity: 0.05 }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-24">

        {/* ヒーロー — 左揃え、タイポグラフィ強調 */}
        <div className="mb-20">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-8" style={{ color: "#4a4a6a" }}>
            HENSACHI SERIES
          </p>

          <h1 className="font-black leading-[0.9] tracking-tight mb-8" style={{ fontSize: "clamp(52px, 10vw, 88px)", color: "#f0eeff" }}>
            自分を<br />
            <span style={{
              background: "linear-gradient(135deg, #e91e8c 0%, #a855f7 50%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              数値化
            </span>する
          </h1>

          <p className="text-sm max-w-md leading-loose" style={{ color: "#4a4a6a" }}>
            心理学論文ベースの25問。偏差値と5軸レーダーで傾向が見える。
          </p>
        </div>

        {/* テスト一覧 — 3つで異なるビジュアルウェイト */}
        <div className="space-y-3">

          {/* 恋愛テスト — プライマリ・大きめ */}
          <Link
            href="/quiz"
            className="group block rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: "linear-gradient(135deg, rgba(233,30,140,0.1) 0%, rgba(233,30,140,0.04) 100%)",
              border: "1px solid rgba(233,30,140,0.25)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono tracking-widest" style={{ color: "#e91e8c" }}>01</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(233,30,140,0.15)", color: "#e91e8c" }}>
                    恋愛
                  </span>
                </div>
                <p className="text-2xl font-black mb-2" style={{ color: "#f0eeff" }}>恋愛偏差値テスト</p>
                <p className="text-sm mb-5" style={{ color: "#6a4a6a" }}>
                  なぜ恋愛がうまくいかないか、5軸の数値で見える
                </p>
                <div className="flex flex-wrap gap-2">
                  {["表現力", "傾聴力", "察し力", "告白力", "依存度"].map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "rgba(233,30,140,0.12)", color: "#e91e8c" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-5xl font-black mb-1" style={{ color: "rgba(233,30,140,0.15)" }}>💘</p>
                <p className="text-xs font-mono" style={{ color: "#4a2a4a" }}>25問 · 5分</p>
              </div>
            </div>
          </Link>

          {/* セカンダリ2つ — 横並び（大画面）または縦並び（モバイル）*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* コミュ力テスト */}
            <Link
              href="/commu/quiz"
              className="group block rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.03) 100%)",
                border: "1px solid rgba(14,165,233,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono tracking-widest" style={{ color: "#0ea5e9" }}>02</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(14,165,233,0.15)", color: "#0ea5e9" }}>
                  コミュ力
                </span>
              </div>
              <p className="text-lg font-black mb-1.5" style={{ color: "#e8f4ff" }}>コミュ力偏差値テスト</p>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "#3a5a77" }}>
                どの軸で詰まっているか数値で分かる
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["表現力", "傾聴力", "場の読み"].map(c => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8" }}>
                    {c}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(14,165,233,0.06)", color: "#2a6a8a" }}>
                  +2
                </span>
              </div>
            </Link>

            {/* 陰キャテスト */}
            <Link
              href="/inka/quiz"
              className="group block rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.03) 100%)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono tracking-widest" style={{ color: "#a855f7" }}>03</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7" }}>
                  陰キャ度
                </span>
              </div>
              <p className="text-lg font-black mb-1.5" style={{ color: "#f0e8ff" }}>陰キャ偏差値テスト</p>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "#4a3a6a" }}>
                自分がどのタイプの陰キャか分類される
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["人見知り度", "ぼっち耐性"].map(c => (
                  <span key={c} className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc" }}>
                    {c}
                  </span>
                ))}
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(168,85,247,0.06)", color: "#4a2a6a" }}>
                  +3
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* フッター注釈 */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "#2a2a4a" }}>
              結果は保存されません。偏差値はN(50,10)正規化スコア。
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white" style={{ color: "#2a2a4a" }}>
                @Yoko_ai_dev
              </a>
              <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white" style={{ color: "#2a2a4a" }}>
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
