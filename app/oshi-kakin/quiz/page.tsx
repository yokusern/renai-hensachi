"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/oshi-kakin-questions";
import { computeOshiParams } from "@/lib/oshi-kakin-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#F97316";

export default function OshiKakinQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/oshi-kakin"
      computeResultParams={computeOshiParams}
    />
  );
}
