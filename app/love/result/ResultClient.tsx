"use client";

import SharedResultClient from "@/components/SharedResultClient";
import type { TypeNames, AxisDesc } from "@/components/SharedResultClient";
import { crossLinksExcluding } from "@/lib/all-tests";

const LOVE_KEYS = ["communication", "selfAwareness", "empathy", "initiative", "mentalStability"];
const LOVE_LABELS: Record<string, string> = {
  communication: "表現力",
  selfAwareness: "傾聴力",
  empathy: "察し力",
  initiative: "告白力",
  mentalStability: "依存度",
};
const STRENGTH_TEXTS: Record<string, string> = {
  communication: "言葉で気持ちを伝える力が高く、相手との距離を自然に縮められる",
  selfAwareness: "相手の話をじっくり受け止める力があり、「この人に話したい」と思わせやすい",
  empathy: "相手の感情の変化に敏感で、言葉にならない本音を察することができる",
  initiative: "好きという気持ちを行動に変えられるので、チャンスを逃しにくい",
  mentalStability: "パートナーへの愛着が深く、関係を長続きさせようとする気持ちが強い",
};
const WEAKNESS_TEXTS: Record<string, string> = {
  communication: "気持ちを言葉にすることへの苦手意識が、すれ違いを生みやすい",
  selfAwareness: "相手の言葉を拾いきれないことがあり、「もっと話を聞いてほしい」と感じさせることがある",
  empathy: "相手の感情変化を見落としがちで、タイミングを逃すことがある",
  initiative: "行動を起こすまでに時間がかかり、機会を逃してしまうことがある",
  mentalStability: "感情的な自立度が高く、相手に「もっと甘えてほしい」と感じさせることがある",
};

const TYPE_NAMES: TypeNames = {
  veryHigh: "恋愛マスター",
  high: "安定パートナー型",
  mid: "片思い完走型",
  low: "恋愛未実装",
};

const AXIS_DESCS: Record<string, AxisDesc> = {
  communication: {
    s: "気持ちを言葉にできる",
    w: "想いを伝えられない",
  },
  selfAwareness: {
    s: "聞き上手で話しやすい相手とされる",
    w: "相手の話を受け止めきれていない",
  },
  empathy: {
    s: "空気を読んで相手の感情がわかる",
    w: "相手の本音が見えていない",
  },
  initiative: {
    s: "好きなら動ける行動派",
    w: "肝心な一言が出てこない",
  },
  mentalStability: {
    s: "程よい距離感を保てる",
    w: "心の距離を縮めるのが苦手",
  },
};

interface Props {
  params: Record<string, string>;
}

export default function LoveResultClient({ params }: Props) {
  return (
    <SharedResultClient
      params={params}
      themeColor="#EC4899"
      bgGradient="linear-gradient(160deg, #1a0a2e 0%, #0d0618 60%, #12041f 100%)"
      testName="恋愛偏差値テスト"
      testEmoji="💘"
      categoryKeys={LOVE_KEYS}
      categoryLabels={LOVE_LABELS}
      strengthTexts={STRENGTH_TEXTS}
      weaknessTexts={WEAKNESS_TEXTS}
      quizPath="/love/quiz"
      crossLinks={crossLinksExcluding("/love/quiz")}
      typeNames={TYPE_NAMES}
      axisDescriptions={AXIS_DESCS}
      noteArticle={null}
    />
  );
}
