"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GhostCommentWidget } from "@/components/GhostCommentWidget";
import { CATEGORY_LABELS } from "@/lib/inka-scoring";
import type { CategoryKey } from "@/data/inka-questions";
import { crossLinksExcluding } from "@/lib/all-tests";

const InkaRadarChart = dynamic(() => import("@/components/InkaRadarChart"), { ssr: false });

interface Props {
  params: Record<string, string>;
}

const CATEGORY_KEYS: CategoryKey[] = ["hitomishiri", "bocchi", "hobbies", "groupAversion", "invisible"];

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

const AXIS_DESCS: Record<CategoryKey, { s: string; w: string }> = {
  hitomishiri: { s: "人見知りが本物の純正タイプ", w: "初対面も案外いける" },
  bocchi: { s: "ひとりの時間が心地よいソロ型", w: "実は誰かといたい" },
  hobbies: { s: "インドア趣味への没頭力がある", w: "意外と外向きな趣味もある" },
  groupAversion: { s: "群れが苦手な一匹狼", w: "群れること自体は割と平気" },
  invisible: { s: "空気になれる透明人間型", w: "意外とプレゼンスが高い" },
};

function getTypeName(dev: number): string {
  if (dev >= 70) return "純正陰キャ";
  if (dev >= 55) return "中堅陰キャ";
  if (dev >= 40) return "ライト陰キャ";
  return "隠れ陽キャ";
}

