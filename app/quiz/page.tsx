"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { computeResult } from "@/lib/scoring";

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const total = questions.length;
  const q = questions[current];
  const progress = ((current) / total) * 100;

  const handleSelect = useCallback(
    (idx: number) => {
      if (animating) return;
      setSelected(idx);

      setTimeout(() => {
        const next = { ...answers, [q.id]: idx };
        setAnswers(next);

        if (current < total - 1) {
          setAnimating(true);
          setTimeout(() => {
            setCurrent((c) => c + 1);
            setSelected(null);
            setAnimating(false);
          }, 180);
        } else {
          // 完了 → スコア計算 → 結果ページへ
          const result = computeResult(next);
          const params = new URLSearchParams({
            d: String(result.deviation),
            c: String(result.normalizedScores.communication),
            s: String(result.normalizedScores.selfAwareness),
            e: String(result.normalizedScores.empathy),
            i: String(result.normalizedScores.initiative),
            m: String(result.normalizedScores.mentalStability),
            r: result.rank,
            re: result.rankEmoji,
            str: result.strength,
            wk: result.weakness,
            p: String(result.percentile),
          });
          router.push(`/result?${params.toString()}`);
        }
      }, 220);
    },
    [animating, answers, current, q, router, total]
  );

  const handleBack = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setSelected(null);
  };

  const OPTION_LABELS = ["A", "B", "C", "D"];

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%, #12041f 100%)",
      }}
    >
      {/* プログレスバー */}
      <div className="w-full h-1" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full progress-bar"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #c2185b, #e91e8c)",
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-xl">
          {/* カウンター */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="text-sm px-4 py-2 rounded-xl transition-all"
              style={{
                color: current === 0 ? "rgba(155,118,170,0.3)" : "#9876aa",
                background: current === 0 ? "transparent" : "rgba(255,255,255,0.04)",
                border: `1px solid ${current === 0 ? "transparent" : "rgba(255,255,255,0.08)"}`,
                cursor: current === 0 ? "default" : "pointer",
              }}
            >
              ← 戻る
            </button>
            <span className="text-sm font-bold" style={{ color: "#9876aa" }}>
              <span style={{ color: "#f0e8ff" }}>{current + 1}</span>
              {" / "}
              {total}
            </span>
            <div className="w-16" /> {/* spacer */}
          </div>

          {/* 問題文 */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            key={q.id}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#e91e8c" }}
            >
              Q.{current + 1}
            </p>
            <p
              className="text-lg font-bold leading-relaxed"
              style={{ color: "#f0e8ff", letterSpacing: "-0.01em" }}
            >
              {q.text}
            </p>
          </div>

          {/* 選択肢 */}
          <div className="flex flex-col gap-3">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="option-btn w-full text-left p-4 rounded-xl flex items-start gap-4"
                  style={{
                    background: isSelected
                      ? "rgba(233,30,140,0.18)"
                      : "rgba(255,255,255,0.03)",
                    border: isSelected
                      ? "1px solid #e91e8c"
                      : "1px solid rgba(255,255,255,0.08)",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black mt-0.5"
                    style={{
                      background: isSelected
                        ? "#e91e8c"
                        : "rgba(255,255,255,0.06)",
                      color: isSelected ? "#fff" : "#9876aa",
                    }}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: isSelected ? "#f0e8ff" : "#c4a8d8" }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ミニプログレス */}
          <div className="mt-8 flex gap-1 justify-center flex-wrap">
            {questions.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    i < current
                      ? "#e91e8c"
                      : i === current
                      ? "rgba(233,30,140,0.5)"
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
