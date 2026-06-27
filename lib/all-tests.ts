import type { CrossLink } from "@/components/SharedResultClient";

export const ALL_TESTS: CrossLink[] = [
  { href: "/love/quiz", emoji: "💘", name: "恋愛偏差値テスト", desc: "恋愛力を5軸で偏差値化", color: "#EC4899" },
  { href: "/commu/quiz", emoji: "💬", name: "コミュ力偏差値テスト", desc: "コミュ力を5軸で偏差値化", color: "#0EA5E9" },
  { href: "/inka/quiz", emoji: "🌙", name: "陰キャ偏差値テスト", desc: "陰キャ度を5軸で偏差値化", color: "#8B5CF6" },
  { href: "/jiatama/quiz", emoji: "🧠", name: "地頭偏差値テスト", desc: "思考力・認知力を偏差値化", color: "#10B981" },
  { href: "/shukatsu/quiz", emoji: "💼", name: "就活偏差値（文系）", desc: "就活準備度を偏差値化", color: "#3B82F6" },
  { href: "/shukatsu-it/quiz", emoji: "💻", name: "就活偏差値（IT系）", desc: "エンジニア就活力を偏差値化", color: "#059669" },
  { href: "/money/quiz", emoji: "💰", name: "お金リテラシー偏差値テスト", desc: "金融知識・行動を偏差値化", color: "#D97706" },
];

export function crossLinksExcluding(currentHref: string): CrossLink[] {
  return ALL_TESTS.filter((t) => t.href !== currentHref);
}
