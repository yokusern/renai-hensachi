import { shukatsuQuestions } from "@/data/shukatsu-questions";
import { computeGenericResult, buildResultParams, type GenericResult } from "@/lib/generic-types";

export const SHUKATSU_KEYS = ["selfAnalysis", "industryResearch", "interview", "essay", "action"] as const;

export const SHUKATSU_LABELS: Record<string, string> = {
  selfAnalysis: "自己分析力",
  industryResearch: "業界・企業研究",
  interview: "面接力",
  essay: "ES作成力",
  action: "行動量・継続力",
};

const RANKS = [
  { min: 70, label: "内定マシン", emoji: "🏆" },
  { min: 60, label: "就活強者", emoji: "💼" },
  { min: 50, label: "標準的就活生", emoji: "📝" },
  { min: 40, label: "まだ間に合う", emoji: "🌱" },
  { min: 0,  label: "今すぐ動け", emoji: "🚨" },
];

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

export function computeShukatsuResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    shukatsuQuestions,
    [...SHUKATSU_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeShukatsuParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeShukatsuResult(answers), [...SHUKATSU_KEYS]);
}
