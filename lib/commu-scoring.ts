import { questions } from "@/data/commu-questions";
import type { Scores, CategoryKey } from "@/data/commu-questions";

export interface CategoryScores extends Scores {}

export interface Result {
  totalScore: number;
  deviation: number;
  rank: string;
  rankEmoji: string;
  categoryScores: CategoryScores;
  normalizedScores: CategoryScores;
  strength: CategoryKey;
  weakness: CategoryKey;
  strengthLabel: string;
  weaknessLabel: string;
  percentile: number;
}

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  expression: "表現力",
  listening: "傾聴力",
  awareness: "場の読み",
  disclosure: "自己開示力",
  building: "関係維持力",
};

function computeMaxScores(): CategoryScores {
  const maxes: CategoryScores = {
    expression: 0,
    listening: 0,
    awareness: 0,
    disclosure: 0,
    building: 0,
  };
  const keys: CategoryKey[] = ["expression", "listening", "awareness", "disclosure", "building"];
  for (const q of questions) {
    for (const key of keys) {
      const maxForQ = Math.max(...q.options.map((o) => o.scores[key]));
      maxes[key] += maxForQ;
    }
  }
  return maxes;
}

const MAX_SCORES = computeMaxScores();

// 業界別コミュ力偏差値（リサーチ根拠）:
// マスコミ: 75 / 商社・外コン: 70 / コンサル: 65 / 営業・メガバンク: 60 / 一般: 50
const RANKS = [
  { min: 70, label: "コミュ力エリート",   emoji: "💎" },
  { min: 60, label: "コミュ上手",         emoji: "✨" },
  { min: 50, label: "標準的なコミュ力",   emoji: "💬" },
  { min: 40, label: "成長中",             emoji: "🌱" },
  { min: 30, label: "苦手意識あり",       emoji: "🔥" },
  { min: 0,  label: "まだまだこれから",   emoji: "🌸" },
];

const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  expression: "考えや気持ちを言葉にする力が高く、相手に自分の意図が届きやすい",
  listening: "相手の話に真剣に向き合える力があり、「この人に話したい」と思われやすい",
  awareness: "場の空気・タイミング・非言語情報の読み取りが得意で、摩擦を起こしにくい",
  disclosure: "自分をオープンに見せられるため、相手も話しやすい雰囲気を作れる",
  building: "一度できた関係を大切にし続ける力があり、信頼される人間関係を築きやすい",
};

const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  expression: "思っていることをうまく言葉にできず、誤解や伝達ミスが起きやすい傾向がある",
  listening: "自分の話に意識が向きがちで、相手が「話を聞いてもらえていない」と感じることがある",
  awareness: "場の雰囲気やタイミングを読み取ることへの苦手意識が、摩擦の原因になることがある",
  disclosure: "自分のことを話すのが少ない分、相手との距離が縮まりにくい傾向がある",
  building: "関係を維持するための能動的なアクションが少なく、自然消滅しやすいことがある",
};

function normalCDF(z: number): number {
  return 1 / (1 + Math.exp(-1.702 * z));
}

export function computeResult(answers: Record<string, number>): Result {
  const raw: CategoryScores = {
    expression: 0,
    listening: 0,
    awareness: 0,
    disclosure: 0,
    building: 0,
  };
  const keys: CategoryKey[] = ["expression", "listening", "awareness", "disclosure", "building"];

  for (const q of questions) {
    const chosen = answers[q.id];
    if (chosen === undefined) continue;
    const option = q.options[chosen];
    if (!option) continue;
    for (const key of keys) {
      raw[key] += option.scores[key];
    }
  }

  const normalized: CategoryScores = {} as CategoryScores;
  for (const key of keys) {
    normalized[key] = MAX_SCORES[key] > 0
      ? Math.round((raw[key] / MAX_SCORES[key]) * 100)
      : 0;
  }

  const totalNorm = keys.reduce((s, k) => s + normalized[k], 0) / keys.length;
  const deviation = Math.max(25, Math.min(78, Math.round(totalNorm * 0.56 + 22)));

  const rankDef = RANKS.find((r) => deviation >= r.min) ?? RANKS[RANKS.length - 1];

  const sorted = keys.slice().sort((a, b) => normalized[b] - normalized[a]);
  const strengthKey = sorted[0];
  const weaknessKey = sorted[sorted.length - 1];

  const z = (deviation - 50) / 10;
  const percentile = Math.round((1 - normalCDF(z)) * 100);

  return {
    totalScore: Math.round(totalNorm),
    deviation,
    rank: rankDef.label,
    rankEmoji: rankDef.emoji,
    categoryScores: raw,
    normalizedScores: normalized,
    strength: strengthKey,
    weakness: weaknessKey,
    strengthLabel: STRENGTH_TEXTS[strengthKey],
    weaknessLabel: WEAKNESS_TEXTS[weaknessKey],
    percentile,
  };
}
