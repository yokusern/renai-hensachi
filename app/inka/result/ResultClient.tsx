"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CATEGORY_LABELS } from "@/lib/inka-scoring";
import type { CategoryKey } from "@/data/inka-questions";

const InkaRadarChart = dynamic(() => import("@/components/InkaRadarChart"), { ssr: false });

interface Props {
  params: Record<string, string>;
}

const CATEGORY_KEYS: CategoryKey[] = [
  "hitomishiri",
  "bocchi",
  "hobbies",
  "groupAversion",
  "invisible",
];

const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  hitomishiri: "人見知りレベルが高く、初対面・電話などが苦手な純正タイプ",
  bocchi: "一人の時間が本当に快適で、ぼっちをネガティブに感じないメンタルの持ち主",
  hobbies: "インドア趣味への没頭力が高く、コンテンツへの愛が深い",
  groupAversion: "群れない美学がある。スクールカーストとは無縁の独立志向",
  invisible: "空気のように存在できる特技がある。目立たないことへの抵抗が少ない",
};

const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  hitomishiri: "初対面や電話への苦手意識は薄め。陰キャの中では人見知り度が低い",
  bocchi: "一人時間よりも誰かといる時間を好む傾向がある。ぼっち耐性は陰キャの中では低め",
  hobbies: "趣味がインドア方向に振り切っているわけではない。意外と外向きな一面もある",
  groupAversion: "群れること自体への苦手意識はそこまで強くない",
  invisible: "存在感を消したいという気持ちは他の陰キャより少ない。発言力があるタイプ",
};

const BAR_COLORS: Record<CategoryKey, string> = {
  hitomishiri: "#a855f7",
  bocchi: "#6366f1",
  hobbies: "#ec4899",
  groupAversion: "#8b5cf6",
  invisible: "#c084fc",
};

