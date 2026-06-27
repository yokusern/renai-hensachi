"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/questions";
import { computeResult } from "@/lib/scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const LOVE_BG = "linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%, #12041f 100%)";
const THEME = "#EC4899";

function computeLoveParams(answers: Record<string, number>): Record<string, string> {
  const result = computeResult(answers);
  return {
    d: String(result.deviation),
    r: result.rank,
    re: result.rankEmoji,
    str: result.strength,
    wk: result.weakness,
    p: String(result.percentile),
    communication: String(result.normalizedScores.communication),
    selfAwareness: String(result.normalizedScores.selfAwareness),
    empathy: String(result.normalizedScores.empathy),
    initiative: String(result.normalizedScores.initiative),
    mentalStability: String(result.normalizedScores.mentalStability),
  };
}

export default function LoveQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient={LOVE_BG}
      resultBasePath="/love"
      computeResultParams={computeLoveParams}
    />
  );
}
