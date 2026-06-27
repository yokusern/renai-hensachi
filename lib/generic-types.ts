export interface GenericOption {
  label: string;
  scores: Record<string, number>;
}

export interface GenericQuestion {
  id: string;
  text: string;
  options: GenericOption[];
}

export interface GenericResult {
  totalScore: number;
  deviation: number;
  rank: string;
  rankEmoji: string;
  normalizedScores: Record<string, number>;
  strength: string;
  weakness: string;
  strengthLabel: string;
  weaknessLabel: string;
  percentile: number;
}

export interface RankDef {
  min: number;
  label: string;
  emoji: string;
}

function normalCDF(z: number): number {
  return 1 / (1 + Math.exp(-1.702 * z));
}

export function computeGenericResult(
  answers: Record<string, number>,
  questions: GenericQuestion[],
  categoryKeys: string[],
  ranks: RankDef[],
  strengthTexts: Record<string, string>,
  weaknessTexts: Record<string, string>,
): GenericResult {
  const raw: Record<string, number> = {};
  for (const key of categoryKeys) raw[key] = 0;

  for (const q of questions) {
    const chosen = answers[q.id];
    if (chosen === undefined) continue;
    const option = q.options[chosen];
    if (!option) continue;
    for (const key of categoryKeys) {
      raw[key] = (raw[key] ?? 0) + (option.scores[key] ?? 0);
    }
  }

  const maxes: Record<string, number> = {};
  for (const key of categoryKeys) maxes[key] = 0;
  for (const q of questions) {
    for (const key of categoryKeys) {
      const maxForQ = Math.max(...q.options.map((o) => o.scores[key] ?? 0));
      maxes[key] += maxForQ;
    }
  }

  const normalized: Record<string, number> = {};
  for (const key of categoryKeys) {
    normalized[key] = maxes[key] > 0 ? Math.round((raw[key] / maxes[key]) * 100) : 0;
  }

  const totalNorm = categoryKeys.reduce((s, k) => s + normalized[k], 0) / categoryKeys.length;
  const deviation = Math.max(25, Math.min(78, Math.round(totalNorm * 0.56 + 22)));

  const rankDef = ranks.find((r) => deviation >= r.min) ?? ranks[ranks.length - 1];

  const sorted = categoryKeys.slice().sort((a, b) => normalized[b] - normalized[a]);
  const strengthKey = sorted[0];
  const weaknessKey = sorted[sorted.length - 1];

  const z = (deviation - 50) / 10;
  const percentile = Math.round((1 - normalCDF(z)) * 100);

  return {
    totalScore: Math.round(totalNorm),
    deviation,
    rank: rankDef.label,
    rankEmoji: rankDef.emoji,
    normalizedScores: normalized,
    strength: strengthKey,
    weakness: weaknessKey,
    strengthLabel: strengthTexts[strengthKey] ?? "",
    weaknessLabel: weaknessTexts[weaknessKey] ?? "",
    percentile,
  };
}

export function buildResultParams(
  result: GenericResult,
  categoryKeys: string[],
): Record<string, string> {
  const p: Record<string, string> = {
    d: String(result.deviation),
    r: result.rank,
    re: result.rankEmoji,
    str: result.strength,
    wk: result.weakness,
    p: String(result.percentile),
  };
  for (const key of categoryKeys) {
    p[key] = String(result.normalizedScores[key] ?? 0);
  }
  return p;
}
