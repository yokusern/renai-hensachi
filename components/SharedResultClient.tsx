"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GhostCommentWidget } from "@/components/GhostCommentWidget";

const GenericRadarChart = dynamic(() => import("@/components/GenericRadarChart"), { ssr: false });

export interface CrossLink {
  href: string;
  emoji: string;
  name: string;
  desc: string;
  color: string;
}

interface Props {
  params: Record<string, string>;
  themeColor: string;
  bgGradient: string;
  testName: string;
  testEmoji: string;
  categoryKeys: string[];
  categoryLabels: Record<string, string>;
  strengthTexts: Record<string, string>;
  weaknessTexts: Record<string, string>;
  quizPath: string;
  crossLinks: CrossLink[];
}

function toGrade(score: number): string {
  return score >= 70 ? "A" : score >= 55 ? "B" : score >= 40 ? "C" : "D";
}

export default function SharedResultClient({
  params,
  themeColor,
  bgGradient,
  testName,
  testEmoji,
  categoryKeys,
  categoryLabels,
  strengthTexts,
  weaknessTexts,
  quizPath,
  crossLinks,
}: Props) {
  const deviation = Number(params.d ?? 50);
  const rank = params.r ?? "";
  const rankEmoji = params.re ?? "";
  const strengthKey = params.str ?? categoryKeys[0];
  const weaknessKey = params.wk ?? categoryKeys[categoryKeys.length - 1];
  const percentile = Number(params.p ?? 50);

  const normalizedScores: Record<string, number> = {};
  for (const key of categoryKeys) {
    normalizedScores[key] = Number(params[key] ?? 50);
  }

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

  const gradeLines = categoryKeys
    .map((k) => `${categoryLabels[k]}${toGrade(normalizedScores[k])}`)
    .join(" / ");
  const shareText = `${testName}の結果：偏差値${deviation}（${rank}${rankEmoji}）\n\n${gradeLines}\n\nあなたも診断してみて\n→ renai-hensachi.vercel.app`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const isNoData = !params.d;

  if (isNoData) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: bgGradient }}
      >
        <p className="text-center mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          先に診断を受けてください。
        </p>
        <Link
          href={quizPath}
          className="text-sm px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: themeColor }}
        >
          診断を始める
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center"
      style={{ background: bgGradient }}
    >
      <div className="w-full max-w-2xl mx-auto px-5 py-12">

        {/* ── 偏差値ヒーロー ── */}
        <div
          className={`text-center mb-10 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            {testEmoji} {testName}
          </p>
          <div
            className="font-black leading-none mb-4"
            style={{
              fontSize: "clamp(80px, 18vw, 120px)",
              color: themeColor,
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.04em",
            }}
          >
            {displayDev}
          </div>
          <div
            className="inline-flex items-center gap-2 text-lg font-bold px-5 py-2 rounded-full mb-4"
            style={{
              background: `${themeColor}22`,
              color: "#fff",
              border: `1px solid ${themeColor}55`,
            }}
          >
            {rankEmoji} {rank}
          </div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            上位{" "}
            <span style={{ color: themeColor, fontWeight: 700 }}>{percentile}%</span>{" "}
            に位置します
          </p>
        </div>

        {/* ── レーダーチャート ── */}
        <div
          className="rounded-2xl p-6 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-xs font-bold mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            5軸レーダーチャート
          </p>
          <GenericRadarChart
            scores={normalizedScores}
            labels={categoryLabels}
            keys={categoryKeys}
            color={themeColor}
          />
        </div>

        {/* ── カテゴリ別スコアバー ── */}
        <div
          className="rounded-2xl p-6 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-xs font-bold mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
            カテゴリ別スコア
          </p>
          <div className="flex flex-col gap-4">
            {categoryKeys.map((key) => {
              const val = normalizedScores[key] ?? 0;
              const grade = toGrade(val);
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {categoryLabels[key]}
                      </span>
                      <span
                        className="text-xs font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: `${themeColor}30`,
                          color: themeColor,
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {grade}
                      </span>
                    </div>
                    <span className="text-sm font-black" style={{ color: themeColor }}>
                      {val}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${val}%`, background: themeColor, opacity: 0.85 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 強み・弱み ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div
            className="rounded-2xl p-5"
            style={{
              background: `${themeColor}0f`,
              border: `1px solid ${themeColor}33`,
            }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: themeColor }}>
              💪 強み
            </p>
            <p className="text-sm font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.9)" }}>
              {categoryLabels[strengthKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {strengthTexts[strengthKey]}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              🌱 伸びしろ
            </p>
            <p className="text-sm font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.9)" }}>
              {categoryLabels[weaknessKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {weaknessTexts[weaknessKey]}
            </p>
          </div>
        </div>

        {/* ── シェア ── */}
        <div className="flex flex-col gap-3 mb-10">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base transition-opacity hover:opacity-85"
            style={{ background: themeColor }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェアする
          </a>
          <Link
            href={quizPath}
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            もう一度やる
          </Link>
        </div>

        {/* ── note CTA ── */}
        <a
          href="https://note.com/zen_ai_logic"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl p-5 mb-6 transition-all duration-200 hover:scale-[1.01]"
          style={{
            background: `${themeColor}0a`,
            border: `1px solid ${themeColor}25`,
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold mb-1.5" style={{ color: themeColor }}>
                偏差値シリーズの研究をnoteで公開中
              </p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                人見知り・コミュ力・恋愛を、心理学論文から考えた記事
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                テストを作るために読んだ論文と、自分の実生活を重ねて書いた記事シリーズ。
              </p>
              <span className="text-xs font-bold" style={{ color: themeColor }}>
                noteで読む →
              </span>
            </div>
          </div>
        </a>

        {/* ── 他のテスト ── */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs font-bold mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            偏差値シリーズ — 他のテスト
          </p>
          <div className="flex flex-col gap-0">
            {crossLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                style={{
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                }}
              >
                <span className="text-xl w-7 text-center shrink-0">{link.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {link.name}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {link.desc} →
                  </p>
                </div>
                <div
                  className="w-1.5 h-5 rounded-full shrink-0"
                  style={{ background: link.color, opacity: 0.6 }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
          作成:{" "}
          <a
            href="https://x.com/Yoko_ai_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            @Yoko_ai_dev
          </a>
          {" · "}
          <a
            href="https://yokoportofolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            Portfolio
          </a>
        </p>
      </div>

      <GhostCommentWidget color={themeColor} delay={8} />
    </main>
  );
}
