"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORIES = [
  {
    label: "性格・人間関係",
    tests: [
      {
        href: "/love/quiz",
        emoji: "💘",
        name: "恋愛偏差値テスト",
        desc: "なぜ恋愛がうまくいかないか、5軸の数値で見える",
        axes: ["表現力", "傾聴力", "察し力", "告白力", "依存度"],
        color: "#EC4899",
        primary: true,
      },
      {
        href: "/commu/quiz",
        emoji: "💬",
        name: "コミュ力偏差値テスト",
        desc: "どの軸で詰まっているか数値で分かる",
        axes: ["表現力", "傾聴力", "場の読み"],
        color: "#0EA5E9",
        primary: false,
      },
      {
        href: "/inka/quiz",
        emoji: "🌙",
        name: "陰キャ偏差値テスト",
        desc: "自分がどのタイプの陰キャか分類される",
        axes: ["人見知り度", "ぼっち耐性", "陰の趣味力"],
        color: "#8B5CF6",
        primary: false,
      },
    ],
  },
  {
    label: "思考・認知",
    tests: [
      {
        href: "/jiatama/quiz",
        emoji: "🧠",
        name: "地頭偏差値テスト",
        desc: "パターン認識・論理推論・直感抑制。25問で認知力を偏差値化",
        axes: ["パターン認識", "抽象化", "論理推論", "前提検証", "直感抑制"],
        color: "#10B981",
        primary: false,
      },
      {
        href: "/saki-nobashi/quiz",
        emoji: "🛋️",
        name: "先延ばし偏差値テスト",
        desc: "後回しグセ・楽観バイアス・完璧主義。あなたの先延ばしタイプが分かる",
        axes: ["後回しグセ", "決断力", "楽観バイアス", "自己管理", "完璧主義"],
        color: "#F59E0B",
        primary: false,
      },
    ],
  },
  {
    label: "就活・キャリア",
    tests: [
      {
        href: "/shukatsu/quiz",
        emoji: "💼",
        name: "就活偏差値テスト（文系）",
        desc: "自己分析・業界研究・面接力。選考前の弱点が分かる",
        axes: ["自己分析力", "業界・企業研究", "面接力"],
        color: "#3B82F6",
        primary: false,
      },
      {
        href: "/shukatsu-it/quiz",
        emoji: "💻",
        name: "就活偏差値テスト（IT系）",
        desc: "技術力・ポートフォリオ・自走力。エンジニア就活の準備度を偏差値化",
        axes: ["技術力", "ポートフォリオ", "自走力"],
        color: "#059669",
        primary: false,
      },
    ],
  },
  {
    label: "お金・リテラシー",
    tests: [
      {
        href: "/money/quiz",
        emoji: "💰",
        name: "お金リテラシー偏差値テスト",
        desc: "貯蓄・投資・制度活用・詐欺耐性。金融リテラシーを5軸で診断",
        axes: ["貯蓄・支出管理", "投資知識", "借入理解", "制度活用力", "リスク認識"],
        color: "#D97706",
        primary: false,
      },
    ],
  },
];

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Card components ──

