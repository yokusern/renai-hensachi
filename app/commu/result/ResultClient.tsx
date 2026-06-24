"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { CATEGORY_LABELS } from "@/lib/commu-scoring";
import type { CategoryKey } from "@/data/commu-questions";

const CommuRadarChart = dynamic(() => import("@/components/CommuRadarChart"), { ssr: false });

interface Props {
  params: Record<string, string>;
}

const CATEGORY_KEYS: CategoryKey[] = [
  "expression",
  "listening",
  "awareness",
  "disclosure",
  "building",
];

const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  expression: "考えや気持ちを言葉にする力が高く、相手に自分の意図が届きやすい",
  listening: "相手の話に真剣に向き合える力があり、「この人に話したい」と思われやすい",
  awareness: "場の空気・タイミング・非言語情報の読み取りが得意で、摩擦を起こしにくい",
  disclosure: "自分をオープンに見せられるため、相手も話しやすい雰囲気を作れる",
  building: "一度できた関係を大切にし続ける力があり、信頼される人間関係を築きやすい",
};

const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  expression: "思っていることをうまく言葉にできず、誤解や伝達ミスが起きやすい傾向がある",
  listening: "自分の話に意識が向きがちで、相手が「話を聞いてもらえていない」と感じることがある",
  awareness: "場の雰囲気やタイミングを読み取ることへの苦手意識が、摩擦の原因になることがある",
  disclosure: "自分のことを話すのが少ない分、相手との距離が縮まりにくい傾向がある",
  building: "関係を維持するための能動的なアクションが少なく、自然消滅しやすいことがある",
};

const BAR_COLORS: Record<CategoryKey, string> = {
  expression: "#0ea5e9",
  listening: "#7c3aed",
  awareness: "#f59e0b",
  disclosure: "#10b981",
  building: "#e91e8c",
};

export default function CommuResultClient({ params }: Props) {
  const deviation = Number(params.d ?? 50);
  const rank = params.r ?? "標準的なコミュ力";
  const rankEmoji = params.re ?? "💬";
  const strengthKey = (params.str ?? "expression") as CategoryKey;
  const weaknessKey = (params.wk ?? "building") as CategoryKey;
  const percentile = Number(params.p ?? 50);

  const normalizedScores: Record<string, number> = {
    expression: Number(params.ex ?? 50),
    listening: Number(params.li ?? 50),
    awareness: Number(params.aw ?? 50),
    disclosure: Number(params.di ?? 50),
    building: Number(params.bu ?? 50),
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

  const toGrade = (s: number) => s >= 70 ? 'A' : s >= 55 ? 'B' : s >= 40 ? 'C' : 'D';
  const scores5 = `表現力${toGrade(normalizedScores.expression)} / 傾聴力${toGrade(normalizedScores.listening)} / 場の読み${toGrade(normalizedScores.awareness)} / 自己開示力${toGrade(normalizedScores.disclosure)} / 関係維持力${toGrade(normalizedScores.building)}`;
  const shareText = `コミュ力偏差値テストの結果：偏差値${deviation}（${rank}${rankEmoji}）\n\n${scores5}\n\nあなたも診断してみて\n→ renai-hensachi.vercel.app/commu`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const isNoData = !params.d;

  if (isNoData) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5" style={{ background: "linear-gradient(160deg, #0a1628 0%, #060e1c 60%)" }}>
        <p className="text-center mb-6" style={{ color: "#4a7a99" }}>先に診断を受けてください。</p>
        <Link href="/commu/quiz" className="text-sm px-6 py-3 rounded-xl font-bold text-white" style={{ background: "#0ea5e9" }}>
          診断を始める
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: "linear-gradient(160deg, #0a1628 0%, #060e1c 60%, #060b15 100%)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#0ea5e9" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "#7c3aed" }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 py-12">

        {/* 偏差値ヒーロー */}
        <div
          className={`text-center mb-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "#4a7a99" }}>
            あなたの
          </p>
          <p className="text-base font-bold mb-2" style={{ color: "#93c5e8" }}>
            コミュ力偏差値
          </p>
          <div
            className="deviation-number text-8xl sm:text-9xl font-black mb-3 leading-none"
            style={{ color: "#0ea5e9", fontVariantNumeric: "tabular-nums" }}
          >
            {displayDev}
          </div>
          <div
            className="inline-flex items-center gap-2 text-xl font-bold px-6 py-2 rounded-full mb-4"
            style={{ background: "rgba(14,165,233,0.15)", color: "#e8f4ff", border: "1px solid rgba(14,165,233,0.3)" }}
          >
            {rankEmoji} {rank}
          </div>
          <p className="text-sm" style={{ color: "#2a5a77" }}>
            上位 <span style={{ color: "#0ea5e9", fontWeight: 700 }}>{percentile}%</span> に位置します
          </p>
        </div>

        {/* レーダーチャート */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center" style={{ color: "#4a7a99" }}>
            5軸レーダーチャート
          </p>
          <CommuRadarChart
            scores={normalizedScores}
            labels={CATEGORY_LABELS as Record<string, string>}
          />
        </div>

        {/* カテゴリ別スコアバー */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#4a7a99" }}>
            カテゴリ別スコア
          </p>
          <div className="flex flex-col gap-4">
            {CATEGORY_KEYS.map((key) => {
              const val = normalizedScores[key] ?? 0;
              const color = BAR_COLORS[key];
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium" style={{ color: "#93c5e8" }}>
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

        {/* 強み・弱み */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#0ea5e9" }}>
              💪 強み
            </p>
            <p className="text-sm font-bold mb-1" style={{ color: "#e8f4ff" }}>
              {CATEGORY_LABELS[strengthKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4a7a99" }}>
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
            <p className="text-sm font-bold mb-1" style={{ color: "#e8f4ff" }}>
              {CATEGORY_LABELS[weaknessKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4a7a99" }}>
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
              background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
              boxShadow: "0 6px 24px rgba(14,165,233,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Xでシェアする
          </a>

          <Link
            href="/commu/quiz"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#4a7a99",
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
            background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(2,132,199,0.06))",
            border: "1px solid rgba(14,165,233,0.3)",
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "#0ea5e9" }}>
                このテストで調べた論文が記事になりました
              </p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "#e8f4ff" }}>
                コミュ力の差は「聞き方」にあった
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#4a7a99" }}>
                話す量じゃない。返し方の技術だった。5つの心理学研究 × 場面別の会話例 + 7日間トレーニング付き。
              </p>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(14,165,233,0.2)", color: "#7dd3f0" }}
                >
                  ¥980
                </span>
                <span className="text-xs font-bold" style={{ color: "#0ea5e9" }}>
                  noteで読む →
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* 恋愛偏差値テストへの誘導 */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ background: "rgba(233,30,140,0.05)", border: "1px solid rgba(233,30,140,0.15)" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3 text-center" style={{ color: "#7a5a9a" }}>
            偏差値シリーズ
          </p>
          <Link
            href="/"
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
          >
            <span className="text-2xl">💘</span>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>恋愛偏差値テスト</p>
              <p className="text-xs" style={{ color: "#8a5a7a" }}>表現力・察し力・告白力を5軸で診断 →</p>
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
              <p className="text-xs" style={{ color: "#7a5a8a" }}>人見知り・ぼっち耐性・陰の趣味を診断 →</p>
            </div>
          </Link>
        </div>

        <p className="text-center text-xs" style={{ color: "#1a3a55" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">
            Portfolio
          </a>
        </p>
      </div>
    </main>
  );
}
