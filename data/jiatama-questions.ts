import type { GenericQuestion } from "@/lib/generic-types";

// 5軸: pattern(パターン認識) / abstract(抽象化) / logic(論理推論) / premise(前提検証) / inhibit(直感抑制)
// 各問: A=正解(3点) B/C/D=0点 ※認知能力は正誤で評価

export const jiatamaQuestions: GenericQuestion[] = [
  // ── パターン認識 Q1-Q5 ──
  {
    id: "j01",
    text: "2, 4, 8, 16, 32, ？— 次の数は？",
    options: [
      { label: "64", scores: { pattern: 3, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "48", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "40", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "56", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j02",
    text: "1, 1, 2, 3, 5, 8, 13, ？— 次の数は？",
    options: [
      { label: "21", scores: { pattern: 3, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "18", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "17", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "23", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j03",
    text: "A, C, E, G, ？— アルファベットの規則は？",
    options: [
      { label: "I", scores: { pattern: 3, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "H", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "J", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "F", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j04",
    text: "3, 6, 12, 24, 48, ？— 次の数は？",
    options: [
      { label: "96", scores: { pattern: 3, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "60", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "72", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "84", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j05",
    text: "赤・白・青・赤・白・青・赤・白・？— 次の色は？",
    options: [
      { label: "青", scores: { pattern: 3, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "赤", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "白", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "どれでもよい", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },

  // ── 抽象化 Q6-Q10 ──
  {
    id: "j06",
    text: "「犬・猫・ハムスター・金魚・インコ」— これらを最もよく言い表す言葉は？",
    options: [
      { label: "ペットとして飼われる動物", scores: { pattern: 0, abstract: 3, logic: 0, premise: 0, inhibit: 0 } },
      { label: "哺乳類", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "感情を持つ生き物", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "人になつく動物", scores: { pattern: 0, abstract: 1, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j07",
    text: "「望遠鏡・虫眼鏡・コンタクトレンズ・眼鏡・双眼鏡」— 共通する役割は？",
    options: [
      { label: "視覚を補助・拡張する道具", scores: { pattern: 0, abstract: 3, logic: 0, premise: 0, inhibit: 0 } },
      { label: "ガラスでできた道具", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "光を使う道具", scores: { pattern: 0, abstract: 1, logic: 0, premise: 0, inhibit: 0 } },
      { label: "屋外で使う道具", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j08",
    text: "「走る・泳ぐ・跳ぶ・投げる・蹴る」— 最も抽象的な共通点は？",
    options: [
      { label: "身体を使う動作", scores: { pattern: 0, abstract: 3, logic: 0, premise: 0, inhibit: 0 } },
      { label: "スポーツで使う動き", scores: { pattern: 0, abstract: 1, logic: 0, premise: 0, inhibit: 0 } },
      { label: "下半身を主に使う動作", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "筋肉が必要な動作", scores: { pattern: 0, abstract: 1, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j09",
    text: "「新聞・テレビ・ラジオ・本・インターネット」— 最も正確に共通点を言い表すと？",
    options: [
      { label: "情報を受け取るメディア", scores: { pattern: 0, abstract: 3, logic: 0, premise: 0, inhibit: 0 } },
      { label: "エンターテインメントの道具", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "電気が必要な機器", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "ニュースを提供するもの", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j10",
    text: "「誕生日・卒業式・結婚式・成人式・葬式」— 共通点は？",
    options: [
      { label: "人生の節目となる儀式・通過儀礼", scores: { pattern: 0, abstract: 3, logic: 0, premise: 0, inhibit: 0 } },
      { label: "家族が集まる行事", scores: { pattern: 0, abstract: 1, logic: 0, premise: 0, inhibit: 0 } },
      { label: "写真を撮る機会", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "お祝いの場", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },

  // ── 論理推論 Q11-Q15 ──
  {
    id: "j11",
    text: "「全ての犬は動物だ。ポチは犬だ。」— 論理的に確実に言えることは？",
    options: [
      { label: "ポチは動物だ", scores: { pattern: 0, abstract: 0, logic: 3, premise: 0, inhibit: 0 } },
      { label: "ポチは哺乳類だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "ポチはかわいい", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "動物かどうか分からない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j12",
    text: "「AならばBが成り立つ。BならばCが成り立つ。」Aが成り立つとき確実に言えることは？",
    options: [
      { label: "Cが成り立つ", scores: { pattern: 0, abstract: 0, logic: 3, premise: 0, inhibit: 0 } },
      { label: "CならばAが成り立つ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "BもCも成り立たない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "情報が不足している", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j13",
    text: "「この学校の生徒は全員制服を着ている。太郎は制服を着ている。」太郎について確実に言えることは？",
    options: [
      { label: "太郎がこの学校の生徒かどうかは分からない", scores: { pattern: 0, abstract: 0, logic: 3, premise: 0, inhibit: 0 } },
      { label: "太郎はこの学校の生徒だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "太郎は他の学校の生徒だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "太郎は制服が好きだ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j14",
    text: "「今日か明日に試験がある。今日は試験がなかった。」確実に言えることは？",
    options: [
      { label: "明日試験がある", scores: { pattern: 0, abstract: 0, logic: 3, premise: 0, inhibit: 0 } },
      { label: "試験は来週に延期された", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "試験はなくなった", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "情報が不足していて分からない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j15",
    text: "「数学が得意な人は全員理科も得意だ。花子は理科が得意だ。」花子について確実に言えることは？",
    options: [
      { label: "花子が数学が得意かどうかは分からない", scores: { pattern: 0, abstract: 0, logic: 3, premise: 0, inhibit: 0 } },
      { label: "花子は数学も得意だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "花子は理系だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "花子は数学が苦手だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },

  // ── 前提検証 Q16-Q20 ──
  {
    id: "j16",
    text: "「スマホを使う時間が長い学生は成績が悪い。だからスマホが成績を下げる。」最大の問題点は？",
    options: [
      { label: "相関関係を因果関係と混同している", scores: { pattern: 0, abstract: 0, logic: 0, premise: 3, inhibit: 0 } },
      { label: "スマホの機種によって影響が違う", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "サンプル数が不明", scores: { pattern: 0, abstract: 0, logic: 0, premise: 1, inhibit: 0 } },
      { label: "スマホが好きな学生が多い事実を無視している", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j17",
    text: "「有名大学を出れば就職で有利だ。だから有名大学を目指すべきだ。」この論理に欠けている前提は？",
    options: [
      { label: "就職が自分の人生の最重要目標であるという前提", scores: { pattern: 0, abstract: 0, logic: 0, premise: 3, inhibit: 0 } },
      { label: "受験勉強が大変であるという前提", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "有名大学の授業が楽しいという前提", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "就職活動が難しいという前提", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j18",
    text: "「先月の売上が前月比30%増えた。この会社は絶好調だ。」最も重要な反論は？",
    options: [
      { label: "業界全体が100%増なら相対的には遅れている可能性がある", scores: { pattern: 0, abstract: 0, logic: 0, premise: 3, inhibit: 0 } },
      { label: "先月だけで判断するのは早計だ", scores: { pattern: 0, abstract: 0, logic: 0, premise: 1, inhibit: 0 } },
      { label: "30%という数字が正確かどうか分からない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 1, inhibit: 0 } },
      { label: "売上増加には様々な理由がある", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j19",
    text: "「この薬を飲んだら翌日風邪が治った。だからこの薬は効く。」この推論の根本的な問題は？",
    options: [
      { label: "薬なしでも自然治癒した可能性があり、対照実験がない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 3, inhibit: 0 } },
      { label: "薬の副作用について言及されていない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "風邪の種類が書かれていない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "一回だけでは判断できない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 1, inhibit: 0 } },
    ],
  },
  {
    id: "j20",
    text: "「アイスが売れる夏に溺死事故が増える。だからアイスが溺死の原因だ。」この論理の問題は？",
    options: [
      { label: "相関関係と因果関係の混同", scores: { pattern: 0, abstract: 0, logic: 0, premise: 3, inhibit: 0 } },
      { label: "アイスを食べると水に入りたくなる可能性はある", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "溺死の主な原因は別にある", scores: { pattern: 0, abstract: 0, logic: 0, premise: 1, inhibit: 0 } },
      { label: "データの収集方法が不明", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },

  // ── 直感抑制 Q21-Q25 ──
  {
    id: "j21",
    text: "「バットとボールを合わせると1100円。バットはボールより1000円高い。ボールはいくら？」直感ではなく計算で答えよ。",
    options: [
      { label: "100円", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "50円", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 3 } },
      { label: "10円", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "150円", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j22",
    text: "「5台の機械が5分で5個の部品を作る。100台の機械では100個作るのに何分かかる？」",
    options: [
      { label: "100分", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "50分", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "5分", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 3 } },
      { label: "10分", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j23",
    text: "「蓮の葉が毎日2倍に増え、48日目に池全体を覆う。池の半分が覆われるのは何日目？」",
    options: [
      { label: "94日目", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "47日目", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 3 } },
      { label: "24日目", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "46日目", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j24",
    text: "「コインを投げたら10回連続で表が出た。次に表が出る確率は？」",
    options: [
      { label: "50%", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 3 } },
      { label: "10%未満", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "90%以上", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "計算できない", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
  {
    id: "j25",
    text: "「直感ではなく計算で答えよ。1＋2＋3＋…＋100（1から100の整数の和）はいくつ？」",
    options: [
      { label: "5050", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 3 } },
      { label: "5000", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "10000", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
      { label: "4950", scores: { pattern: 0, abstract: 0, logic: 0, premise: 0, inhibit: 0 } },
    ],
  },
];
