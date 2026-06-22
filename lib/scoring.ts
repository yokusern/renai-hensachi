import { questions } from "@/data/questions";
import type { Scores, CategoryKey } from "@/data/questions";

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

// カテゴリ表示名
export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  communication: "コミュニケーション力",
  selfAwareness: "自己理解度",
  empathy: "相手への理解度",
  initiative: "行動力",
  mentalStability: "メンタル安定度",
};

// カテゴリ別 最大スコア（各カテゴリで全問の最高値を選んだ場合）
function computeMaxScores(): CategoryScores {
  const maxes: CategoryScores = {
    communication: 0,
    selfAwareness: 0,
    empathy: 0,
    initiative: 0,
    mentalStability: 0,
  };
  const keys: CategoryKey[] = [
    "communication",
    "selfAwareness",
    "empathy",
    "initiative",
    "mentalStability",
  ];
  for (const q of questions) {
    for (const key of keys) {
      const maxForQ = Math.max(...q.options.map((o) => o.scores[key]));
      maxes[key] += maxForQ;
    }
  }
  return maxes;
}

const MAX_SCORES = computeMaxScores();

// 強み・弱みテキスト
const STRENGTH_TEXTS: Record<CategoryKey, string> = {
  communication: "言葉で気持ちを伝える力が高く、相手との距離を自然に縮められる",
  selfAwareness: "自分の恋愛パターンを客観視できており、同じ失敗を繰り返しにくい",
  empathy: "相手の感情の変化に敏感で、言葉にならない本音を察することができる",
  initiative: "好きという気持ちを行動に変えられるので、チャンスを逃しにくい",
  mentalStability: "感情の波が少なく、恋愛でも自分軸を保ち続けられる",
};

const WEAKNESS_TEXTS: Record<CategoryKey, string> = {
  communication: "気持ちを言葉にすることへの苦手意識が、すれ違いを生みやすい",
  selfAwareness: "自分の恋愛パターンへの気づきが薄く、同じ壁にぶつかりやすい傾向がある",
  empathy: "相手の感情変化を見落としがちで、タイミングを逃すことがある",
  initiative: "行動を起こすまでに時間がかかり、機会を逃してしまうことがある",
  mentalStability: "小さな変化に影響されやすく、不安を感じやすい傾向がある",
};

// ランク定義
const RANKS = [
  { min: 70, label: "恋愛マスター", emoji: "💎" },
  { min: 60, label: "恋愛上手", emoji: "💘" },
  { min: 50, label: "標準的な恋愛力", emoji: "💙" },
  { min: 40, label: "成長中", emoji: "🌱" },
  { min: 30, label: "修行中", emoji: "🔥" },
  { min: 0,  label: "まだまだこれから", emoji: "🌸" },
];

// 正規分布 CDF の近似（Logistic approximation）
function normalCDF(z: number): number {
  return 1 / (1 + Math.exp(-1.702 * z));
}

export function computeResult(answers: Record<string, number>): Result {
  // カテゴリ別スコア集計
  const raw: CategoryScores = {
    communication: 0,
    selfAwareness: 0,
    empathy: 0,
    initiative: 0,
    mentalStability: 0,
  };
  const keys: CategoryKey[] = [
    "communication",
    "selfAwareness",
    "empathy",
    "initiative",
    "mentalStability",
  ];

  for (const q of questions) {
    const chosen = answers[q.id];
    if (chosen === undefined) continue;
    const option = q.options[chosen];
    if (!option) continue;
    for (const key of keys) {
      raw[key] += option.scores[key];
    }
  }

  // 正規化スコア（0〜100）
  const normalized: CategoryScores = {} as CategoryScores;
  for (const key of keys) {
    normalized[key] = MAX_SCORES[key] > 0
      ? Math.round((raw[key] / MAX_SCORES[key]) * 100)
      : 0;
  }

  // 偏差値計算
  // totalNorm = 5カテゴリの平均正規化スコア (0〜100)
  const totalNorm = keys.reduce((s, k) => s + normalized[k], 0) / keys.length;
  // マッピング: 0→22, 50→50, 100→78 (clamp 25〜78)
  const deviation = Math.max(25, Math.min(78, Math.round(totalNorm * 0.56 + 22)));

  // ランク
  const rankDef = RANKS.find((r) => deviation >= r.min) ?? RANKS[RANKS.length - 1];

  // 強み・弱み（最高・最低カテゴリ）
  const sorted = keys.slice().sort((a, b) => normalized[b] - normalized[a]);
  const strengthKey = sorted[0];
  const weaknessKey = sorted[sorted.length - 1];

  // 上位パーセンタイル
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
