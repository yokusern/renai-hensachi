"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { shukatsuQuestions } from "@/data/shukatsu-questions";
import { computeShukatsuParams } from "@/lib/shukatsu-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const BG = "linear-gradient(160deg, #0a0e1a 0%, #060810 60%, #0c1020 100%)";
const THEME = "#3B82F6";

export default function ShukatsuQuizPage() {
  return (
    <SharedQuizPage
      questions={shukatsuQuestions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient={BG}
      resultBasePath="/shukatsu"
      computeResultParams={computeShukatsuParams}
    />
  );
}
