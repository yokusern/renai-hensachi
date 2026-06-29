export type SeikakuKey = "mount" | "calculation" | "empathy" | "jealousy" | "manipulation";

export interface SeikakuOption {
  label: string;
  scores: Record<SeikakuKey, number>;
}

export interface SeikakuQuestion {
  id: string;
  text: string;
  category: SeikakuKey;
  options: SeikakuOption[];
}

export const questions: SeikakuQuestion[] = [
  // ── マウント癖 (Q1-Q5) ──
  {
    id: "sw-01",
    text: "友達が自慢話をしてきたとき、自分はどうなる？",
    category: "mount",
    options: [
      { label: "素直に「すごいね！」と言える", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "聞きながら「自分も頑張ろう」と思う", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「自分の場合は〜」と話を自分に持ってきたくなる", scores: { mount: 2, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "気づいたら自分の方が良いエピソードを話していた", scores: { mount: 3, calculation: 0, empathy: 1, jealousy: 1, manipulation: 0 } },
    ],
  },
  {
    id: "sw-02",
    text: "初対面の人とどんな話をしがち？",
    category: "mount",
    options: [
      { label: "相手のことを聞くことが多い", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "お互い同じくらい話す", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "自分の経験や知識の話が多めになる", scores: { mount: 2, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「自分はこれを知ってる・経験した」を自然にアピールしている", scores: { mount: 3, calculation: 0, empathy: 0, jealousy: 0, manipulation: 1 } },
    ],
  },
  {
    id: "sw-03",
    text: "誰かが知らないことを自分は知っていたとき",
    category: "mount",
    options: [
      { label: "教えてあげる。それだけ", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し得意な気分になるが表には出さない", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「え、知らないの？」と思わず言う", scores: { mount: 2, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "その人の前での「物知り」ポジションを確立しに行く", scores: { mount: 3, calculation: 1, empathy: 0, jealousy: 0, manipulation: 1 } },
    ],
  },
  {
    id: "sw-04",
    text: "旅行や体験のSNS投稿をするとき、主な動機は？",
    category: "mount",
    options: [
      { label: "楽しかった思い出として残したい", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "シェアしたい気持ちが主", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「羨ましいと思わせたい」が少しある", scores: { mount: 2, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "「自分の充実した生活を見せる」ために投稿する", scores: { mount: 3, calculation: 0, empathy: 0, jealousy: 2, manipulation: 1 } },
    ],
  },
  {
    id: "sw-05",
    text: "仕事・勉強の話をするとき、どうなりがち？",
    category: "mount",
    options: [
      { label: "聞かれたら答える程度", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "話が膨らむと自分の話もする", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "さりげなく自分のスキルや実績を組み込む", scores: { mount: 2, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "会話の中で「相手より詳しいポジション」を確認してから話す", scores: { mount: 3, calculation: 2, empathy: 0, jealousy: 0, manipulation: 0 } },
    ],
  },
  // ── 計算高さ (Q6-Q10) ──
  {
    id: "sw-06",
    text: "奢ってもらったとき、どう感じる？",
    category: "calculation",
    options: [
      { label: "ありがたい。後日ちゃんとお返しする", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "ありがたい。チャンスがあればお返しする", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "ありがたいが、特に返さなくていいかなとも思う", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "奢ってもらう状況を自然に作れたと感じる", scores: { mount: 0, calculation: 3, empathy: 0, jealousy: 0, manipulation: 1 } },
    ],
  },
  {
    id: "sw-07",
    text: "人間関係に「コスパ」を感じることがある？",
    category: "calculation",
    options: [
      { label: "ない。人は損得で選ばない", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "意識しないようにしているが、たまに感じる", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "ある。エネルギーの使い方として当然だと思う", scores: { mount: 0, calculation: 2, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "明確に「有益な人」「そうでない人」を区別している", scores: { mount: 0, calculation: 3, empathy: 2, jealousy: 0, manipulation: 2 } },
    ],
  },
  {
    id: "sw-08",
    text: "誰かを助けるとき、何が決め手になる？",
    category: "calculation",
    options: [
      { label: "困っているから助ける。それだけ", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "自分に余裕があれば助ける", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「助けたら何か返ってくるか」を考えてしまう", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "見返りが見込めるかどうかが主な判断基準", scores: { mount: 0, calculation: 3, empathy: 1, jealousy: 0, manipulation: 2 } },
    ],
  },
  {
    id: "sw-09",
    text: "優良情報（求人・割引など）を得たとき、どうシェアする？",
    category: "calculation",
    options: [
      { label: "関係ありそうな人に全員シェアする", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "仲の良い人にはシェアする", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "自分が使った後に選んだ人にだけ教える", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "「この人に教えると自分にとって有利」な人を選んでシェアする", scores: { mount: 0, calculation: 3, empathy: 0, jealousy: 0, manipulation: 3 } },
    ],
  },
  {
    id: "sw-10",
    text: "褒め言葉を言うタイミングを選んでいる？",
    category: "calculation",
    options: [
      { label: "思ったときに素直に言う", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "タイミングを少し見て言う", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "褒めると何か良いことがある場面を選んで言う", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "褒めることは相手の行動をコントロールするツールだと思っている", scores: { mount: 0, calculation: 3, empathy: 1, jealousy: 0, manipulation: 3 } },
    ],
  },
  // ── 共感の薄さ (Q11-Q15) ──
  {
    id: "sw-11",
    text: "友達が深刻な悩みを打ち明けてきたとき、最初に出てくる気持ちは？",
    category: "empathy",
    options: [
      { label: "「なんとか力になりたい」", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「大変だったね、話して」と素直に思う", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「また相談か…」と思うが対応する", scores: { mount: 0, calculation: 0, empathy: 2, jealousy: 0, manipulation: 0 } },
      { label: "「自分には関係ない話だな」と感じる", scores: { mount: 0, calculation: 1, empathy: 3, jealousy: 0, manipulation: 0 } },
    ],
  },
  {
    id: "sw-12",
    text: "自分が正しいと思っているとき、相手が感情的になってきたら",
    category: "empathy",
    options: [
      { label: "相手の感情を受け止めて、まず落ち着かせる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し困りながらも感情的な部分にも対応する", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「感情的になっても正しいものは正しい」と思う", scores: { mount: 1, calculation: 0, empathy: 2, jealousy: 0, manipulation: 0 } },
      { label: "感情で話してくる相手が「非論理的で面倒」に見える", scores: { mount: 0, calculation: 0, empathy: 3, jealousy: 0, manipulation: 0 } },
    ],
  },
  {
    id: "sw-13",
    text: "映画で登場人物が泣くシーン、どう感じる？",
    category: "empathy",
    options: [
      { label: "感情移入して一緒に泣くことがある", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "悲しいと感じる", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「作り話だから」と距離を保てる", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「で、話はどう進むの？」と展開が気になる", scores: { mount: 0, calculation: 0, empathy: 2, jealousy: 0, manipulation: 0 } },
    ],
  },
  {
    id: "sw-14",
    text: "グループで誰かが疎外されていると気づいたとき",
    category: "empathy",
    options: [
      { label: "積極的にその人を会話に引き込む", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し気になるが行動には移さない", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「自分には関係ない」と思う", scores: { mount: 0, calculation: 1, empathy: 2, jealousy: 0, manipulation: 0 } },
      { label: "「空気読めない人が悪い」と思う", scores: { mount: 1, calculation: 0, empathy: 3, jealousy: 0, manipulation: 0 } },
    ],
  },
  {
    id: "sw-15",
    text: "相手が「傷ついた」と言ってきたとき",
    category: "empathy",
    options: [
      { label: "素直に謝って何がいけなかったか考える", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "謝るが「そんなつもりじゃなかった」とも思う", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 0, manipulation: 0 } },
      { label: "「これで傷つく方が繊細すぎる」と思う", scores: { mount: 1, calculation: 0, empathy: 2, jealousy: 0, manipulation: 0 } },
      { label: "「大げさだ」と感じて謝罪も最小限にする", scores: { mount: 1, calculation: 0, empathy: 3, jealousy: 0, manipulation: 0 } },
    ],
  },
  // ── 嫉妬深さ (Q16-Q20) ──
  {
    id: "sw-16",
    text: "同じスタートラインにいた人が先に成功したとき",
    category: "jealousy",
    options: [
      { label: "素直に祝える", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "うらやましいと感じるが前向きになる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "「運が良かっただけ」と思わずにいられない", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 2, manipulation: 0 } },
      { label: "その人のSNSを意識的にチェックしてしまう", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 3, manipulation: 0 } },
    ],
  },
  {
    id: "sw-17",
    text: "友達の恋愛が順調な話を聞いたとき",
    category: "jealousy",
    options: [
      { label: "一緒に喜べる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少しうらやましいが祝福できる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "「自分の恋愛はどうしてこうなんだろう」と比較する", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 2, manipulation: 0 } },
      { label: "幸せ報告が続くと会うのが億劫になる", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 3, manipulation: 0 } },
    ],
  },
  {
    id: "sw-18",
    text: "SNSで誰かが自分より「いいね」や反応が多かったとき",
    category: "jealousy",
    options: [
      { label: "気にならない", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し気になるが流せる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "「なんでこの人の方が多いんだろう」と考えてしまう", scores: { mount: 1, calculation: 0, empathy: 0, jealousy: 2, manipulation: 0 } },
      { label: "その人のコンテンツを意識的に研究してしまう", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 3, manipulation: 0 } },
    ],
  },
  {
    id: "sw-19",
    text: "容姿や能力が明らかに優れている人と一緒にいると",
    category: "jealousy",
    options: [
      { label: "関係なく普通に接する", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し意識するが気にしない", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "無意識にその人のデメリットを探してしまう", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 2, manipulation: 0 } },
      { label: "写真を一緒に撮りたくない・少し威圧感を感じる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 3, manipulation: 0 } },
    ],
  },
  {
    id: "sw-20",
    text: "「あなたより○○さんの方が上手い」と言われたとき",
    category: "jealousy",
    options: [
      { label: "「そうだね、参考にしよう」と思える", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "少し悔しいが受け入れる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 1, manipulation: 0 } },
      { label: "比べた人と○○さんの両方にモヤる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 2, manipulation: 0 } },
      { label: "○○さんへの敵意が生まれる", scores: { mount: 0, calculation: 0, empathy: 1, jealousy: 3, manipulation: 0 } },
    ],
  },
  // ── 利用上手度 (Q21-Q25) ──
  {
    id: "sw-21",
    text: "自分に不利な状況で、どう動く？",
    category: "manipulation",
    options: [
      { label: "正直に状況を説明する", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "言い訳はせず、事実だけ伝える", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "自分に有利な情報を選んで話す", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 2 } },
      { label: "相手が自分に有利な判断をするよう会話を誘導する", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 3 } },
    ],
  },
  {
    id: "sw-22",
    text: "人に何かをお願いするとき、何を意識する？",
    category: "manipulation",
    options: [
      { label: "特に何も意識しない。率直に頼む", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "相手の都合を考えて頼む", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "断られないよう前置きや雰囲気を整えてから頼む", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 2 } },
      { label: "断りにくい状況・文脈を作ってから頼む", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 3 } },
    ],
  },
  {
    id: "sw-23",
    text: "グループで意見が分かれたとき、自分の意見を通すためにどうする？",
    category: "manipulation",
    options: [
      { label: "率直に自分の意見を言う。通らなければ合わせる", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "理由を丁寧に説明して理解を求める", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "影響力のある人を先に説得してから全体に話す", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 2 } },
      { label: "多数派が自分の方向に向くよう水面下で動く", scores: { mount: 1, calculation: 2, empathy: 0, jealousy: 0, manipulation: 3 } },
    ],
  },
  {
    id: "sw-24",
    text: "相手が怒っているとき、どう対応する？",
    category: "manipulation",
    options: [
      { label: "相手の怒りに正面から向き合って話し合う", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "相手が落ち着いたタイミングを見て話す", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "相手の怒りを和らげる「正解ワード」を計算してから話す", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 2 } },
      { label: "相手の怒りを利用して自分に有利な結論に誘導できないか考える", scores: { mount: 0, calculation: 2, empathy: 1, jealousy: 0, manipulation: 3 } },
    ],
  },
  {
    id: "sw-25",
    text: "人間関係を振り返ったとき、「相手を操作した」と思えることがある？",
    category: "manipulation",
    options: [
      { label: "ない", scores: { mount: 0, calculation: 0, empathy: 0, jealousy: 0, manipulation: 0 } },
      { label: "「うまく立ち回った」ことはある", scores: { mount: 0, calculation: 1, empathy: 0, jealousy: 0, manipulation: 1 } },
      { label: "意識的に相手の行動を誘導したことがある", scores: { mount: 0, calculation: 2, empathy: 0, jealousy: 0, manipulation: 2 } },
      { label: "「操作」は別に悪いことではなく、社会スキルだと思っている", scores: { mount: 0, calculation: 2, empathy: 1, jealousy: 0, manipulation: 3 } },
    ],
  },
];
