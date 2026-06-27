"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { shukatsuItQuestions } from "@/data/shukatsu-it-questions";
import { computeShukatsuItParams } from "@/lib/shukatsu-it-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const BG = "linear-gradient(160deg, #031209 0%, #020c06 60%, #041510 100%)";
const THEME = "#059669";

export default function ShukatsuItQuizPage() {
  return (
    <SharedQuizPage
      questions={shukatsuItQuestions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient={BG}
      resultBasePath="/shukatsu-it"
      computeResultParams={computeShukatsuItParams}
    />
  );
}
