"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

function TestCard({ t, size = "sm" }: { t: (typeof CATEGORIES)[0]["tests"][0]; size?: "sm" | "lg" }) {
  const rgb = hexToRgb(t.color);
  const padding = size === "lg" ? "p-8" : "p-6";
  const titleSize = size === "lg" ? "text-2xl" : "text-lg";
  const descColor = size === "lg" ? "#6a4a6a" : "#3a3a5a";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(${rgb},0.18)` }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-2xl"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},${size === "lg" ? "0.1" : "0.08"}) 0%, rgba(${rgb},0.03) 100%)`,
        border: `1px solid rgba(${rgb},${size === "lg" ? "0.28" : "0.2"})`,
      }}
    >
      <Link href={t.href} className={`block ${padding}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className={`${titleSize} font-black mb-2`} style={{ color: "#f0eeff" }}>
              {t.emoji} {t.name}
            </p>
            <p className={`${size === "lg" ? "text-sm mb-5" : "text-xs mb-4 leading-relaxed"}`} style={{ color: descColor }}>
              {t.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {t.axes.map((a) => (
                <span
                  key={a}
                  className={`${size === "lg" ? "text-xs px-2.5 py-1 font-medium" : "text-[10px] px-2 py-0.5"} rounded-full`}
                  style={{ background: `rgba(${rgb},0.12)`, color: t.color }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs font-mono shrink-0 mt-1" style={{ color: size === "lg" ? "#4a2a4a" : "#3a3a5a" }}>
            {size === "lg" ? "25問 · 5分" : "25問"}
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
      whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(${rgb},0.18)` }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-2xl"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},0.08) 0%, rgba(${rgb},0.03) 100%)`,
        border: `1px solid rgba(${rgb},0.2)`,
      }}
    >
      <Link href={t.href} className="block p-6">
        <p className="text-lg font-black mb-1.5" style={{ color: "#f0eeff" }}>
          {t.emoji} {t.name}
        </p>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "#3a3a5a" }}>
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
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", color: "#3a3a5a" }}>
            +2
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Hub() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #0d0820 0%, #080612 60%, #060410 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-24">

        {/* ヒーロー */}
        <div className="mb-16">
          <p className="text-xs font-mono tracking-widest mb-4" style={{ color: "#3a3a5a" }}>
            HENSACHI SERIES — 7 TESTS
          </p>
          <h1
            className="font-black leading-[0.9] tracking-tight mb-6"
            style={{ fontSize: "clamp(52px, 10vw, 88px)", color: "#f0eeff" }}
          >
            自分を<br />
            <span style={{ color: "#e91e8c" }}>数値化</span>する
          </h1>
          <p className="text-sm max-w-md leading-loose" style={{ color: "#4a4a6a" }}>
            心理学論文ベースの25問。偏差値と5軸レーダーで自分の傾向が見える。
          </p>
        </div>

        {/* テスト一覧 */}
        <div className="space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <section key={cat.label}>
              <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "#3a3a5a" }}>
                {String(ci + 1).padStart(2, "0")} {cat.label}
              </p>

              {cat.tests.length === 1 ? (
                <TestCard t={cat.tests[0]} size="sm" />
              ) : cat.tests[0].primary ? (
                <div className="space-y-3">
                  <TestCard t={cat.tests[0]} size="lg" />
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

        {/* フッター */}
        <div className="mt-16 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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
