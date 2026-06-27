import { shukatsuItQuestions } from "@/data/shukatsu-it-questions";
import { computeGenericResult, buildResultParams, type GenericResult } from "@/lib/generic-types";

export const SHUKATSU_IT_KEYS = ["techSkill", "portfolio", "commu", "industryUnderstanding", "autonomy"] as const;

export const SHUKATSU_IT_LABELS: Record<string, string> = {
  techSkill: "技術力",
  portfolio: "ポートフォリオ",
  commu: "コミュ力",
  industryUnderstanding: "業界理解",
  autonomy: "自走力",
};

const RANKS = [
  { min: 70, label: "即戦力エンジニア", emoji: "🚀" },
  { min: 60, label: "期待の新人", emoji: "⚡" },
  { min: 50, label: "普通のCS学生", emoji: "💻" },
  { min: 40, label: "まだ伸びしろ", emoji: "🌱" },
  { min: 0,  label: "今日からGitHub作ろう", emoji: "🔰" },
];

const STRENGTH_TEXTS: Record<string, string> = {
  techSkill: "言語・フレームワーク・デプロイまで幅広く対応でき、実務レベルの技術力がある",
  portfolio: "実際に動くサービスを複数公開しており、「作れる人」として第一印象から差別化できる",
  commu: "技術的な内容を非エンジニアにも伝えられ、チームの中で橋渡し役として機能できる",
  industryUnderstanding: "業界トレンドと志望企業の技術スタックを深く理解しており、入社後のビジョンが明確",
  autonomy: "自分で課題を見つけ、調べ、試して解決する力があり、指示がなくても動ける人として信頼される",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  techSkill: "技術的な基礎や実装経験が薄く、面接での技術的な深掘りに苦戦する可能性がある",
  portfolio: "公開できる成果物が少なく、面接前の段階で「作れる人」の証明が弱い",
  commu: "技術的な内容を分かりやすく伝えることが苦手で、チームでの協働に課題が生まれやすい",
  industryUnderstanding: "業界トレンドや志望企業の技術環境への理解が薄く、入社後のギャップが生まれやすい",
  autonomy: "与えられた課題に取り組む力はあるが、自発的な学習・探求が少なく、成長速度が遅くなりやすい",
};

export function computeShukatsuItResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    shukatsuItQuestions,
    [...SHUKATSU_IT_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeShukatsuItParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeShukatsuItResult(answers), [...SHUKATSU_IT_KEYS]);
}
