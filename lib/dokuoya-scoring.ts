import { questions } from "@/data/dokuoya-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericQuestion, RankDef } from "@/lib/generic-types";

export const DO_KEYS = ["control", "conditionalLove", "guiltTrip", "selfEsteem", "codependency"] as const;
export type DoKey = typeof DO_KEYS[number];

export const DO_LABELS: Record<DoKey, string> = {
  control:         "過干渉度",
  conditionalLove: "条件付き愛",
  guiltTrip:       "罪悪感の植え付け",
  selfEsteem:      "自己肯定感の低下",
  codependency:    "共依存パターン",
};

export const DO_AXIS_DESCS: Record<DoKey, { s: string; w: string }> = {
  control:         { s: "過干渉の影響が強く残っている",     w: "自律性は比較的保たれている" },
  conditionalLove: { s: "条件付き愛の影響を受けた",         w: "愛情は安定していた" },
  guiltTrip:       { s: "罪悪感による行動制限が強い",       w: "罪悪感のコントロールは少なかった" },
  selfEsteem:      { s: "自己肯定感への影響が大きい",       w: "自己肯定感は比較的保たれている" },
  codependency:    { s: "共依存パターンが残っている",       w: "関係の境界線を保てている" },
};

const RANKS: RankDef[] = [
  { min: 68, label: "影響が深く残っている",     emoji: "🩹" },
  { min: 56, label: "かなりの痕跡がある",       emoji: "💔" },
  { min: 44, label: "影響が続いている",         emoji: "😔" },
  { min: 32, label: "軽度の影響が残っている",   emoji: "🌱" },
  { min: 0,  label: "比較的健全な環境だった",   emoji: "✨" },
];

const STRENGTH_TEXTS: Record<DoKey, string> = {
  control:         "自分や大切な人を守るための警戒心と慎重さ",
  conditionalLove: "他者の期待に応え続けてきた責任感と忍耐力",
  guiltTrip:       "他者の気持ちに気づける繊細さと場の空気を読む力",
  selfEsteem:      "自分に厳しく、常に成長しようとする向上心",
  codependency:    "他者の気持ちに敏感で、支えになれる共感力",
};

const WEAKNESS_TEXTS: Record<DoKey, string> = {
  control:         "他者との距離感の調整が難しいと感じることがある",
  conditionalLove: "「ありのままの自分」でいることへの難しさがある",
  guiltTrip:       "自分を後回しにしがちで、消耗しやすい",
  selfEsteem:      "自分を責めすぎて、立ち止まってしまうことがある",
  codependency:    "自分のニーズより他者のニーズを優先しすぎることがある",
};

export function computeDokuoyaParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(
    computeGenericResult(
      answers,
      questions as unknown as GenericQuestion[],
      [...DO_KEYS],
      RANKS,
      STRENGTH_TEXTS,
      WEAKNESS_TEXTS,
    ),
    [...DO_KEYS],
  );
}
