"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GhostCommentWidget } from "@/components/GhostCommentWidget";

const GenericRadarChart = dynamic(
  () => import("@/components/GenericRadarChart"),
  { ssr: false }
);

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

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

interface Particle {
  id: number;
  dx: number;
  dy: number;
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

  const rgb = hexToRgb(themeColor);

  const [displayDev, setDisplayDev] = useState(50);
  const [jitter, setJitter] = useState(0);
  const [countDone, setCountDone] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [barsReady, setBarsReady] = useState(false);

  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDisplayDev(deviation);
      setCountDone(true);
      setBarsReady(true);
      return;
    }

    // GSAP countup with jitter
    const obj = { val: 50 };
    tweenRef.current = gsap.to(obj, {
      val: deviation,
      duration: 1.2,
      ease: "power2.out",
      onUpdate() {
        const v = Math.round(obj.val);
        setDisplayDev(v);
        // random jitter ±2px during count
        setJitter((Math.random() - 0.5) * 4);
      },
      onComplete() {
        setJitter(0);
        setCountDone(true);
        setBarsReady(true);

        // Particle explosion (skip on mobile for perf)
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          const ps: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            dx: Math.round((Math.random() - 0.5) * 220),
            dy: Math.round(-Math.random() * 200 - 40),
          }));
          setParticles(ps);
          setTimeout(() => setParticles([]), 900);
        }
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
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
        <p
          className="text-center mb-6"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p
            className="text-xs font-bold mb-3"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {testEmoji} {testName}
          </p>

          {/* Deviation number + particles */}
          <div className="relative inline-block mb-4">
            <div
              className="font-black leading-none"
              style={{
                fontSize: "clamp(80px, 18vw, 120px)",
                color: themeColor,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                fontFamily: "'Inter', sans-serif",
                transform: `translateX(${jitter}px)`,
                transition: "transform 0.05s linear",
                textShadow: `0 0 60px rgba(${rgb},0.4)`,
              }}
            >
              {displayDev}
            </div>

            {/* Particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                className="score-particle"
                style={
                  {
                    "--pdx": `${p.dx}px`,
                    "--pdy": `${p.dy}px`,
                    background: themeColor,
                    boxShadow: `0 0 6px ${themeColor}`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Rank badge — bounces in after countup */}
          {countDone ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 22,
              }}
              className="inline-flex items-center gap-2 text-lg font-bold px-5 py-2 rounded-full mb-4 badge-pulse"
              style={{
                background: `rgba(${rgb},0.13)`,
                color: "#fff",
                border: `1px solid rgba(${rgb},0.35)`,
              }}
            >
              {rankEmoji} {rank}
            </motion.div>
          ) : (
            <div style={{ height: "44px" }} />
          )}

          {/* 上位XX% — fades in after countup */}
          {countDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              上位{" "}
              <span
                style={{
                  color: themeColor,
                  fontWeight: 700,
                  textShadow: `0 0 12px rgba(${rgb},0.5)`,
                }}
              >
                {percentile}%
              </span>{" "}
              に位置します
            </motion.p>
          )}
        </motion.div>

        {/* ── レーダーチャート ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-2xl p-6 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-xs font-bold mb-4 text-center"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            5軸レーダーチャート
          </p>
          <GenericRadarChart
            scores={normalizedScores}
            labels={categoryLabels}
            keys={categoryKeys}
            color={themeColor}
          />
        </motion.div>

        {/* ── カテゴリ別スコアバー ── */}
        <div
          className="rounded-2xl p-6 mb-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p
            className="text-xs font-bold mb-5"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            カテゴリ別スコア
          </p>
          <div className="flex flex-col gap-4">
            {categoryKeys.map((key, idx) => {
              const val = normalizedScores[key] ?? 0;
              const grade = toGrade(val);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={barsReady ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + idx * 0.12, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        {categoryLabels[key]}
                      </span>
                      <span
                        className="text-xs font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: `rgba(${rgb},0.18)`,
                          color: themeColor,
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {grade}
                      </span>
                    </div>
                    <span
                      className="text-sm font-black"
                      style={{ color: themeColor }}
                    >
                      {val}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={barsReady ? { scaleX: 1 } : {}}
                      transition={{
                        delay: 0.2 + idx * 0.12,
                        duration: 0.65,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        width: `${val}%`,
                        background: `linear-gradient(90deg, rgba(${rgb},0.6), ${themeColor})`,
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 強み・弱み ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5"
        >
          <div
            className="rounded-2xl p-5"
            style={{
              background: `rgba(${rgb},0.06)`,
              border: `1px solid rgba(${rgb},0.2)`,
            }}
          >
            <p
              className="text-xs font-bold mb-2"
              style={{ color: themeColor }}
            >
              💪 強み
            </p>
            <p
              className="text-sm font-bold mb-1.5"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {categoryLabels[strengthKey]}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
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
            <p
              className="text-xs font-bold mb-2"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              🌱 伸びしろ
            </p>
            <p
              className="text-sm font-bold mb-1.5"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {categoryLabels[weaknessKey]}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {weaknessTexts[weaknessKey]}
            </p>
          </div>
        </motion.div>

        {/* ── シェアボタン ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="flex flex-col gap-3 mb-10"
        >
          <motion.a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              boxShadow: `0 0 28px rgba(${rgb},0.4)`,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: themeColor }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェアする
          </motion.a>

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
        </motion.div>

        {/* ── note CTA ── */}
        <motion.a
          href="https://note.com/zen_ai_logic"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01, boxShadow: `0 8px 24px rgba(${rgb},0.12)` }}
          transition={{ duration: 0.18 }}
          className="block rounded-2xl p-5 mb-6"
          style={{
            background: `rgba(${rgb},0.04)`,
            border: `1px solid rgba(${rgb},0.15)`,
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-bold mb-1.5"
                style={{ color: themeColor }}
              >
                偏差値シリーズの研究をnoteで公開中
              </p>
              <p
                className="text-sm font-bold mb-1.5 leading-snug"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                人見知り・コミュ力・恋愛を、心理学論文から考えた記事
              </p>
              <p
                className="text-xs mb-3 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                テストを作るために読んだ論文と、自分の実生活を重ねて書いた記事シリーズ。
              </p>
              <span className="text-xs font-bold" style={{ color: themeColor }}>
                noteで読む →
              </span>
            </div>
          </div>
        </motion.a>

        {/* ── 他のテスト ── */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-xs font-bold mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            偏差値シリーズ — 他のテスト
          </p>
          <div className="flex flex-col gap-0">
            {crossLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                style={{
                  borderTop:
                    i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                }}
              >
                <span className="text-xl w-7 text-center shrink-0">
                  {link.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    {link.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
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
        <p
          className="text-center text-xs"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
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
