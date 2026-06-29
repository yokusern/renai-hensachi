import { questions } from "@/data/seikaku-warusa-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericQuestion, RankDef } from "@/lib/generic-types";

export const SW_KEYS = ["mount", "calculation", "empathy", "jealousy", "manipulation"] as const;
export type SwKey = typeof SW_KEYS[number];

export const SW_LABELS: Record<SwKey, string> = {
  mount:        "マウント癖",
  calculation:  "計算高さ",
  empathy:      "共感の薄さ",
  jealousy:     "嫉妬深さ",
  manipulation: "利用上手度",
};

export const SW_AXIS_DESCS: Record<SwKey, { s: string; w: string }> = {
  mount:        { s: "マウントを取りたくなる",     w: "マウントとは無縁" },
  calculation:  { s: "損得計算が先に働く",         w: "損得を考えない純粋さがある" },
  empathy:      { s: "共感より論理を優先する",     w: "共感力が意外と豊か" },
  jealousy:     { s: "嫉妬心が強い",              w: "人の成功を素直に喜べる" },
  manipulation: { s: "人を動かすのがうまい",       w: "人を操作しようという気がない" },
};

const RANKS: RankDef[] = [
  { min: 70, label: "無自覚サイコパス",   emoji: "😈" },
  { min: 55, label: "計算高い策士",       emoji: "🎭" },
  { min: 40, label: "ちょい毒舌キャラ",  emoji: "😏" },
  { min: 0,  label: "実は優しいツンデレ", emoji: "🤔" },
];

const STRENGTH_TEXTS: Record<SwKey, string> = {
  mount:        "人よりも高い視点で物事を見る視野の広さ",
  calculation:  "損得を見極める冷静な判断力",
  empathy:      "感情に流されない論理的な思考力",
  jealousy:     "向上心と負けたくない強い競争心",
  manipulation: "場の流れを読んで動かす交渉力",
};

const WEAKNESS_TEXTS: Record<SwKey, string> = {
  mount:        "相手の話を全力で聞く姿勢が弱めかも",
  calculation:  "損得を抜きにした感情的なつながりが少なくなりがち",
  empathy:      "感情的に落ち込んでいる人への寄り添いが苦手な場面がある",
  jealousy:     "比較から生まれるストレスが多く、消耗しやすい",
  manipulation: "「裏がある」と思われて信頼を失うことがある",
};

export function computeSeikakuParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(
    computeGenericResult(
      answers,
      questions as unknown as GenericQuestion[],
      [...SW_KEYS],
      RANKS,
      STRENGTH_TEXTS,
      WEAKNESS_TEXTS,
    ),
    [...SW_KEYS],
  );
}
