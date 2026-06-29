"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/dopa-gaki-questions";
import { computeDopaParams } from "@/lib/dopa-gaki-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#84CC16";

export default function DopaGakiQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/dopa-gaki"
      computeResultParams={computeDopaParams}
    />
  );
}
