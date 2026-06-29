"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/dokuoya-questions";
import { computeDokuoyaParams } from "@/lib/dokuoya-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#0D9488";

export default function DokuoyaQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/dokuoya"
      computeResultParams={computeDokuoyaParams}
    />
  );
}
