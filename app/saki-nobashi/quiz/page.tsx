"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/saki-nobashi-questions";
import { computeSakiNobashiParams } from "@/lib/saki-nobashi-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#F59E0B";

export default function SakiNobashiQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/saki-nobashi"
      computeResultParams={computeSakiNobashiParams}
    />
  );
}
