"use client";

import SharedResultClient from "@/components/SharedResultClient";
import type { TypeNames, AxisDesc } from "@/components/SharedResultClient";
import { crossLinksExcluding } from "@/lib/all-tests";
import { SAKI_KEYS, SAKI_LABELS } from "@/lib/saki-nobashi-scoring";

const STRENGTH_TEXTS: Record<string, string> = {
  avoidance:     "タスクを目の前にしても「あとで」と思うクセが強めで、着手までに時間がかかる",
  decisiveness:  "決断を先延ばしにする傾向があり、選択肢が多いほど動けなくなりやすい",
  optimism:      "「まだ時間がある」と思いがちで、締切を楽観的に見積もる癖がある",
  selfControl:   "スマホや動画など誘惑に引っ張られやすく、集中を維持するのが苦手なタイプ",
  perfectionism: "完璧でないと動けない傾向が強く、準備に時間をかけすぎて始まらないことがある",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  avoidance:     "タスクへの着手そのものは意外と早い。後回しグセより別の要因が先延ばしを招いている",
  decisiveness:  "決断自体は意外とできる。先延ばしの原因は決断力でなく別の軸にある",
  optimism:      "時間の見積もりは比較的正確。「余裕でしょ」という楽観バイアスは低め",
  selfControl:   "誘惑への耐性は意外と高い。スマホや娯楽よりも別の軸が先延ばしを引き起こしている",
  perfectionism: "完璧主義は弱め。60%の完成度でも動ける柔軟性がある",
};

const TYPE_NAMES: TypeNames = {
  veryHigh: "先延ばし職人",
  high:     "追い込みの達人",
  mid:      "ギリギリ常習犯",
  low:      "即断即決型",
};

const AXIS_DESCS: Record<string, AxisDesc> = {
  avoidance: {
    s: "後回しグセが強め",
    w: "タスクにすぐ着手できる",
  },
  decisiveness: {
    s: "決断を先延ばしにしがち",
    w: "決断力は意外とある",
  },
  optimism: {
    s: "時間を楽観視しがち",
    w: "締切の見積もりが正確",
  },
  selfControl: {
    s: "誘惑に負けて手が止まる",
    w: "誘惑には意外と強い",
  },
  perfectionism: {
    s: "完璧でないと始められない",
    w: "完璧じゃなくても動ける",
  },
};

interface Props {
  params: Record<string, string>;
}

export default function SakiNobashiResultClient({ params }: Props) {
  return (
    <SharedResultClient
      params={params}
      themeColor="#F59E0B"
      bgGradient="linear-gradient(160deg, #1a1200 0%, #100d00 60%, #1a1500 100%)"
      testName="先延ばし偏差値テスト"
      testEmoji="🛋️"
      categoryKeys={[...SAKI_KEYS]}
      categoryLabels={SAKI_LABELS}
      strengthTexts={STRENGTH_TEXTS}
      weaknessTexts={WEAKNESS_TEXTS}
      quizPath="/saki-nobashi/quiz"
      crossLinks={crossLinksExcluding("/saki-nobashi/quiz")}
      typeNames={TYPE_NAMES}
      axisDescriptions={AXIS_DESCS}
      noteArticle={null}
    />
  );
}
