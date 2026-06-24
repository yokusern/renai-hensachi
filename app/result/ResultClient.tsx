"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CATEGORY_LABELS } from "@/lib/scoring";
import type { CategoryKey } from "@/data/questions";

const RadarChart = dynamic(() => import("@/components/RadarChart"), { ssr: false });

interface Props {
  params: Record<string, string>;
}

const CATEGORY_KEYS: CategoryKey[] = [
  "communication",
  "selfAwareness",
  "empathy",
  "initiative",
  "mentalStability",
];

const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  communication: "言葉で気持ちを伝える力が高く、相手との距離を自然に縮められる",
  selfAwareness: "自分の恋愛パターンを客観視できており、同じ失敗を繰り返しにくい",
  empathy: "相手の感情の変化に敏感で、言葉にならない本音を察することができる",
  initiative: "好きという気持ちを行動に変えられるので、チャンスを逃しにくい",
  mentalStability: "感情の波が少なく、恋愛でも自分軸を保ち続けられる",
};

const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  communication: "気持ちを言葉にすることへの苦手意識が、すれ違いを生みやすい",
  selfAwareness: "自分の恋愛パターンへの気づきが薄く、同じ壁にぶつかりやすい傾向がある",
  empathy: "相手の感情変化を見落としがちで、タイミングを逃すことがある",
  initiative: "行動を起こすまでに時間がかかり、機会を逃してしまうことがある",
  mentalStability: "小さな変化に影響されやすく、不安を感じやすい傾向がある",
};

const BAR_COLORS: Record<CategoryKey, string> = {
  communication: "#e91e8c",
  selfAwareness: "#7c3aed",
  empathy: "#0ea5e9",
  initiative: "#f59e0b",
  mentalStability: "#10b981",
};

export default function ResultClient({ params }: Props) {
  const deviation = Number(params.d ?? 50);
  const rank = params.r ?? "標準的な恋愛力";
  const rankEmoji = params.re ?? "💙";
  const strengthKey = (params.str ?? "communication") as CategoryKey;
  const weaknessKey = (params.wk ?? "mentalStability") as CategoryKey;
  const percentile = Number(params.p ?? 50);

  const normalizedScores: Record<string, number> = {
    communication: Number(params.c ?? 50),
    selfAwareness: Number(params.s ?? 50),
    empathy: Number(params.e ?? 50),
    initiative: Number(params.i ?? 50),
    mentalStability: Number(params.m ?? 50),
  };

  const [displayDev, setDisplayDev] = useState(50);
  const [visible, setVisible] = useState(false);

  // 偏差値カウントアップアニメーション
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

  // Xシェアテキスト
  const shareText = `恋愛偏差値【${deviation}】でした${rankEmoji}\n${rank}｜${CATEGORY_LABELS[strengthKey]}が得意で、${CATEGORY_LABELS[weaknessKey]}が課題みたい…\n#恋愛偏差値テスト`;
  const shareUrl = `https://renai-hensachi.vercel.app/result?${new URLSearchParams(params).toString()}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const isNoData = !params.d;

  if (isNoData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%)" }}>
        <p className="text-center mb-6" style={{ color: "#9876aa" }}>先に診断を受けてください。</p>
        <Link href="/quiz" className="text-sm px-6 py-3 rounded-xl font-bold text-white" style={{ background: "#e91e8c" }}>
          診断を始める
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%, #12041f 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#e91e8c" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#7c3aed" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-12">

        {/* ── 偏差値ヒーロー ── */}
        <div
          className={`text-center mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "#9876aa" }}>
            あなたの
          </p>
          <p className="text-base font-bold mb-2" style={{ color: "#c4a8d8" }}>
            恋愛偏差値
          </p>
          <div
            className="deviation-number text-8xl sm:text-9xl font-black mb-3 leading-none"
            style={{ color: "#e91e8c", fontVariantNumeric: "tabular-nums" }}
          >
            {displayDev}
          </div>
          <div
            className="inline-flex items-center gap-2 text-xl font-bold px-6 py-2 rounded-full mb-4"
            style={{ background: "rgba(233,30,140,0.15)", color: "#f0e8ff", border: "1px solid rgba(233,30,140,0.3)" }}
          >
            {rankEmoji} {rank}
          </div>
          <p className="text-sm" style={{ color: "#6b5b7b" }}>
            上位 <span style={{ color: "#e91e8c", fontWeight: 700 }}>{percentile}%</span> に位置します
          </p>
        </div>

        {/* ── レーダーチャート ── */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center" style={{ color: "#9876aa" }}>
            5軸レーダーチャート
          </p>
          <RadarChart
            scores={normalizedScores}
            labels={CATEGORY_LABELS as Record<string, string>}
          />
        </div>

        {/* ── カテゴリ別スコアバー ── */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#9876aa" }}>
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

        {/* ── 強み・弱み ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(233,30,140,0.08)", border: "1px solid rgba(233,30,140,0.2)" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#e91e8c" }}>
              💪 強み
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>
              {CATEGORY_LABELS[strengthKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#9876aa" }}>
              {STRENGTH_TEXTS[strengthKey]}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#a78bfa" }}>
              🌱 伸びしろ
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>
              {CATEGORY_LABELS[weaknessKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#9876aa" }}>
              {WEAKNESS_TEXTS[weaknessKey]}
            </p>
          </div>
        </div>

        {/* ── シェアボタン ── */}
        <div className="flex flex-col gap-3 mb-10">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #e91e8c, #c2185b)",
              boxShadow: "0 6px 24px rgba(233,30,140,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェアする
          </a>

          <Link
            href="/quiz"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9876aa",
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
            background: "linear-gradient(135deg, rgba(233,30,140,0.10), rgba(194,24,91,0.05))",
            border: "1px solid rgba(233,30,140,0.25)",
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#e91e8c" }}>
                偏差値シリーズの研究をnoteで公開中
              </p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "#f0e8ff" }}>
                人見知り・コミュ力・恋愛を、心理学論文から考えた記事
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#6b5b7b" }}>
                テストを作るために読んだ論文と、自分の実生活を重ねて書いた記事シリーズ。
              </p>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(233,30,140,0.18)", color: "#f472b6" }}
                >
                  各¥980
                </span>
                <span className="text-xs font-bold" style={{ color: "#e91e8c" }}>
                  noteで読む →
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* コミュ力テストへの誘導 */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.15)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3 text-center" style={{ color: "#1a4a6a" }}>
            偏差値シリーズ
          </p>
          <Link
            href="/commu"
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
          >
            <span className="text-2xl">💬</span>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "#e8f4ff" }}>コミュ力偏差値テスト</p>
              <p className="text-xs" style={{ color: "#2a5a77" }}>話す力・聞く力・場の読みを偏差値化 →</p>
            </div>
          </Link>
          <Link
            href="/inka"
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 mt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="text-2xl">🌙</span>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>陰キャ偏差値テスト</p>
              <p className="text-xs" style={{ color: "#3a2a5a" }}>人見知り・ぼっち耐性・陰の趣味を偏差値化 →</p>
            </div>
          </Link>
        </div>

        {/* フッター */}
        <p className="text-center text-xs" style={{ color: "#3a2a4a" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-400 transition-colors">
            Portfolio
          </a>
        </p>
      </div>
    </main>
  );
}
