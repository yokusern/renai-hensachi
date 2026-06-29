"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GhostCommentWidget } from "@/components/GhostCommentWidget";
import { crossLinksExcluding } from "@/lib/all-tests";
import {
  DOPA_KEYS,
  DOPA_LABELS,
  DOPA_AXIS_DESCS,
  getDopaTypeName,
  getDopaBrainPercent,
} from "@/lib/dopa-gaki-scoring";
import type { DopaKey } from "@/lib/dopa-gaki-scoring";

const GenericRadarChart = dynamic(
  () => import("@/components/GenericRadarChart"),
  { ssr: false }
);

const THEME = "#84CC16";
const RGB = "132,204,22";
const BG = "linear-gradient(160deg, #061000 0%, #040b00 60%, #081200 100%)";

const STRENGTH_TEXTS: Record<string, string> = {
  immediate:   "待てない・今すぐ欲しい衝動が強い。0.1秒のラグにも本能的にストレスを感じる",
  shortVideo:  "ショート動画に吸い込まれる。スクロールを止める意思決定が非常に困難になっている",
  multitask:   "複数のことを同時進行しないと落ち着かない。一点集中の耐性がほぼゼロに近い",
  boredom:     "無刺激な状態への耐性が極端に低い。常に何かしらの刺激を必要としている",
  rewardReset: "スマホや即時報酬なしの状態が強い不安を引き起こす。リセット機能が著しく低下している",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  immediate:   "即時報酬への衝動は比較的コントロールできている。少し待てる余裕がある",
  shortVideo:  "短尺動画への依存は低め。一定の時間制御ができている",
  multitask:   "マルチタスク衝動は弱め。一つのことに集中できる場面がある",
  boredom:     "退屈への耐性は意外とある。刺激なしでも一定時間は平静を保てる",
  rewardReset: "報酬リセット力は比較的保たれている。スマホなしでも案外過ごせる",
};

function toGrade(score: number): string {
  return score >= 70 ? "A" : score >= 55 ? "B" : score >= 40 ? "C" : "D";
}

// ── BrainMeter（ドーパミン汚染度） ────────────────────────────────────────────

interface BrainMeterProps {
  targetPercent: number;
  ready: boolean;
}

function BrainMeter({ targetPercent, ready }: BrainMeterProps) {
  const [filled, setFilled] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ready) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setFilled(targetPercent);
      return;
    }

    const startTime = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setFilled(Math.round(eased * targetPercent));
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      }
    };

    const timeout = setTimeout(() => {
      animRef.current = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(timeout);
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, [targetPercent, ready]);

  return (
    <div className="text-center mb-8">
      <div
        style={{
          width: 148,
          height: 148,
          borderRadius: "50%",
          position: "relative",
          overflow: "hidden",
          margin: "0 auto 14px",
          background: `rgba(${RGB},0.04)`,
          border: `1.5px solid rgba(${RGB},0.25)`,
          boxShadow: `0 0 32px rgba(${RGB},${(filled / 100) * 0.3})`,
        }}
      >
        {/* Fill from bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: `${filled}%`,
            background: `linear-gradient(0deg, rgba(${RGB},0.95) 0%, rgba(${RGB},0.3) 100%)`,
            boxShadow: `0 -6px 20px rgba(${RGB},0.5)`,
            transition: "height 0.05s linear",
          }}
        />

        {/* Scanlines for digital feel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Brain + electric emoji */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "60px",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))",
            zIndex: 1,
          }}
        >
          🧠
        </div>
      </div>

      <div
        style={{
          fontSize: "clamp(36px, 9vw, 48px)",
          fontWeight: 900,
          color: THEME,
          letterSpacing: "-0.04em",
          fontFamily: "'Inter', sans-serif",
          textShadow: `0 0 28px rgba(${RGB},0.5)`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {filled}%
      </div>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginTop: "4px" }}>
        あなたの脳のドーパミン汚染度
      </p>
    </div>
  );
}

// ── Main client ───────────────────────────────────────────────────────────────

interface Props {
  params: Record<string, string>;
}

interface Particle {
  id: number;
  dx: number;
  dy: number;
}

