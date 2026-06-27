"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { jiatamaQuestions } from "@/data/jiatama-questions";
import { computeJiatamaParams } from "@/lib/jiatama-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const BG = "linear-gradient(160deg, #051a12 0%, #03100b 60%, #061a13 100%)";
const THEME = "#10B981";

export default function JiatamaQuizPage() {
  return (
    <SharedQuizPage
      questions={jiatamaQuestions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient={BG}
      resultBasePath="/jiatama"
      computeResultParams={computeJiatamaParams}
    />
  );
}
