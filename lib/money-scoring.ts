import { moneyQuestions } from "@/data/money-questions";
import { computeGenericResult, buildResultParams, type GenericResult } from "@/lib/generic-types";

export const MONEY_KEYS = ["savings", "investment", "debt", "system", "risk"] as const;

export const MONEY_LABELS: Record<string, string> = {
  savings: "貯蓄・支出管理",
  investment: "投資知識",
  debt: "借入・信用理解",
  system: "制度活用力",
  risk: "リスク認識",
};

const RANKS = [
  { min: 70, label: "マネーマスター", emoji: "💰" },
  { min: 60, label: "堅実運用家", emoji: "📈" },
  { min: 50, label: "普通の金銭感覚", emoji: "💴" },
  { min: 40, label: "お金に無頓着", emoji: "💸" },
  { min: 0,  label: "全財産パチンコ型", emoji: "🎰" },
];

const STRENGTH_TEXTS: Record<string, string> = {
  savings: "収支を把握し、先取り貯蓄と固定費見直しで着実に資産を積み上げられる",
  investment: "複利・分散・インデックス投資の理論を理解し、長期で有利な行動を取れる",
  debt: "クレカ・ローン・奨学金の仕組みを理解し、利息を余計に払わない判断ができる",
  system: "NISA・ふるさと納税・税控除など、使える制度を積極的に活用して資産を最大化できる",
  risk: "詐欺・FOMO・暗号資産リスクへの免疫があり、感情でお金を動かさない判断力がある",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  savings: "収支管理や貯蓄習慣が不安定で、月末になると「なぜかお金がない」状態に陥りやすい",
  investment: "投資の知識が不足しており、長期的な資産形成の機会を逃している可能性がある",
  debt: "借入・クレカ・奨学金の仕組みへの理解が薄く、気づかないうちに利息を多く払っている可能性がある",
  system: "使える制度を知らないまま申請せず、毎年数万〜十数万円の節税機会を逃している可能性がある",
  risk: "詐欺や衝動的な投資判断に弱く、一度の失敗で大きな損失を被るリスクがある",
};

export function computeMoneyResult(answers: Record<string, number>): GenericResult {
  return computeGenericResult(
    answers,
    moneyQuestions,
    [...MONEY_KEYS],
    RANKS,
    STRENGTH_TEXTS,
    WEAKNESS_TEXTS,
  );
}

export function computeMoneyParams(answers: Record<string, number>): Record<string, string> {
  return buildResultParams(computeMoneyResult(answers), [...MONEY_KEYS]);
}
