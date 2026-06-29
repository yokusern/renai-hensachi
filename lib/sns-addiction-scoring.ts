import { questions } from "@/data/sns-addiction-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericResult, GenericQuestion, RankDef } from "@/lib/generic-types";

export const SNS_KEYS = ["notification", "validation", "fomo", "timeDissolve", "withdrawalAnxiety"] as const;
export type SnsKey = typeof SNS_KEYS[number];

export const SNS_LABELS: Record<SnsKey, string> = {
  notification: "通知依存",
  validation: "承認欲求",
  fomo: "FOMO",
  timeDissolve: "時間溶解",
  withdrawalAnxiety: "離脱不安",
};

// 高偏差値 = SNS中毒傾向が強い
const RANKS: RankDef[] = [
  { min: 70, label: "デジタル脳完全体", emoji: "🤖" },
  { min: 60, label: "通知ゾンビ",       emoji: "🧟" },
  { min: 50, label: "ギリギリ人間",     emoji: "😵" },
  { min: 40, label: "デジタルダイエット成功者", emoji: "💪" },
  { min: 0,  label: "インターネット卒業生",     emoji: "🌿" },
];

const STRENGTH_TEXTS: Record<SnsKey, string> = {
  notification:     "通知が来るたびに即確認しないと落ち着かない。スマホが「鳴らないか」を無意識に監視している",
  validation:       "いいね数・フォロワー数が気分に直結している。数字が思ったより少ないとその日のテンションが下がる",
  fomo:             "TLを追っていないと「話題に乗り遅れた」という恐怖が出てくる。見逃しが怖くて開いてしまう",
  timeDissolve:     "「5分だけ」が1時間になるパターンが頻発している。時間感覚がSNS中に機能しなくなっている",
  withdrawalAnxiety:"スマホがない状況が強いストレスになる。圏外・充電切れに不釣り合いな不安を感じる",
};

const WEAKNESS_TEXTS: Record<SnsKey, string> = {
  notification:     "通知への即反応は意外と弱い。通知をすぐ見なくても不安にならない余裕がある",
  validation:       "いいね・フォロワー数への依存は低め。数字よりも自分の投稿内容を重視できている",
  fomo:             "見逃し恐怖は弱い。TLを追えなくても「後でまとめて見れば良い」と切り替えられる",
  timeDissolve:     "時間管理は意外としっかりしている。SNSに時間が溶けることは少ない",
  withdrawalAnxiety:"スマホがない状況への耐性は高い。一定時間スマホなしで過ごすことに抵抗感が少ない",
};

export function computeSnsResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    questions as unknown as GenericQuestion[],
    [...SNS_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeSnsParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeSnsResult(answers), [...SNS_KEYS]);
}

export function getBrainPercent(deviation: number): number {
  if (deviation >= 70) return 92;
  if (deviation >= 60) return 74;
  if (deviation >= 50) return 51;
  if (deviation >= 40) return 33;
  return 12;
}

export function getSnsTypeName(deviation: number): string {
  if (deviation >= 70) return "デジタル脳完全体";
  if (deviation >= 60) return "通知ゾンビ";
  if (deviation >= 50) return "ギリギリ人間";
  if (deviation >= 40) return "デジタルダイエット成功者";
  return "インターネット卒業生";
}
