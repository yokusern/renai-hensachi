"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/seikaku-warusa-questions";
import { computeSeikakuParams } from "@/lib/seikaku-warusa-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#BE123C";

export default function SeikakuWarusaQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/seikaku-warusa"
      computeResultParams={computeSeikakuParams}
    />
  );
}
