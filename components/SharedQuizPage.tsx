"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { GenericQuestion } from "@/lib/generic-types";

interface Props {
  questions: GenericQuestion[];
  themeColor: string;
  bgGradient: string;
  resultBasePath: string;
  computeResultParams: (answers: Record<string, number>) => Record<string, string>;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function SharedQuizPage({
  questions,
  themeColor,
  bgGradient,
  resultBasePath,
  computeResultParams,
}: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const total = questions.length;
  const q = questions[current];
  const progress = (current / total) * 100;

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
          const params = computeResultParams(next);
          router.push(`${resultBasePath}/result?${new URLSearchParams(params).toString()}`);
        }
      }, 220);
    },
    [animating, answers, current, q, router, total, computeResultParams, resultBasePath]
  );

  const handleBack = () => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setSelected(null);
  };

  return (
    <main className="min-h-screen flex flex-col" style={{ background: bgGradient }}>
      {/* プログレスバー */}
      <div className="w-full h-1" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: themeColor,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-xl">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              disabled={current === 0}
              className="text-sm px-4 py-2 rounded-xl transition-all"
              style={{
                color: current === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.35)",
                background: current === 0 ? "transparent" : "rgba(255,255,255,0.04)",
                border: `1px solid ${current === 0 ? "transparent" : "rgba(255,255,255,0.08)"}`,
                cursor: current === 0 ? "default" : "pointer",
              }}
            >
              ← 戻る
            </button>

            <div className="text-center">
              <span
                className="font-black"
                style={{ color: themeColor, fontSize: "22px", letterSpacing: "-0.02em" }}
              >
                Q.{current + 1}
              </span>
              <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.25)" }}>
                / {total}
              </span>
            </div>

            <div className="w-16" />
          </div>

          {/* 問題文 */}
          <div
            className="rounded-2xl p-6 mb-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateX(-16px)" : "translateX(0)",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
            key={q.id}
          >
            <p
              className="text-lg font-bold leading-relaxed"
              style={{ color: "rgba(255,255,255,0.88)", letterSpacing: "-0.01em" }}
            >
              {q.text}
            </p>
          </div>

          {/* 選択肢 */}
          <div
            className="flex flex-col gap-3"
            style={{
              opacity: animating ? 0 : 1,
              transition: "opacity 0.18s ease",
            }}
          >
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full text-left p-4 rounded-xl flex items-start gap-4"
                  style={{
                    background: isSelected
                      ? `${themeColor}1a`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isSelected ? themeColor : "rgba(255,255,255,0.07)"}`,
                    transition: "all 0.14s ease",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black mt-0.5"
                    style={{
                      background: isSelected ? themeColor : "rgba(255,255,255,0.06)",
                      color: isSelected ? "#fff" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{
                      color: isSelected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ドットプログレス */}
          <div className="mt-8 flex gap-1 justify-center flex-wrap">
            {questions.map((_, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  background:
                    i < current
                      ? themeColor
                      : i === current
                      ? `${themeColor}80`
                      : "rgba(255,255,255,0.1)",
                  transition: "background 0.2s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
