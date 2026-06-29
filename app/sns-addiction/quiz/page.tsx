"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { questions } from "@/data/sns-addiction-questions";
import { computeSnsParams } from "@/lib/sns-addiction-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const THEME = "#FF3B5C";

export default function SnsAddictionQuizPage() {
  return (
    <SharedQuizPage
      questions={questions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient=""
      resultBasePath="/sns-addiction"
      computeResultParams={computeSnsParams}
    />
  );
}
