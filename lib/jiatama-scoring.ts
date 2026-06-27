import { jiatamaQuestions } from "@/data/jiatama-questions";
import { computeGenericResult, buildResultParams, type GenericResult } from "@/lib/generic-types";

export const JIATAMA_KEYS = ["pattern", "abstract", "logic", "premise", "inhibit"] as const;

export const JIATAMA_LABELS: Record<string, string> = {
  pattern: "パターン認識",
  abstract: "抽象化",
  logic: "論理推論",
  premise: "前提検証",
  inhibit: "直感抑制",
};

const RANKS = [
  { min: 75, label: "天才的地頭", emoji: "🧠✨" },
  { min: 65, label: "論理の鬼", emoji: "🔥" },
  { min: 55, label: "地頭よし", emoji: "💡" },
  { min: 45, label: "平均的", emoji: "📊" },
  { min: 35, label: "感覚派", emoji: "🎨" },
  { min: 0,  label: "直感タイプ", emoji: "⚡" },
];

const STRENGTH_TEXTS: Record<string, string> = {
  pattern: "数列・規則・繰り返しを素早く見抜く力が高く、新しい情報の構造を直感的に把握できる",
  abstract: "複数の具体例から本質的な共通点を抜き出す力があり、カテゴリー思考が得意",
  logic: "前提から結論を正確に導く力が高く、議論の論理構造を冷静に評価できる",
  premise: "主張の弱点・隠れた前提・飛躍を見抜く批判的思考が鋭い",
  inhibit: "直感的な誤答に飛びつかず、立ち止まって再検討できる認知コントロール力がある",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  pattern: "規則性の発見に時間がかかりやすく、数値・図形の規則を見落とすことがある",
  abstract: "具体から抽象への変換が苦手で、共通点の言語化に詰まることがある",
  logic: "前提と結論の関係を厳密に評価するのが苦手で、感覚で判断しがちな傾向がある",
  premise: "主張をそのまま受け取りやすく、前提の穴や隠れた仮定を見逃すことがある",
  inhibit: "直感的に「正しそうな答え」に飛びつきやすく、再考する前に結論を出すことがある",
};

export function computeJiatamaResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    jiatamaQuestions,
    [...JIATAMA_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeJiatamaParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeJiatamaResult(answers), [...JIATAMA_KEYS]);
}