interface Particle { id: number; dx: number; dy: number; }

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

  const typeName = getTypeName(deviation);
  const punchline =
    AXIS_DESCS[strengthKey]?.s && AXIS_DESCS[weaknessKey]?.w
      ? `${AXIS_DESCS[strengthKey].s}なのに、${AXIS_DESCS[weaknessKey].w}。`
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
        if (window.innerWidth >= 768) {
          const ps = Array.from({ length: 20 }, (_, i) => ({
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

  const toGrade = (s: number) => s >= 70 ? "A" : s >= 55 ? "B" : s >= 40 ? "C" : "D";
  const scores5 = CATEGORY_KEYS.map((k) => `${CATEGORY_LABELS[k]}${toGrade(normalizedScores[k])}`).join(" / ");

  const shareText = [
    `陰キャ偏差値テストの結果：偏差値${deviation} ― ${typeName}`,
    punchline ? `\n「${punchline}」` : "",
    `\n\n${scores5}`,
    `\n\nあなたも診断してみて\n→ renai-hensachi.vercel.app/inka`,
  ].join("");
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

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
    <main className="min-h-screen flex flex-col items-center" style={{ background: "linear-gradient(160deg, #120826 0%, #08051a 60%, #060318 100%)" }}>
      <div className="w-full max-w-2xl mx-auto px-5 py-12">

        {/* ── ヒーロー ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold mb-3" style={{ color: "#7a5a99" }}>🌙 陰キャ偏差値テスト</p>

          <div className="relative inline-block mb-3">
            <div
              className="font-black leading-none"
              style={{
                fontSize: "clamp(80px,18vw,120px)",
                color: "#a855f7",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                fontFamily: "'Inter', sans-serif",
                transform: `translateX(${jitter}px)`,
                transition: "transform 0.05s linear",
                textShadow: "0 0 60px rgba(168,85,247,0.4)",
              }}
            >
              {displayDev}
            </div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="score-particle"
                style={{ "--pdx": `${p.dx}px`, "--pdy": `${p.dy}px`, background: "#a855f7", boxShadow: "0 0 6px #a855f7" } as React.CSSProperties}
              />
            ))}
          </div>

          {countDone ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-black mb-3"
              style={{ fontSize: "clamp(20px,5vw,28px)", color: "#fff", letterSpacing: "-0.02em" }}
            >
              {typeName}
            </motion.p>
          ) : <div style={{ height: "36px" }} />}

          {countDone ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 22 }}
              className="inline-flex items-center gap-2 text-base font-bold px-5 py-2 rounded-full mb-4 badge-pulse"
              style={{ background: "rgba(168,85,247,0.13)", color: "#f0e8ff", border: "1px solid rgba(168,85,247,0.35)" }}
            >
              {rankEmoji} {rank}
            </motion.div>
          ) : <div style={{ height: "44px" }} />}

          {countDone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-sm"
              style={{ color: "#3a2a5a" }}
            >
              上位 <span style={{ color: "#a855f7", fontWeight: 700, textShadow: "0 0 12px rgba(168,85,247,0.5)" }}>{percentile}%</span> の陰キャ度
            </motion.p>
          )}
        </motion.div>

        {/* ── パンチライン ── */}
        {punchline && countDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.45 }}
            className="rounded-2xl p-5 mb-6 text-center"
            style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.18)" }}
          >
            <p className="text-sm font-bold leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
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
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold mb-4 text-center" style={{ color: "#7a5a99" }}>5軸レーダーチャート</p>
          <InkaRadarChart scores={normalizedScores} labels={CATEGORY_LABELS as Record<string, string>} />
        </motion.div>

        {/* ── カテゴリ別スコアバー ── */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs font-bold mb-5" style={{ color: "#7a5a99" }}>カテゴリ別スコア</p>
          <div className="flex flex-col gap-4">
            {CATEGORY_KEYS.map((key, idx) => {
              const val = normalizedScores[key] ?? 0;
              const color = BAR_COLORS[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={barsReady ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + idx * 0.12, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium" style={{ color: "#c4a8d8" }}>{CATEGORY_LABELS[key]}</span>
                    <span className="text-sm font-black" style={{ color }}>{val}</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={barsReady ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.2 + idx * 0.12, duration: 0.65, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, transformOrigin: "left" }}
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
          <div className="rounded-2xl p-5" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "#a855f7" }}>🌙 最も陰キャな軸</p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>{CATEGORY_LABELS[strengthKey]}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#7a5a99" }}>{STRENGTH_TEXTS[strengthKey]}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "#c084fc" }}>☀️ 陽キャ寄りの軸</p>
            <p className="text-sm font-bold mb-1" style={{ color: "#f0e8ff" }}>{CATEGORY_LABELS[weaknessKey]}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#7a5a99" }}>{WEAKNESS_TEXTS[weaknessKey]}</p>
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
            whileHover={{ boxShadow: "0 0 28px rgba(168,85,247,0.4)", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "#9333ea" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェアする
          </motion.a>
          <Link
            href="/inka/quiz"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#7a5a99" }}
          >
            もう一度やる
          </Link>
        </motion.div>

        {/* ── note記事CTA ── */}
        <motion.a
          href="https://note.com/zen_ai_logic"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(168,85,247,0.12)" }}
          transition={{ duration: 0.18 }}
          className="block rounded-2xl p-5 mb-6"
          style={{ background: "rgba(147,51,234,0.09)", border: "1px solid rgba(168,85,247,0.25)", textDecoration: "none" }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold mb-1.5" style={{ color: "#a855f7" }}>このテストで調べた論文が記事になりました</p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "#f0e8ff" }}>
                人見知りを治そうとして、頑張るたびにしんどくなってた
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#7a5a99" }}>
                頑張るほどしんどくなる理由。心理学研究5本が示していたのは、「治し方」より先にある話だった。
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(168,85,247,0.2)", color: "#c084fc" }}>¥980</span>
                <span className="text-xs font-bold" style={{ color: "#a855f7" }}>noteで読む →</span>
              </div>
            </div>
          </div>
        </motion.a>

        {/* ── 他のテスト ── */}
        <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-bold mb-3 text-center" style={{ color: "#3a2a5a" }}>偏差値シリーズ — 他にも診断してみる</p>
          <div className="flex flex-col gap-1">
            {crossLinksExcluding("/inka/quiz").map((test) => (
              <Link key={test.href} href={test.href} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5">
                <span className="text-lg">{test.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>{test.name}</p>
                  <p className="text-xs" style={{ color: "#3a2a5a" }}>{test.desc} →</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: test.color }} />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: "#2a1a4a" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">@Yoko_ai_dev</a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-400 transition-colors">Portfolio</a>
        </p>
      </div>
      <GhostCommentWidget color="#A855F7" delay={8} />
    </main>
  );
}