export default function InkaResultClient({ params }: Props) {
  const deviation = Number(params.d ?? 50);
  const rank = params.r ?? "標準的な陰キャ";
  const rankEmoji = params.re ?? "🎮";
  const strengthKey = (params.str ?? "hitomishiri") as CategoryKey;
  const weaknessKey = (params.wk ?? "hobbies") as CategoryKey;
  const percentile = Number(params.p ?? 50);

  const normalizedScores: Record<string, number> = {
    hitomishiri: Number(params.hi ?? 50),
    bocchi: Number(params.bo ?? 50),
    hobbies: Number(params.hb ?? 50),
    groupAversion: Number(params.ga ?? 50),
    invisible: Number(params.iv ?? 50),
  };

  const [displayDev, setDisplayDev] = useState(50);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    let frame = 0;
    const totalFrames = 40;
    const start = 50;
    const end = deviation;

    const tick = () => {
      frame++;
      const t = frame / totalFrames;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayDev(Math.round(start + (end - start) * eased));
      if (frame < totalFrames) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [deviation]);

  const shareText = `陰キャ偏差値【${deviation}】でした${rankEmoji}\n${rank}｜${CATEGORY_LABELS[strengthKey]}が特徴的で、${CATEGORY_LABELS[weaknessKey]}は低め\n#陰キャ偏差値テスト #個人開発`;
  const shareUrl = `https://renai-hensachi.vercel.app/inka/result?${new URLSearchParams(params).toString()}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const isNoData = !params.d;

  if (isNoData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(160deg, #120826 0%, #08051a 60%)" }}>
        <p className="text-center mb-6" style={{ color: "#7a5a99" }}>先に診断を受けてください。</p>
        <Link href="/inka/quiz" className="text-sm px-6 py-3 rounded-xl font-bold text-white" style={{ background: "#a855f7" }}>
          診断を始める
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #120826 0%, #08051a 60%, #060318 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#a855f7" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#6d28d9" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-12">

        {/* 偏差値ヒーロー */}
        <div
          className={`text-center mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "#7a5a99" }}>
            あなたの
          </p>
          <p className="text-base font-bold mb-2" style={{ color: "#c4a8d8" }}>
            陰キャ偏差値
          </p>
          <div
            className="deviation-number text-8xl sm:text-9xl font-black mb-3 leading-none"
            style={{ color: "#a855f7", fontVariantNumeric: "tabular-nums" }}
          >
            {displayDev}
          </div>
          <div
            className="inline-flex items-center gap-2 text-xl font-bold px-6 py-2 rounded-full mb-4"
            style={{ background: "rgba(168,85,247,0.15)", color: "#f0e8ff", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            {rankEmoji} {rank}
          </div>
          <p className="text-sm" style={{ color: "#3a2a5a" }}>
            上位 <span style={{ color: "#a855f7", fontWeight: 700 }}>{percentile}%</span> の陰キャ度
          </p>
        </div>

        {/* レーダーチャート */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center" style={{ color: "#7a5a99" }}>
            5軸レーダーチャート
          </p>
          <InkaRadarChart
            scores={normalizedScores}
            labels={CATEGORY_LABELS as Record<string, string>}
          />
        </div>

        {/* カテゴリ別スコアバー */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#7a5a99" }}>
            カテゴリ別スコア
          </p>
          <div className="flex flex-col gap-4">
            {CATEGORY_KEYS.map((key) => {
              const val = normalizedScores[key] ?? 0;
              const color = BAR_COLORS[key];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium" style={{ color: "#c4a8d8" }}>
                      {CATEGORY_LABELS[key]}
                    </span>
                    <span className="text-sm font-black" style={{ color }}>
                      {val}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 強み・特徴 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a855f7" }}>
              🌙 最も陰キャな軸
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>
              {CATEGORY_LABELS[strengthKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#7a5a99" }}>
              {STRENGTH_TEXTS[strengthKey]}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#c084fc" }}>
              ☀️ 陽キャ寄りの軸
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>
              {CATEGORY_LABELS[weaknessKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#7a5a99" }}>
              {WEAKNESS_TEXTS[weaknessKey]}
            </p>
          </div>
        </div>

        {/* シェアボタン */}
        <div className="flex flex-col gap-3 mb-8">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #a855f7, #7c3aed)",
              boxShadow: "0 6px 24px rgba(168,85,247,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェアする
          </a>

          <Link
            href="/inka/quiz"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#7a5a99",
            }}
          >
            もう一度やる
          </Link>
        </div>

        {/* note記事CTA */}
        {/* TODO: href を実際の記事URLに差し替える（例: https://note.com/zen_ai_logic/n/xxxx）*/}
        <a
          href="https://note.com/zen_ai_logic"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl p-5 mb-6 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(109,40,217,0.06))",
            border: "1px solid rgba(168,85,247,0.3)",
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#a855f7" }}>
                このテストで調べた論文が記事になりました
              </p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "#f0e8ff" }}>
                人見知りが治らない理由を、論文と実生活から考えた
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#7a5a99" }}>
                頑張るほどしんどくなる理由。心理学研究5本が示していたのは、治し方よりも先にある話だった。
              </p>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc" }}
                >
                  ¥980
                </span>
                <span className="text-xs font-bold" style={{ color: "#a855f7" }}>
                  noteで読む →
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* 偏差値シリーズCTA */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3 text-center" style={{ color: "#3a2a5a" }}>
            偏差値シリーズ
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
            >
              <span className="text-xl">💘</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>恋愛偏差値テスト</p>
                <p className="text-xs" style={{ color: "#3a2a4a" }}>恋愛力を5軸で診断 →</p>
              </div>
            </Link>
            <Link
              href="/commu"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
            >
              <span className="text-xl">💬</span>
              <div className="flex-1">
                <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>コミュ力偏差値テスト</p>
                <p className="text-xs" style={{ color: "#1a3a55" }}>コミュ力を5軸で診断 →</p>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: "#2a1a4a" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">
            Portfolio
          </a>
        </p>
      </div>
    </main>
  );
}