export default function DopaGakiResultClient({ params }: Props) {
  const deviation = Number(params.d ?? 50);
  const rank = params.r ?? "";
  const rankEmoji = params.re ?? "";
  const strengthKey = params.str ?? DOPA_KEYS[0];
  const weaknessKey = params.wk ?? DOPA_KEYS[DOPA_KEYS.length - 1];
  const percentile = Number(params.p ?? 50);

  const normalizedScores: Record<string, number> = {};
  for (const key of DOPA_KEYS) {
    normalizedScores[key] = Number(params[key] ?? 50);
  }

  const typeName = getDopaTypeName(deviation);
  const brainPercent = getDopaBrainPercent(deviation);

  const punchline =
    DOPA_AXIS_DESCS[strengthKey as DopaKey]?.s && DOPA_AXIS_DESCS[weaknessKey as DopaKey]?.w
      ? `${DOPA_AXIS_DESCS[strengthKey as DopaKey].s}のに、${DOPA_AXIS_DESCS[weaknessKey as DopaKey].w}。`
      : null;

  const [displayDev, setDisplayDev] = useState(50);
  const [jitter, setJitter] = useState(0);
  const [countDone, setCountDone] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [barsReady, setBarsReady] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplayDev(deviation);
      setCountDone(true);
      setBarsReady(true);
      return;
    }

    const obj = { val: 50 };
    tweenRef.current = gsap.to(obj, {
      val: deviation,
      duration: 1.2,
      ease: "power2.out",
      onUpdate() {
        setDisplayDev(Math.round(obj.val));
        setJitter((Math.random() - 0.5) * 4);
      },
      onComplete() {
        setJitter(0);
        setCountDone(true);
        setBarsReady(true);
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

    return () => { tweenRef.current?.kill(); };
  }, [deviation]);

  const gradeLines = [...DOPA_KEYS]
    .map((k) => `${DOPA_LABELS[k]}${toGrade(normalizedScores[k])}`)
    .join(" / ");

  const shareText = [
    `ドパガキ偏差値${deviation} — ${typeName}`,
    `\n脳のドーパミン汚染度${brainPercent}%でした🧠⚡`,
    punchline ? `\n「${punchline}」` : "",
    `\n\n${gradeLines}`,
    `\n\nあなたも診断してみて\n→ renai-hensachi.vercel.app/dopa-gaki/quiz`,
  ].join("");

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent("https://renai-hensachi.vercel.app/dopa-gaki/quiz")}&text=${encodeURIComponent(`ドパガキ偏差値${deviation} — ${typeName}。脳のドーパミン汚染度${brainPercent}%でした🧠⚡`)}`;

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const crossLinks = crossLinksExcluding("/dopa-gaki/quiz");
  const isNoData = !params.d;

  if (isNoData) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center px-5"
        style={{ background: BG }}
      >
        <p className="text-center mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          先に診断を受けてください。
        </p>
        <Link
          href="/dopa-gaki/quiz"
          className="text-sm px-6 py-3 rounded-xl font-bold text-white"
          style={{ background: THEME, color: "#000" }}
        >
          診断を始める
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center" style={{ background: BG }}>
      <div className="w-full max-w-2xl mx-auto px-5 py-12">

        {/* ── 偏差値ヒーロー ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            🧠⚡ ドパガキ偏差値テスト
          </p>

          {/* 偏差値 + particles */}
          <div className="relative inline-block mb-3">
            <div
              className="font-black leading-none"
              style={{
                fontSize: "clamp(80px, 18vw, 120px)",
                color: THEME,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                fontFamily: "'Inter', sans-serif",
                transform: `translateX(${jitter}px)`,
                transition: "transform 0.05s linear",
                textShadow: `0 0 60px rgba(${RGB},0.4)`,
              }}
            >
              {displayDev}
            </div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="score-particle"
                style={{
                  "--pdx": `${p.dx}px`,
                  "--pdy": `${p.dy}px`,
                  background: THEME,
                  boxShadow: `0 0 6px ${THEME}`,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Type name */}
          {countDone ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-black mb-3"
              style={{
                fontSize: "clamp(20px, 5vw, 28px)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {typeName}
            </motion.p>
          ) : (
            <div style={{ height: "36px" }} />
          )}

          {/* Rank badge */}
          {countDone ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 22 }}
              className="inline-flex items-center gap-2 text-base font-bold px-5 py-2 rounded-full mb-4 badge-pulse"
              style={{
                background: `rgba(${RGB},0.13)`,
                color: "#fff",
                border: `1px solid rgba(${RGB},0.35)`,
              }}
            >
              {rankEmoji} {rank}
            </motion.div>
          ) : (
            <div style={{ height: "44px" }} />
          )}

          {/* 上位XX% */}
          {countDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              上位{" "}
              <span style={{ color: THEME, fontWeight: 700, textShadow: `0 0 12px rgba(${RGB},0.5)` }}>
                {percentile}%
              </span>{" "}
              に位置します
            </motion.p>
          )}
        </motion.div>

        {/* ── ドーパミン汚染度 ── */}
        {countDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="rounded-2xl p-6 mb-5"
            style={{
              background: `rgba(${RGB},0.05)`,
              border: `1.5px solid rgba(${RGB},0.22)`,
            }}
          >
            <BrainMeter targetPercent={brainPercent} ready={countDone} />
          </motion.div>
        )}

        {/* ── パンチライン ── */}
        {punchline && countDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.45 }}
            className="rounded-2xl p-5 mb-6 text-center"
            style={{
              background: `rgba(${RGB},0.07)`,
              border: `1px solid rgba(${RGB},0.18)`,
            }}
          >
            <p
              className="text-sm font-bold leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              「{punchline}」
            </p>
          </motion.div>
        )}

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
          <p className="text-xs font-bold mb-4 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
            5軸レーダーチャート
          </p>
          <GenericRadarChart
            scores={normalizedScores}
            labels={DOPA_LABELS}
            keys={[...DOPA_KEYS]}
            color={THEME}
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
          <p className="text-xs font-bold mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
            カテゴリ別スコア
          </p>
          <div className="flex flex-col gap-4">
            {[...DOPA_KEYS].map((key, idx) => {
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
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {DOPA_LABELS[key]}
                      </span>
                      <span
                        className="text-xs font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: `rgba(${RGB},0.18)`,
                          color: THEME,
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {grade}
                      </span>
                    </div>
                    <span className="text-sm font-black" style={{ color: THEME }}>
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
                      transition={{ delay: 0.2 + idx * 0.12, duration: 0.65, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        width: `${val}%`,
                        background: `linear-gradient(90deg, rgba(${RGB},0.6), ${THEME})`,
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
            style={{ background: `rgba(${RGB},0.06)`, border: `1px solid rgba(${RGB},0.2)` }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: THEME }}>
              ⚡ 最も汚染されている軸
            </p>
            <p className="text-sm font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.9)" }}>
              {DOPA_LABELS[strengthKey as DopaKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {STRENGTH_TEXTS[strengthKey]}
            </p>
          </div>
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              🌱 比較的クリーンな軸
            </p>
            <p className="text-sm font-bold mb-1.5" style={{ color: "rgba(255,255,255,0.9)" }}>
              {DOPA_LABELS[weaknessKey as DopaKey]}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              {WEAKNESS_TEXTS[weaknessKey]}
            </p>
          </div>
        </motion.div>

        {/* ── シェアボタン ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
          className="flex flex-col gap-3 mb-6"
        >
          {/* X */}
          <motion.a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ boxShadow: `0 0 28px rgba(${RGB},0.4)`, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base"
            style={{ background: THEME, color: "#000" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェア
          </motion.a>

          <div className="grid grid-cols-2 gap-3">
            {/* LINE */}
            <motion.a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
              style={{
                background: "rgba(0,185,0,0.12)",
                border: "1px solid rgba(0,185,0,0.25)",
                color: "#00B900",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              LINEで送る
            </motion.a>

            {/* コピー */}
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            >
              {copied ? (
                <>✓ コピー済み</>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  テキストコピー
                </>
              )}
            </motion.button>
          </div>

          <Link
            href="/dopa-gaki/quiz"
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

        {/* ── ドーパミンリセットアプリ X フォロー CTA ── */}
        <motion.a
          href="https://x.com/Yoko_ai_dev"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01, boxShadow: `0 8px 24px rgba(${RGB},0.12)` }}
          transition={{ duration: 0.18 }}
          className="block rounded-2xl p-5 mb-6"
          style={{
            background: `rgba(${RGB},0.05)`,
            border: `1.5px solid rgba(${RGB},0.2)`,
            textDecoration: "none",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">🧠</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold mb-1.5" style={{ color: THEME }}>
                ドーパミン汚染度が高かったあなたへ
              </p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
                脳をリセットする自己管理アプリを開発中
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
                リリース通知を受け取るには @Yoko_ai_dev をフォロー。
                即時報酬癖を逆手に取った設計を考えています。
              </p>
              <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: THEME }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Xでフォローしてリリース通知を受け取る →
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
          <p className="text-xs font-bold mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            偏差値シリーズ — 他のテスト
          </p>
          <div className="flex flex-col gap-0">
            {crossLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined }}
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
                <div className="w-1.5 h-5 rounded-full shrink-0" style={{ background: link.color, opacity: 0.6 }} />
              </Link>
            ))}
          </div>
        </div>

        {/* フッター */}
        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
            @Yoko_ai_dev
          </a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
            Portfolio
          </a>
        </p>
      </div>

      <GhostCommentWidget color={THEME} delay={8} />
    </main>
  );
}
