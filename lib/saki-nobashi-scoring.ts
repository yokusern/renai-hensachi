import { questions } from "@/data/saki-nobashi-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericResult, GenericQuestion, RankDef } from "@/lib/generic-types";

export const SAKI_KEYS = ["avoidance", "decisiveness", "optimism", "selfControl", "perfectionism"] as const;
export type SakiKey = typeof SAKI_KEYS[number];

export const SAKI_LABELS: Record<SakiKey, string> = {
  avoidance: "回避力",
  decisiveness: "決断先延ばし",
  optimism: "時間的楽観",
  selfControl: "誘惑への弱さ",
  perfectionism: "完璧主義",
};

// 高偏差値 = 先延ばし傾向が強い
const RANKS: RankDef[] = [
  { min: 68, label: "先延ばし職人", emoji: "🛋️" },
  { min: 58, label: "追い込みの達人", emoji: "⏰" },
  { min: 45, label: "ギリギリ常習犯", emoji: "😅" },
  { min: 35, label: "ちょい先延ばし", emoji: "🤔" },
  { min: 0,  label: "即断即決型",     emoji: "⚡" },
];

// strength = 最も先延ばし傾向が強い軸（高スコア軸）
const STRENGTH_TEXTS: Record<SakiKey, string> = {
  avoidance:     "タスクを目の前にしても「あとで」と思うクセが強めで、着手までに時間がかかる",
  decisiveness:  "決断を先延ばしにする傾向があり、選択肢が多いほど動けなくなりやすい",
  optimism:      "「まだ時間がある」と思いがちで、締切を楽観的に見積もる癖がある",
  selfControl:   "スマホや動画など誘惑に引っ張られやすく、集中を維持するのが苦手なタイプ",
  perfectionism: "完璧でないと動けない傾向が強く、準備に時間をかけすぎて始まらないことがある",
};

// weakness = 最も先延ばし傾向が弱い軸（低スコア軸）= 意外と得意なこと
const WEAKNESS_TEXTS: Record<SakiKey, string> = {
  avoidance:     "タスクへの着手そのものは意外と早い。後回しグセより別の要因が先延ばしを招いている",
  decisiveness:  "決断自体は意外とできる。先延ばしの原因は決断力でなく別の軸にある",
  optimism:      "時間の見積もりは比較的正確。「余裕でしょ」という楽観バイアスは低め",
  selfControl:   "誘惑への耐性は意外と高い。スマホや娯楽よりも別の軸が先延ばしを引き起こしている",
  perfectionism: "完璧主義は弱め。60%の完成度でも動ける柔軟性がある",
};

export function computeSakiNobashiResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    questions as unknown as GenericQuestion[],
    [...SAKI_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeSakiNobashiParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeSakiNobashiResult(answers), [...SAKI_KEYS]);
}
