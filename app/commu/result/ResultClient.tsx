"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { GhostCommentWidget } from "@/components/GhostCommentWidget";
import { CATEGORY_LABELS } from "@/lib/commu-scoring";
import type { CategoryKey } from "@/data/commu-questions";
import { crossLinksExcluding } from "@/lib/all-tests";

const CommuRadarChart = dynamic(() => import("@/components/CommuRadarChart"), { ssr: false });

interface Props {
  params: Record<string, string>;
}

const CATEGORY_KEYS: CategoryKey[] = ["expression", "listening", "awareness", "disclosure", "building"];

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

// axis descriptors for punchline
const AXIS_DESCS: Record<CategoryKey, { s: string; w: string }> = {
  expression: { s: "言いたいことを的確に言葉にできる", w: "思っていることが言葉にならない" },
  listening: { s: "相手の話を引き出すのが得意", w: "相手の話を聞けていない" },
  awareness: { s: "場の空気とタイミングを読める", w: "場の雰囲気を読み切れない" },
  disclosure: { s: "自分をオープンにして距離を縮められる", w: "自分のことを話せない" },
  building: { s: "関係を長続きさせる継続力がある", w: "関係の維持が続かない" },
};

function getTypeName(dev: number): string {
  if (dev >= 70) return "コミュ力の天才";
  if (dev >= 55) return "安定した話し相手";
  if (dev >= 40) return "伸びしろだらけ型";
  return "沈黙が武器型";
}

interface Particle { id: number; dx: number; dy: number; }

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

  const typeName = getTypeName(deviation);
  const punchline =
    AXIS_DESCS[strengthKey]?.s && AXIS_DESCS[weaknessKey]?.w
      ? `${AXIS_DESCS[strengthKey].s}のに、${AXIS_DESCS[weaknessKey].w}。`
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
    `コミュ力偏差値テストの結果：偏差値${deviation} ― ${typeName}`,
    punchline ? `\n「${punchline}」` : "",
    `\n\n${scores5}`,
    `\n\nあなたも診断してみて\n→ renai-hensachi.vercel.app/commu`,
  ].join("");
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
    <main className="min-h-screen flex flex-col items-center" style={{ background: "linear-gradient(160deg, #0a1628 0%, #060e1c 60%, #060b15 100%)" }}>
      <div className="w-full max-w-2xl mx-auto px-5 py-12">

        {/* ── ヒーロー ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold mb-3" style={{ color: "#4a7a99" }}>💬 コミュ力偏差値テスト</p>

          {/* deviation + particles */}
          <div className="relative inline-block mb-3">
            <div
              className="font-black leading-none"
              style={{
                fontSize: "clamp(80px,18vw,120px)",
                color: "#0ea5e9",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                fontFamily: "'Inter', sans-serif",
                transform: `translateX(${jitter}px)`,
                transition: "transform 0.05s linear",
                textShadow: "0 0 60px rgba(14,165,233,0.4)",
              }}
            >
              {displayDev}
            </div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="score-particle"
                style={{ "--pdx": `${p.dx}px`, "--pdy": `${p.dy}px`, background: "#0ea5e9", boxShadow: "0 0 6px #0ea5e9" } as React.CSSProperties}
              />
            ))}
          </div>

          {/* type name */}
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

          {/* rank badge */}
          {countDone ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 22 }}
              className="inline-flex items-center gap-2 text-base font-bold px-5 py-2 rounded-full mb-4 badge-pulse"
              style={{ background: "rgba(14,165,233,0.13)", color: "#e8f4ff", border: "1px solid rgba(14,165,233,0.35)" }}
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
              style={{ color: "#2a5a77" }}
            >
              上位 <span style={{ color: "#0ea5e9", fontWeight: 700, textShadow: "0 0 12px rgba(14,165,233,0.5)" }}>{percentile}%</span> に位置します
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
            style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.18)" }}
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
          <p className="text-xs font-bold mb-4 text-center" style={{ color: "#4a7a99" }}>5軸レーダーチャート</p>
          <CommuRadarChart scores={normalizedScores} labels={CATEGORY_LABELS as Record<string, string>} />
        </motion.div>

        {/* ── カテゴリ別スコアバー ── */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs font-bold mb-5" style={{ color: "#4a7a99" }}>カテゴリ別スコア</p>
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
                    <span className="text-sm font-medium" style={{ color: "#93c5e8" }}>{CATEGORY_LABELS[key]}</span>
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
          <div className="rounded-2xl p-5" style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "#0ea5e9" }}>💪 強み</p>
            <p className="text-sm font-bold mb-1" style={{ color: "#e8f4ff" }}>{CATEGORY_LABELS[strengthKey]}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#4a7a99" }}>{STRENGTH_TEXTS[strengthKey]}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "#a78bfa" }}>🌱 伸びしろ</p>
            <p className="text-sm font-bold mb-1" style={{ color: "#e8f4ff" }}>{CATEGORY_LABELS[weaknessKey]}</p>
            <p className="text-xs leading-relaxed" style={{ color: "#4a7a99" }}>{WEAKNESS_TEXTS[weaknessKey]}</p>
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
            whileHover={{ boxShadow: "0 0 28px rgba(14,165,233,0.4)", scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base"
            style={{ background: "#0284c7" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            結果をXでシェアする
          </motion.a>
          <Link
            href="/commu/quiz"
            className="flex items-center justify-center w-full py-4 rounded-2xl font-bold text-base transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#4a7a99" }}
          >
            もう一度やる
          </Link>
        </motion.div>

        {/* ── note記事CTA ── */}
        <motion.a
          href="https://note.com/zen_ai_logic"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(14,165,233,0.12)" }}
          transition={{ duration: 0.18 }}
          className="block rounded-2xl p-5 mb-6"
          style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)", textDecoration: "none" }}
        >
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-0.5 shrink-0">📖</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold mb-1.5" style={{ color: "#0ea5e9" }}>このテストで調べた論文が記事になりました</p>
              <p className="text-sm font-bold mb-1.5 leading-snug" style={{ color: "#e8f4ff" }}>
                コミュ力が高い人は「話す量」が違うんじゃなかった
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "#4a7a99" }}>
                5つの心理学研究が示していたのは「返し方」の技術だった。話す量じゃない。場面別の会話例 + 7日間トレーニング付き。
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(14,165,233,0.2)", color: "#7dd3f0" }}>¥980</span>
                <span className="text-xs font-bold" style={{ color: "#0ea5e9" }}>noteで読む →</span>
              </div>
            </div>
          </div>
        </motion.a>

        {/* ── 他のテスト ── */}
        <div className="rounded-2xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs font-bold mb-3 text-center" style={{ color: "#2a4a5a" }}>偏差値シリーズ — 他にも診断してみる</p>
          <div className="flex flex-col gap-1">
            {crossLinksExcluding("/commu/quiz").map((test) => (
              <Link key={test.href} href={test.href} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5">
                <span className="text-lg">{test.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: "#f0e8ff" }}>{test.name}</p>
                  <p className="text-xs" style={{ color: "#2a4a5a" }}>{test.desc} →</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: test.color }} />
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: "#1a3a55" }}>
          作成:{" "}
          <a href="https://x.com/Yoko_ai_dev" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">@Yoko_ai_dev</a>
          {" · "}
          <a href="https://yokoportofolio.vercel.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-400 transition-colors">Portfolio</a>
        </p>
      </div>
      <GhostCommentWidget color="#3B82F6" delay={8} />
    </main>
  );
}
