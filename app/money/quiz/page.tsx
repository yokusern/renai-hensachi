"use client";

import SharedQuizPage from "@/components/SharedQuizPage";
import { moneyQuestions } from "@/data/money-questions";
import { computeMoneyParams } from "@/lib/money-scoring";
import type { GenericQuestion } from "@/lib/generic-types";

const BG = "linear-gradient(160deg, #1a0f00 0%, #110900 60%, #1c1000 100%)";
const THEME = "#D97706";

export default function MoneyQuizPage() {
  return (
    <SharedQuizPage
      questions={moneyQuestions as unknown as GenericQuestion[]}
      themeColor={THEME}
      bgGradient={BG}
      resultBasePath="/money"
      computeResultParams={computeMoneyParams}
    />
  );
}
