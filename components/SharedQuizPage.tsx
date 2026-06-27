"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { GenericQuestion } from "@/lib/generic-types";

interface Props {
  questions: GenericQuestion[];
  themeColor: string;
  bgGradient: string; // kept for API compatibility
  resultBasePath: string;
  computeResultParams: (answers: Record<string, number>) => Record<string, string>;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

interface RippleState {
  key: number;
  x: number;
  y: number;
}

export default function SharedQuizPage({
  questions,
  themeColor,
  resultBasePath,
  computeResultParams,
}: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingNum, setLoadingNum] = useState(50);
  const [ripples, setRipples] = useState<Record<number, RippleState>>({});
  const rippleTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const total = questions.length;
  const q = questions[current];
  const rgb = hexToRgb(themeColor);

  // Background tints slightly as quiz progresses (0% → 4%)
  const bgAlpha = (current / total) * 0.04;

  const addRipple = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = Date.now();
    setRipples((prev) => ({ ...prev, [idx]: { key, x, y } }));
    // clear ripple after animation
    if (rippleTimers.current[idx]) clearTimeout(rippleTimers.current[idx]);
    rippleTimers.current[idx] = setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        delete next[idx];
        return next;
      });
    }, 600);
  };

  const handleSelect = useCallback(
    (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
      if (busy || loading) return;
      addRipple(idx, e);
      setSelected(idx);
      setBusy(true);

      setTimeout(() => {
        const next = { ...answers, [q.id]: idx };
        setAnswers(next);

        if (current < total - 1) {
          setCurrent((c) => c + 1);
          setSelected(null);
          setTimeout(() => setBusy(false), 350);
        } else {
          setLoading(true);
          const iv = setInterval(() => {
            setLoadingNum(Math.floor(Math.random() * 99) + 1);
          }, 80);
          setTimeout(() => {
            clearInterval(iv);
            const params = computeResultParams(next);
            router.push(
              `${resultBasePath}/result?${new URLSearchParams(params).toString()}`
            );
          }, 1500);
        }
      }, 220);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [busy, loading, answers, current, q, router, total, computeResultParams, resultBasePath]
  );

  const handleBack = () => {
    if (current === 0 || busy || loading) return;
    setCurrent((c) => c - 1);
    setSelected(null);
  };

  const progress = (current / total) * 100;

  // ── ローディング画面 ──
  if (loading) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: `rgba(${rgb},0.03)` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p
            className="text-sm font-bold mb-6 tracking-widest uppercase"
            style={{
              color: `rgba(${rgb},0.5)`,
              fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
            }}
          >
            Analyzing...
          </p>
          <div
            className="font-black tabular-nums leading-none mb-4"
            style={{
              fontSize: "clamp(96px,20vw,144px)",
              color: themeColor,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {loadingNum}
          </div>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            偏差値を計算しています
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col transition-colors duration-700"
      style={{ background: `rgba(${rgb},${bgAlpha})` }}
    >
      {/* ── Sticky 3px progress bar ── */}
      <div
        className="sticky top-0 z-10 w-full"
        style={{ height: "3px", background: "rgba(0,0,0,0.07)" }}
      >
        <motion.div
          style={{ height: "100%", background: themeColor, originX: 0 }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-xl">

          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="text-sm px-4 py-2 rounded-xl transition-all"
              style={{
                color: current === 0 ? "#d1d5db" : "#6b7280",
                background:
                  current === 0 ? "transparent" : "rgba(0,0,0,0.04)",
                border: `1px solid ${
                  current === 0 ? "transparent" : "rgba(0,0,0,0.08)"
                }`,
                cursor: current === 0 ? "default" : "pointer",
              }}
            >
              ← 戻る
            </button>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: themeColor,
              }}
            >
              {String(current + 1).padStart(2, "0")}
              <span style={{ color: "#d1d5db", fontWeight: 400 }}>
                {" / "}
                {String(total).padStart(2, "0")}
              </span>
            </p>

            <div className="w-16" />
          </div>

          {/* ── Question + Options ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
            >
              {/* Question card */}
              <div
                className="rounded-2xl p-6 mb-5"
                style={{
                  background: "#ffffff",
                  border: `1.5px solid rgba(${rgb},0.14)`,
                  boxShadow: `0 2px 16px rgba(${rgb},0.07)`,
                }}
              >
                <p
                  className="text-lg font-bold leading-relaxed"
                  style={{
                    color: "#1a1a1a",
                    letterSpacing: "-0.01em",
                    fontFamily: "'Noto Sans JP', sans-serif",
                  }}
                >
                  {q.text}
                </p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx;
                  const ripple = ripples[idx];
                  return (
                    <motion.button
                      key={idx}
                      onClick={(e) => handleSelect(idx, e)}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{
                        borderColor: themeColor,
                        boxShadow: `0 0 20px rgba(${rgb},0.14)`,
                      }}
                      transition={{ duration: 0.14 }}
                      className="w-full text-left p-4 rounded-xl flex items-start gap-4 relative overflow-hidden"
                      style={{
                        background: isSelected
                          ? `rgba(${rgb},0.07)`
                          : "#ffffff",
                        border: `1.5px solid ${
                          isSelected ? themeColor : "rgba(0,0,0,0.1)"
                        }`,
                        cursor: "pointer",
                        boxShadow: isSelected
                          ? `0 0 0 3px rgba(${rgb},0.12)`
                          : "none",
                      }}
                    >
                      {/* Ripple */}
                      {ripple && (
                        <span
                          key={ripple.key}
                          className="ripple-wave"
                          style={{
                            left: ripple.x,
                            top: ripple.y,
                            background: `rgba(${rgb},0.35)`,
                          }}
                        />
                      )}

                      <span
                        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black mt-0.5"
                        style={{
                          background: isSelected
                            ? themeColor
                            : "rgba(0,0,0,0.06)",
                          color: isSelected ? "#fff" : "#9ca3af",
                          transition: "all 0.14s ease",
                        }}
                      >
                        {OPTION_LABELS[idx]}
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{
                          color: isSelected ? "#111827" : "#374151",
                          fontFamily: "'Noto Sans JP', sans-serif",
                        }}
                      >
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Dot progress ── */}
          <div className="mt-8 flex gap-1 justify-center flex-wrap">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  background:
                    i < current
                      ? themeColor
                      : i === current
                      ? `rgba(${rgb},0.35)`
                      : "rgba(0,0,0,0.1)",
                  scale: i === current ? 1.3 : 1,
                }}
                transition={{ duration: 0.2 }}
                style={{ width: "6px", height: "6px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
