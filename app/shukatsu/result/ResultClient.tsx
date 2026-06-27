"use client";

import SharedResultClient from "@/components/SharedResultClient";
import { crossLinksExcluding } from "@/lib/all-tests";
import { SHUKATSU_KEYS, SHUKATSU_LABELS } from "@/lib/shukatsu-scoring";

const STRENGTH_TEXTS: Record<string, string> = {
  selfAnalysis: "自分の強み・弱み・価値観を言語化する力が高く、面接で「なぜあなたか」を説明できる",
  industryResearch: "業界・企業を深く調べる力があり、OBからの生情報と競合比較で差別化できる",
  interview: "想定外の質問にも落ち着いて対応できる度胸と準備があり、面接本番に強い",
  essay: "読み手が評価するポイントを意識した、数字・エピソード入りのESを書ける",
  action: "行動量が多く振り返りも丁寧で、選考経験を積み重ねて着実に改善できる",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  selfAnalysis: "自己分析が浅いと「なぜあなたか」が曖昧になり、志望動機の軸がぶれやすい",
  industryResearch: "業界・企業研究が薄いと「なぜこの会社か」が答えられず、他社でも良い人と思われやすい",
  interview: "面接での発言が硬かったり、想定外の質問で詰まりやすい傾向がある",
  essay: "エピソードが抽象的で数字がなく、多くのESに埋もれてしまう可能性がある",
  action: "行動量・振り返りが少ないと改善サイクルが遅く、同じ失敗を繰り返しやすい",
};

interface Props {
  params: Record<string, string>;
}

export default function ShukatsuResultClient({ params }: Props) {
  return (
    <SharedResultClient
      params={params}
      themeColor="#3B82F6"
      bgGradient="linear-gradient(160deg, #0a0e1a 0%, #060810 60%, #0c1020 100%)"
      testName="就活偏差値テスト（文系）"
      testEmoji="💼"
      categoryKeys={[...SHUKATSU_KEYS]}
      categoryLabels={SHUKATSU_LABELS}
      strengthTexts={STRENGTH_TEXTS}
      weaknessTexts={WEAKNESS_TEXTS}
      quizPath="/shukatsu/quiz"
      crossLinks={crossLinksExcluding("/shukatsu/quiz")}
    />
  );
}
