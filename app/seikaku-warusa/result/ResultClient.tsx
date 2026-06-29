"use client";

import SharedResultClient from "@/components/SharedResultClient";
import type { TypeNames, AxisDesc } from "@/components/SharedResultClient";
import { crossLinksExcluding } from "@/lib/all-tests";
import { SW_KEYS, SW_LABELS, SW_AXIS_DESCS } from "@/lib/seikaku-warusa-scoring";

const STRENGTH_TEXTS: Record<string, string> = {
  mount:        "人よりも高い視点で物事を見る視野の広さ",
  calculation:  "損得を見極める冷静な判断力",
  empathy:      "感情に流されない論理的な思考力",
  jealousy:     "向上心と負けたくない強い競争心",
  manipulation: "場の流れを読んで動かす交渉力",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  mount:        "相手の話を全力で聞く姿勢が弱めかも",
  calculation:  "損得を抜きにした感情的なつながりが少なくなりがち",
  empathy:      "感情的に落ち込んでいる人への寄り添いが苦手な場面がある",
  jealousy:     "比較から生まれるストレスが多く、消耗しやすい",
  manipulation: "「裏がある」と思われて信頼を失うことがある",
};

const TYPE_NAMES: TypeNames = {
  veryHigh: "無自覚サイコパス",
  high:     "計算高い策士",
  mid:      "ちょい毒舌キャラ",
  low:      "実は優しいツンデレ",
};

const AXIS_DESCS: Record<string, AxisDesc> = {
  mount:        SW_AXIS_DESCS.mount,
  calculation:  SW_AXIS_DESCS.calculation,
  empathy:      SW_AXIS_DESCS.empathy,
  jealousy:     SW_AXIS_DESCS.jealousy,
  manipulation: SW_AXIS_DESCS.manipulation,
};

interface Props {
  params: Record<string, string>;
}

export default function SeikakuWarusaResultClient({ params }: Props) {
  return (
    <SharedResultClient
      params={params}
      themeColor="#BE123C"
      bgGradient="linear-gradient(160deg, #140005 0%, #0d0003 60%, #180006 100%)"
      testName="性格の悪さ偏差値テスト"
      testEmoji="😈"
      categoryKeys={[...SW_KEYS]}
      categoryLabels={SW_LABELS}
      strengthTexts={STRENGTH_TEXTS}
      weaknessTexts={WEAKNESS_TEXTS}
      quizPath="/seikaku-warusa/quiz"
      crossLinks={crossLinksExcluding("/seikaku-warusa/quiz")}
      typeNames={TYPE_NAMES}
      axisDescriptions={AXIS_DESCS}
      noteArticle={null}
    />
  );
}
