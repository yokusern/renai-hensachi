import type { GenericQuestion } from "@/lib/generic-types";

// 5軸: selfAnalysis(自己分析力) / industryResearch(業界・企業研究力) / interview(面接力) / essay(ES作成力) / action(行動量・継続力)
// A=3 B=2 C=1 D=0（行動の充実度で評価）

function s(primary: string, a: number, b: number, c: number, d: number): GenericQuestion["options"][number]["scores"] {
  const keys = ["selfAnalysis", "industryResearch", "interview", "essay", "action"];
  const vals = { a, b, c, d };
  const result: Record<string, number> = {};
  for (const k of keys) result[k] = 0;
  result[primary] = 0; // overridden below
  return result; // placeholder — see inline below
}

// inline scoring helper
const sc = (primary: string, a: number, b: number, c: number, d: number) => [
  { [primary]: a },
  { [primary]: b },
  { [primary]: c },
  { [primary]: d },
];

function opt(label: string, key: string, val: number): GenericQuestion["options"][number] {
  return { label, scores: { selfAnalysis: 0, industryResearch: 0, interview: 0, essay: 0, action: 0, [key]: val } };
}

export const shukatsuQuestions: GenericQuestion[] = [
  // ── 自己分析力 Q1-Q5 ──
  {
    id: "sk01",
    text: "自分の強みを3つ、具体的なエピソードと共に説明できる？",
    options: [
      opt("スラスラ説明できる（練習済み・フィードバックをもらった）", "selfAnalysis", 3),
      opt("だいたい説明できるが、エピソードが薄い", "selfAnalysis", 2),
      opt("強みは分かるが言葉にしにくい", "selfAnalysis", 1),
      opt("自分の強みが何か、まだ分かっていない", "selfAnalysis", 0),
    ],
  },
  {
    id: "sk02",
    text: "自分の弱みと、それをどう克服しようとしているかを説明できる？",
    options: [
      opt("弱みの克服エピソードも含め、正直かつ具体的に説明できる", "selfAnalysis", 3),
      opt("弱みは言えるが、克服エピソードがない", "selfAnalysis", 2),
      opt("弱みを言うと不利になりそうで、うまく言えない", "selfAnalysis", 1),
      opt("弱みについてあまり考えていない", "selfAnalysis", 0),
    ],
  },
  {
    id: "sk03",
    text: "志望動機の核心（なぜこの会社でなければいけないか）を説明できる？",
    options: [
      opt("自己分析＋業界研究＋企業研究を統合した独自の理由がある", "selfAnalysis", 3),
      opt("業界の話はできるが、企業固有の理由が薄い", "selfAnalysis", 2),
      opt("HPに書いてあることを言い換えた程度", "selfAnalysis", 1),
      opt("「なんとなく興味がある」程度しかない", "selfAnalysis", 0),
    ],
  },
  {
    id: "sk04",
    text: "ガクチカ（学生時代に最も頑張ったこと）を、評価されるポイントを意識して話せる？",
    options: [
      opt("行動・困難・工夫・結果の流れで、数字も入れて話せる", "selfAnalysis", 3),
      opt("体験を語れるが、評価ポイントの意識が薄い", "selfAnalysis", 2),
      opt("話せるが「何が評価されるか」を考えていなかった", "selfAnalysis", 1),
      opt("ガクチカになる経験が特にない", "selfAnalysis", 0),
    ],
  },
  {
    id: "sk05",
    text: "5〜10年後に自分がどうなりたいか、具体的なビジョンを語れる？",
    options: [
      opt("なりたい姿と、そこへのキャリアパスを具体的に語れる", "selfAnalysis", 3),
      opt("なりたい姿はあるが、具体的なステップが不明確", "selfAnalysis", 2),
      opt("「なんとなく成長したい」程度しかない", "selfAnalysis", 1),
      opt("将来のビジョンを考えたことがほとんどない", "selfAnalysis", 0),
    ],
  },

  // ── 業界・企業研究力 Q6-Q10 ──
  {
    id: "sk06",
    text: "志望業界の最新ニュース（直近3ヶ月）を3つ以上、自分の言葉で語れる？",
    options: [
      opt("3つ以上、志望動機と絡めて語れる", "industryResearch", 3),
      opt("1〜2つは言えるが、詳しくはない", "industryResearch", 2),
      opt("大きいニュースは知っているが、業界との関連を説明できない", "industryResearch", 1),
      opt("業界ニュースをほぼフォローしていない", "industryResearch", 0),
    ],
  },
  {
    id: "sk07",
    text: "志望企業の主要な競合会社と、その差別化ポイントを説明できる？",
    options: [
      opt("競合3社以上と志望企業の強み・弱みを比較して説明できる", "industryResearch", 3),
      opt("競合は知っているが、差別化の説明が浅い", "industryResearch", 2),
      opt("競合の名前は言えるが、違いは分からない", "industryResearch", 1),
      opt("競合についてほぼ知らない", "industryResearch", 0),
    ],
  },
  {
    id: "sk08",
    text: "OB/OG訪問や座談会で聞いた、企業の実態情報はある？",
    options: [
      opt("複数のOB/OGから生の情報を得て、HPとの差異まで確認した", "industryResearch", 3),
      opt("説明会には参加したが、OB/OG訪問はしていない", "industryResearch", 2),
      opt("説明会も1〜2回行った程度", "industryResearch", 1),
      opt("説明会や訪問はほぼしていない", "industryResearch", 0),
    ],
  },
  {
    id: "sk09",
    text: "志望企業の採用方針・評価基準（求める人物像）を把握している？",
    options: [
      opt("採用担当者のXや社員ブログ、OBコメントも参照して把握している", "industryResearch", 3),
      opt("採用ページを読んで、だいたい把握している", "industryResearch", 2),
      opt("「人物重視」「協調性重視」程度は知っている", "industryResearch", 1),
      opt("あまり調べていない", "industryResearch", 0),
    ],
  },
  {
    id: "sk10",
    text: "志望業界と自分の価値観・強みの合致点を具体的に説明できる？",
    options: [
      opt("業界の特性・カルチャーと自分の強み・価値観が噛み合う具体的な説明ができる", "industryResearch", 3),
      opt("「合いそう」という感覚はあるが、言語化が難しい", "industryResearch", 2),
      opt("業界への憧れはあるが、自分との接点が薄い", "industryResearch", 1),
      opt("なぜこの業界かをほぼ考えていない", "industryResearch", 0),
    ],
  },

  // ── 面接力 Q11-Q15 ──
  {
    id: "sk11",
    text: "想定外の質問（「ピーマンを擬人化してください」等）が来ても、落ち着いて答えられる？",
    options: [
      opt("少し考えてから、ユニークだが的外れでない答えを出せる", "interview", 3),
      opt("なんとか答えるが、パニックになりやすい", "interview", 2),
      opt("驚いてうまく答えられないことが多い", "interview", 1),
      opt("こういう質問が来たら、かなり焦る", "interview", 0),
    ],
  },
  {
    id: "sk12",
    text: "面接での自分の表情・声のトーン・話すスピードを客観的に確認したことがある？",
    options: [
      opt("録画や模擬面接で客観視し、改善点を把握して修正した", "interview", 3),
      opt("意識はしているが、客観的に確認したことはない", "interview", 2),
      opt("あまり意識できていない", "interview", 1),
      opt("全く意識したことがない", "interview", 0),
    ],
  },
  {
    id: "sk13",
    text: "面接で「他社の選考状況」を聞かれたとき、正直かつ戦略的に答えられる？",
    options: [
      opt("正直に話しつつ、志望順位や軸を論理的に説明できる", "interview", 3),
      opt("なんとか答えられるが、少し苦手意識がある", "interview", 2),
      opt("正直に話すべきか、隠すべきか迷ってしまう", "interview", 1),
      opt("こういう質問は全く準備していない", "interview", 0),
    ],
  },
  {
    id: "sk14",
    text: "集団面接やグループディスカッションで、他者の意見を踏まえて発言できる？",
    options: [
      opt("他者の意見を受けた上で、自分の考えを追加・補強できる", "interview", 3),
      opt("発言はできるが、他者の意見を受けた応用が難しい", "interview", 2),
      opt("発言するのに緊張して、なかなかできない", "interview", 1),
      opt("グループでの発言が苦手でほぼできない", "interview", 0),
    ],
  },
  {
    id: "sk15",
    text: "面接の逆質問（「最後に質問はありますか？」）で、企業研究から生まれた質問を準備している？",
    options: [
      opt("業界・企業研究から「調べても分からなかったこと」を具体的に聞ける", "interview", 3),
      opt("いくつか準備しているが、ありきたりな質問が多い", "interview", 2),
      opt("「特にありません」と言ってしまうことが多い", "interview", 1),
      opt("逆質問の準備をほぼしていない", "interview", 0),
    ],
  },

  // ── ES作成力 Q16-Q20 ──
  {
    id: "sk16",
    text: "ESの設問に対して、企業別にカスタマイズして書いている？",
    options: [
      opt("企業のキーワード・求める人物像に合わせてカスタマイズしている", "essay", 3),
      opt("ベースは同じだが、一部をアレンジしている", "essay", 2),
      opt("ほぼコピー＆ペーストで使い回している", "essay", 1),
      opt("ES作成にあまり時間をかけていない", "essay", 0),
    ],
  },
  {
    id: "sk17",
    text: "ESで自分の強みを書くとき、具体的なエピソード・数字を入れている？",
    options: [
      opt("「〇人中上位〇%」「〇週間で〇%改善」等の数字を入れている", "essay", 3),
      opt("エピソードは書くが、数字は入れていない", "essay", 2),
      opt("「頑張りました」程度の抽象的な表現が多い", "essay", 1),
      opt("何を書けばいいか分からない", "essay", 0),
    ],
  },
  {
    id: "sk18",
    text: "ESをキャリアセンター・就活仲間・社会人など他人に読んでもらい、フィードバックをもらった？",
    options: [
      opt("複数人からフィードバックをもらい、大幅に修正した", "essay", 3),
      opt("1人に読んでもらったことはある", "essay", 2),
      opt("自分では何度も読み返したが、他人には見せていない", "essay", 1),
      opt("まだESを書いていない・見せたことがない", "essay", 0),
    ],
  },
  {
    id: "sk19",
    text: "ESの字数制限（300字・400字など）の中で、最も伝えたいことを強調できている？",
    options: [
      opt("字数内に収めつつ、最も伝えたいことを強調できる", "essay", 3),
      opt("字数内に収めることはできるが、削るのが難しい", "essay", 2),
      opt("字数を合わせるので精一杯", "essay", 1),
      opt("字数管理があまりできていない", "essay", 0),
    ],
  },
  {
    id: "sk20",
    text: "「なぜ当社か」を競合他社と区別した理由で書けている？",
    options: [
      opt("競合との違いを踏まえた、その企業固有の理由を書ける", "essay", 3),
      opt("業界に興味がある理由は書けるが、企業固有の理由が薄い", "essay", 2),
      opt("会社の事業内容を言い換えた程度", "essay", 1),
      opt("あまり深く考えずに書いている", "essay", 0),
    ],
  },

  // ── 行動量・継続力 Q21-Q25 ──
  {
    id: "sk21",
    text: "今まで何社受けたか（インターン・説明会参加含む）？",
    options: [
      opt("20社以上（積極的に動いている）", "action", 3),
      opt("10〜19社", "action", 2),
      opt("5〜9社", "action", 1),
      opt("5社未満、もしくはこれから", "action", 0),
    ],
  },
  {
    id: "sk22",
    text: "面接後に、振り返りメモを書いて次に活かしている？",
    options: [
      opt("毎回記録し、次の面接に活かすPDCAを回している", "action", 3),
      opt("大事な面接は記録する", "action", 2),
      opt("記録はしないが、頭の中で振り返る", "action", 1),
      opt("振り返りをほぼしていない", "action", 0),
    ],
  },
  {
    id: "sk23",
    text: "就活生のコミュニティ・仲間と情報交換をしている？",
    options: [
      opt("複数のコミュニティや友人と定期的に情報交換している", "action", 3),
      opt("一部の友人とは話す", "action", 2),
      opt("あまりしておらず、一人でやることが多い", "action", 1),
      opt("情報交換をほぼしていない", "action", 0),
    ],
  },
  {
    id: "sk24",
    text: "就活と本業（学業・バイト・課外活動）を両立できている？",
    options: [
      opt("就活でも本業でも高いパフォーマンスを維持できている", "action", 3),
      opt("どちらかを犠牲にしながら何とかやっている", "action", 2),
      opt("就活に追われて本業がおろそかになっている", "action", 1),
      opt("まだ本格的に就活を始めていない", "action", 0),
    ],
  },
  {
    id: "sk25",
    text: "不採用が続いても、メンタルを切り替えて次のアクションに移れる？",
    options: [
      opt("落ちても切り替えが早く、反省点を整理して次に移れる", "action", 3),
      opt("少し落ち込むが、数日で回復できる", "action", 2),
      opt("不採用が続くと大きく落ち込み、行動が止まりやすい", "action", 1),
      opt("まだ本格的な選考を受けておらず、耐性が不明", "action", 0),
    ],
  },
];
