import { questions } from "@/data/dopa-gaki-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericQuestion, RankDef } from "@/lib/generic-types";

export const DOPA_KEYS = ["immediate", "shortVideo", "multitask", "boredom", "rewardReset"] as const;
export type DopaKey = typeof DOPA_KEYS[number];

export const DOPA_LABELS: Record<DopaKey, string> = {
  immediate:   "即時報酬依存",
  shortVideo:  "短尺中毒",
  multitask:   "マルチタスク脳",
  boredom:     "退屈耐性のなさ",
  rewardReset: "報酬リセット力不足",
};

export const DOPA_AXIS_DESCS: Record<DopaKey, { s: string; w: string }> = {
  immediate:   { s: "0.1秒でも待つとイライラする",     w: "待つことへのストレスは少ない" },
  shortVideo:  { s: "ショート動画を無限にスクロールする", w: "短尺動画に飲み込まれない" },
  multitask:   { s: "一つのことに5分も集中できない",    w: "意外と一点集中できる" },
  boredom:     { s: "無刺激が1分も耐えられない",       w: "ぼーっとできる余裕がある" },
  rewardReset: { s: "スマホなしでは不安でしょうがない",  w: "刺激なしでも平然としている" },
};

const RANKS: RankDef[] = [
  { min: 70, label: "末期のドパガキ",   emoji: "⚡" },
  { min: 60, label: "ドパ活中毒",      emoji: "😵‍💫" },
  { min: 50, label: "ギリ人間",        emoji: "😐" },
  { min: 40, label: "修行僧予備軍",    emoji: "🌿" },
  { min: 0,  label: "悟りの境地",      emoji: "✨" },
];

const STRENGTH_TEXTS: Record<DopaKey, string> = {
  immediate:   "待てない・今すぐ欲しい衝動が強い。0.1秒のラグにも本能的にストレスを感じる",
  shortVideo:  "ショート動画に吸い込まれる。スクロールを止める意思決定が非常に困難になっている",
  multitask:   "複数のことを同時進行しないと落ち着かない。一点集中の耐性がほぼゼロに近い",
  boredom:     "無刺激な状態への耐性が極端に低い。常に何かしらの刺激を必要としている",
  rewardReset: "スマホや即時報酬なしの状態が強い不安を引き起こす。リセット機能が著しく低下している",
};

const WEAKNESS_TEXTS: Record<DopaKey, string> = {
  immediate:   "即時報酬への衝動は比較的コントロールできている。少し待てる余裕がある",
  shortVideo:  "短尺動画への依存は低め。一定の時間制御ができている",
  multitask:   "マルチタスク衝動は弱め。一つのことに集中できる場面がある",
  boredom:     "退屈への耐性は意外とある。刺激なしでも一定時間は平静を保てる",
  rewardReset: "報酬リセット力は比較的保たれている。スマホなしでも案外過ごせる",
};

export function getDopaTypeName(deviation: number): string {
  if (deviation >= 70) return "末期のドパガキ";
  if (deviation >= 60) return "ドパ活中毒";
  if (deviation >= 50) return "ギリ人間";
  if (deviation >= 40) return "修行僧予備軍";
  return "悟りの境地";
}

export function getDopaBrainPercent(deviation: number): number {
  if (deviation >= 70) return 95;
  if (deviation >= 60) return 78;
  if (deviation >= 50) return 56;
  if (deviation >= 40) return 32;
  return 8;
}

export function computeDopaParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(
    computeGenericResult(
      answers,
      questions as unknown as GenericQuestion[],
      [...DOPA_KEYS],
      RANKS,
      STRENGTH_TEXTS,
      WEAKNESS_TEXTS,
    ),
    [...DOPA_KEYS],
  );
}
