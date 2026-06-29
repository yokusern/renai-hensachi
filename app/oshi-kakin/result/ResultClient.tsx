"use client";

import SharedResultClient from "@/components/SharedResultClient";
import type { TypeNames, AxisDesc } from "@/components/SharedResultClient";
import { crossLinksExcluding } from "@/lib/all-tests";
import { OK_KEYS, OK_LABELS, OK_AXIS_DESCS } from "@/lib/oshi-kakin-scoring";

const STRENGTH_TEXTS: Record<string, string> = {
  spending:   "好きなものへの投資を躊躇しない決断力",
  expedition: "会いに行くための行動力と計画力",
  collection: "推しの軌跡を形として残す情熱",
  evangelism: "好きな気持ちを人に伝える表現力",
  depth:      "ひとつのものを深く愛する集中力",
};

const WEAKNESS_TEXTS: Record<string, string> = {
  spending:   "気づいたら想定外の金額になっていることがある",
  expedition: "体力・スケジュール管理が大変になることがある",
  collection: "物理的な収納と管理に追われることがある",
  evangelism: "温度差があると空回りすることがある",
  depth:      "推しの動向に生活が左右されやすい",
};

const TYPE_NAMES: TypeNames = {
  veryHigh: "廃課金ガチ勢",
  high:     "沼の住人",
  mid:      "中堅オタク",
  low:      "healthy推し活民",
};

const AXIS_DESCS: Record<string, AxisDesc> = {
  spending:   OK_AXIS_DESCS.spending,
  expedition: OK_AXIS_DESCS.expedition,
  collection: OK_AXIS_DESCS.collection,
  evangelism: OK_AXIS_DESCS.evangelism,
  depth:      OK_AXIS_DESCS.depth,
};

interface Props {
  params: Record<string, string>;
}

export default function OshiKakinResultClient({ params }: Props) {
  return (
    <SharedResultClient
      params={params}
      themeColor="#F97316"
      bgGradient="linear-gradient(160deg, #1a0a00 0%, #120700 60%, #1c0c00 100%)"
      testName="推し課金偏差値テスト"
      testEmoji="💸"
      categoryKeys={[...OK_KEYS]}
      categoryLabels={OK_LABELS}
      strengthTexts={STRENGTH_TEXTS}
      weaknessTexts={WEAKNESS_TEXTS}
      quizPath="/oshi-kakin/quiz"
      crossLinks={crossLinksExcluding("/oshi-kakin/quiz")}
      typeNames={TYPE_NAMES}
      axisDescriptions={AXIS_DESCS}
      noteArticle={null}
    />
  );
}
