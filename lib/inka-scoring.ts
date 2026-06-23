import { questions } from "@/data/inka-questions";
import type { Scores, CategoryKey } from "@/data/inka-questions";

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
  hitomishiri: "人見知り度",
  bocchi: "ぼっち耐性",
  hobbies: "陰の趣味力",
  groupAversion: "群れ苦手度",
  invisible: "目立ちたくなさ",
};

function computeMaxScores(): CategoryScores {
  const maxes: CategoryScores = {
    hitomishiri: 0,
    bocchi: 0,
    hobbies: 0,
    groupAversion: 0,
    invisible: 0,
  };
  const keys: CategoryKey[] = ["hitomishiri", "bocchi", "hobbies", "groupAversion", "invisible"];
  for (const q of questions) {
    for (const key of keys) {
      const maxForQ = Math.max(...q.options.map((o) => o.scores[key]));
      maxes[key] += maxForQ;
    }
  }
  return maxes;
}

const MAX_SCORES = computeMaxScores();

// 陰キャ偏差値: 高い = より陰キャ
// 調査根拠: 約60%が陰キャ傾向（20%「陰キャ」+ 39%「どちらかといえば陰キャ」）
const RANKS = [
  { min: 70, label: "純粋培養陰キャ",       emoji: "🌙" },
  { min: 60, label: "根っから陰キャ",       emoji: "🌒" },
  { min: 50, label: "標準的な陰キャ",       emoji: "🎮" },
  { min: 40, label: "陰キャ寄り",           emoji: "📚" },
  { min: 30, label: "どっちでもない",       emoji: "🌗" },
  { min: 0,  label: "実は陽キャ",           emoji: "☀️" },
];

// 強み（高スコア軸の解説 = その軸の陰キャ度が高い）
const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  hitomishiri: "人見知りレベルが高く、初対面・電話などが苦手な純正タイプ",
  bocchi: "一人の時間が本当に快適で、ぼっちをネガティブに感じないメンタルの持ち主",
  hobbies: "インドア趣味への没頭力が高く、コンテンツへの愛が深い",
  groupAversion: "群れない美学がある。スクールカーストとは無縁の独立志向",
  invisible: "空気のように存在できる特技がある。目立たないことへの抵抗が少ない",
};

// 弱み（低スコア軸 = その軸では陽キャ寄り）
const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  hitomishiri: "初対面や電話への苦手意識は薄め。陰キャの中では人見知り度が低い",
  bocchi: "一人時間よりも誰かといる時間を好む傾向がある。ぼっち耐性は陰キャの中では低め",
  hobbies: "趣味がインドア方向に振り切っているわけではない。意外と外向きな一面もある",
  groupAversion: "群れること自体への苦手意識はそこまで強くない",
  invisible: "存在感を消したいという気持ちは他の陰キャより少ない。発言力があるタイプ",
};

function normalCDF(z: number): number {
  return 1 / (1 + Math.exp(-1.702 * z));
}

export function computeResult(answers: Record<string, number>): Result {
  const raw: CategoryScores = {
    hitomishiri: 0,
    bocchi: 0,
    hobbies: 0,
    groupAversion: 0,
    invisible: 0,
  };
  const keys: CategoryKey[] = ["hitomishiri", "bocchi", "hobbies", "groupAversion", "invisible"];

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
