import { questions } from "@/data/oshi-kakin-questions";
import { computeGenericResult, buildResultParams } from "@/lib/generic-types";
import type { GenericQuestion, RankDef } from "@/lib/generic-types";

export const OK_KEYS = ["spending", "expedition", "collection", "evangelism", "depth"] as const;
export type OkKey = typeof OK_KEYS[number];

export const OK_LABELS: Record<OkKey, string> = {
  spending:   "課金額",
  expedition: "遠征力",
  collection: "グッズ収集度",
  evangelism: "布教力",
  depth:      "沼の深さ",
};

export const OK_AXIS_DESCS: Record<OkKey, { s: string; w: string }> = {
  spending:   { s: "財布の紐が推し仕様になっている", w: "課金はほどほど" },
  expedition: { s: "どこへでも遠征する",             w: "遠征欲はない" },
  collection: { s: "コレクション欲が止まらない",     w: "グッズへの執着は少ない" },
  evangelism: { s: "推しを布教せずにいられない",     w: "推しは自分だけで楽しむ" },
  depth:      { s: "推しが人生の軸になっている",     w: "推し活はほどよい趣味" },
};

const RANKS: RankDef[] = [
  { min: 70, label: "廃課金ガチ勢",     emoji: "💸" },
  { min: 55, label: "沼の住人",         emoji: "🌊" },
  { min: 40, label: "中堅オタク",       emoji: "⭐" },
  { min: 0,  label: "healthy推し活民", emoji: "💝" },
];

const STRENGTH_TEXTS: Record<OkKey, string> = {
  spending:   "好きなものへの投資を躊躇しない決断力",
  expedition: "会いに行くための行動力と計画力",
  collection: "推しの軌跡を形として残す情熱",
  evangelism: "好きな気持ちを人に伝える表現力",
  depth:      "ひとつのものを深く愛する集中力",
};

const WEAKNESS_TEXTS: Record<OkKey, string> = {
  spending:   "気づいたら想定外の金額になっていることがある",
  expedition: "体力・スケジュール管理が大変になることがある",
  collection: "物理的な収納と管理に追われることがある",
  evangelism: "温度差があると空回りすることがある",
  depth:      "推しの動向に生活が左右されやすい",
};

export function computeOshiParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(
    computeGenericResult(
      answers,
      questions as unknown as GenericQuestion[],
      [...OK_KEYS],
      RANKS,
      STRENGTH_TEXTS,
      WEAKNESS_TEXTS,
    ),
    [...OK_KEYS],
  );
}