function PrimaryCard({ t }: { t: (typeof CATEGORIES)[0]["tests"][0] }) {
  const rgb = hexToRgb(t.color);
  return (
    <motion.div
      className="test-card rounded-2xl"
      style={{ transformPerspective: 1000 }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -2,
        boxShadow: `0 20px 60px rgba(${rgb},0.25)`,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <Link
        href={t.href}
        className="block p-8 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(${rgb},0.1) 0%, rgba(${rgb},0.04) 100%)`,
          border: `1px solid rgba(${rgb},0.28)`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-2xl font-black mb-2" style={{ color: "#f0eeff" }}>
              {t.emoji} {t.name}
            </p>
            <p className="text-sm mb-5" style={{ color: "#6a4a6a" }}>
              {t.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.axes.map((a) => (
                <span
                  key={a}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `rgba(${rgb},0.12)`, color: t.color }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <p
            className="text-xs font-mono shrink-0 mt-1"
            style={{ color: "#4a2a4a" }}
          >
            25問 · 5分
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function SmallCard({ t }: { t: (typeof CATEGORIES)[0]["tests"][0] }) {
  const rgb = hexToRgb(t.color);
  return (
    <motion.div
      className="test-card rounded-2xl"
      style={{ transformPerspective: 1000 }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -2,
        boxShadow: `0 20px 60px rgba(${rgb},0.22)`,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <Link
        href={t.href}
        className="block p-6 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(${rgb},0.08) 0%, rgba(${rgb},0.03) 100%)`,
          border: `1px solid rgba(${rgb},0.2)`,
        }}
      >
        <p className="text-lg font-black mb-1.5" style={{ color: "#f0eeff" }}>
          {t.emoji} {t.name}
        </p>
        <p
          className="text-xs mb-4 leading-relaxed"
          style={{ color: "#3a3a5a" }}
        >
          {t.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {t.axes.map((a) => (
            <span
              key={a}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: `rgba(${rgb},0.1)`, color: t.color }}
            >
              {a}
            </span>
          ))}
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "#3a3a5a",
            }}
          >
            +2
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SingleCard({ t }: { t: (typeof CATEGORIES)[0]["tests"][0] }) {
  const rgb = hexToRgb(t.color);
  return (
    <motion.div
      className="test-card rounded-2xl"
      style={{ transformPerspective: 1000 }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -2,
        boxShadow: `0 20px 60px rgba(${rgb},0.22)`,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <Link
        href={t.href}
        className="block p-6 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(${rgb},0.08) 0%, rgba(${rgb},0.03) 100%)`,
          border: `1px solid rgba(${rgb},0.22)`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xl font-black mb-2" style={{ color: "#f0eeff" }}>
              {t.emoji} {t.name}
            </p>
            <p
              className="text-xs mb-4 leading-relaxed"
              style={{ color: "#4a4a6a" }}
            >
              {t.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {t.axes.map((a) => (
                <span
                  key={a}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `rgba(${rgb},0.12)`, color: t.color }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <p
            className="text-xs font-mono shrink-0 mt-1"
            style={{ color: "#3a3a5a" }}
          >
            25問
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Hub ──

export default function Hub() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      // Show all elements immediately
      gsap.set(".hero-char", { opacity: 1, y: 0 });
      gsap.set(".hero-sub", { opacity: 1 });
      gsap.set(".test-card", { opacity: 1, y: 0 });
      gsap.set(".cat-label", { opacity: 1, x: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero text char-by-char stagger
    gsap.fromTo(
      ".hero-char",
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1,
      }
    );

    // 2. Hero sub text fade in after chars complete
    gsap.fromTo(
      ".hero-sub",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.65 }
    );

    // 3. Category labels slide in from left (ScrollTrigger)
    ScrollTrigger.batch(".cat-label", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          }
        ),
      once: true,
      start: "top 92%",
    });

    // 4. Cards fade-up stagger (ScrollTrigger)
    ScrollTrigger.batch(".test-card", {
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: "power3.out",
          }
        ),
      once: true,
      start: "top 92%",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Hero text: split into spans per character
  const line1 = "自分を";
  const line2color = "数値化";
  const line2plain = "する";

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0d0820 0%, #080612 60%, #060410 100%)",
      }}
    >
      {/* ── Gradient mesh blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="mesh-blob"
          style={{
            width: "600px",
            height: "600px",
            top: "-100px",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)",
            animation: "blobDrift1 20s ease-in-out infinite",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "500px",
            height: "500px",
            top: "0",
            right: "-80px",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
            animation: "blobDrift2 24s ease-in-out infinite",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "400px",
            height: "400px",
            top: "40%",
            left: "10%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
            animation: "blobDrift3 18s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-24">

        {/* ── Hero ── */}
        <div className="mb-16">
          <p
            className="text-xs font-mono tracking-widest mb-4"
            style={{ color: "#3a3a5a" }}
          >
            HENSACHI SERIES — 7 TESTS
          </p>

          <h1
            className="font-black leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 10vw, 88px)", color: "#f0eeff" }}
          >
            {/* Line 1 */}
            <span>
              {line1.split("").map((c, i) => (
                <span key={i} className="hero-char" style={{ opacity: 0 }}>
                  {c}
                </span>
              ))}
            </span>
            <br />
            {/* Line 2 — colored part */}
            <span style={{ color: "#e91e8c" }}>
              {line2color.split("").map((c, i) => (
                <span
                  key={i + line1.length}
                  className="hero-char"
                  style={{ opacity: 0 }}
                >
                  {c}
                </span>
              ))}
            </span>
            {/* Line 2 — plain part */}
            <span>
              {line2plain.split("").map((c, i) => (
                <span
                  key={i + line1.length + line2color.length}
                  className="hero-char"
                  style={{ opacity: 0 }}
                >
                  {c}
                </span>
              ))}
            </span>
          </h1>

          <p
            className="hero-sub text-sm max-w-md leading-loose"
            style={{ color: "#4a4a6a", opacity: 0 }}
          >
            心理学論文ベースの25問。偏差値と5軸レーダーで自分の傾向が見える。
          </p>
        </div>

        {/* ── Test cards ── */}
        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <section key={cat.label}>
              {/* Category label */}
              <p
                className="cat-label text-xs font-bold tracking-widest mb-4"
                style={{
                  color: "#3a3a5a",
                  fontFamily: "'Inter', sans-serif",
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    color: "#e91e8c",
                    fontSize: "16px",
                    fontWeight: 800,
                    marginRight: "8px",
                  }}
                >
                  {String(ci + 1).padStart(2, "0")}
                </span>
                {cat.label}
              </p>

              {cat.tests.length === 1 ? (
                <SingleCard t={cat.tests[0]} />
              ) : cat.tests[0].primary ? (
                <div className="space-y-3">
                  <PrimaryCard t={cat.tests[0]} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cat.tests.slice(1).map((t) => (
                      <SmallCard key={t.href} t={t} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.tests.map((t) => (
                    <SmallCard key={t.href} t={t} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "#2a2a4a" }}>
              結果は保存されません。偏差値はN(50,10)正規化スコア。
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com/Yoko_ai_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#2a2a4a" }}
              >
                @Yoko_ai_dev
              </a>
              <a
                href="https://yokoportofolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#2a2a4a" }}
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
