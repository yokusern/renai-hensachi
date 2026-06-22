export type CategoryKey =
  | "communication"
  | "selfAwareness"
  | "empathy"
  | "initiative"
  | "mentalStability";

export interface Scores {
  communication: number;
  selfAwareness: number;
  empathy: number;
  initiative: number;
  mentalStability: number;
}

export interface Option {
  label: string;
  scores: Scores;
}

export interface Question {
  id: string;
  text: string;
  category: CategoryKey;
  options: Option[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 設計根拠:
// ・コミュニケーション力 → Gottman の「4つの黙示録の騎士」研究に基づく
//   (批判・侮蔑・防衛・壁を作ること vs. 積極的傾聴・Iメッセージ表現)
// ・自己理解度 → 感情知性 (EI) の自己認識次元 + 自己内省尺度
// ・相手への理解度 → EI の共感次元 + Davis の対人的反応指標 (IRI)
// ・行動力 → 接近-回避動機理論 (Elliot & Reis, 2003)
// ・メンタル安定度 → 成人愛着スタイル (ECR-R: Fraley et al.)
//   + 多次元嫉妬尺度 (MJS) の不安・認知因子
// ─────────────────────────────────────────────────────────────────────────────

export const questions: Question[] = [
  // ── コミュニケーション力 (Q1-Q5) ──────────────────────────────────────────
  {
    id: "q01",
    text: "好きな人と2人でいるとき、会話が途切れて沈黙になった。あなたはどうする？",
    category: "communication",
    options: [
      {
        label: "自分から新しい話題を振る",
        scores: { communication: 3, selfAwareness: 1, empathy: 1, initiative: 2, mentalStability: 2 },
      },
      {
        label: "相手が話し出すのをそっと待つ",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "「なんか静かだね」と笑いながら言う",
        scores: { communication: 2, selfAwareness: 2, empathy: 2, initiative: 2, mentalStability: 2 },
      },
      {
        label: "スマホを見てやり過ごす",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 1 },
      },
    ],
  },
  {
    id: "q02",
    text: "話しているうちに相手の話が長くなってきた。あなたは？",
    category: "communication",
    options: [
      {
        label: "途中で「ちょっと待って」と話を戻す",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 2, mentalStability: 2 },
      },
      {
        label: "最後まで聞いてから、自分の話に戻る",
        scores: { communication: 3, selfAwareness: 1, empathy: 3, initiative: 1, mentalStability: 2 },
      },
      {
        label: "表情だけ合わせて、内心は別のことを考えている",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "脱線話に乗っかって、新しい話題として楽しむ",
        scores: { communication: 2, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 3 },
      },
    ],
  },
  {
    id: "q03",
    text: "相手の言動に少し怒りを感じた。あなたはどう対処する？",
    category: "communication",
    options: [
      {
        label: "その場で「それはちょっと嫌だったよ」と正直に言う",
        scores: { communication: 3, selfAwareness: 3, empathy: 2, initiative: 3, mentalStability: 3 },
      },
      {
        label: "少し落ち着いてから話す",
        scores: { communication: 2, selfAwareness: 2, empathy: 2, initiative: 1, mentalStability: 2 },
      },
      {
        label: "特に何も言わず、自分の中で消化する",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "態度で察してもらおうとする",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q04",
    text: "相手がなんとなく落ち込んでいる様子だった。あなたはどう声をかける？",
    category: "communication",
    options: [
      {
        label: "「どうしたの？話したかったら聞くよ」と声をかける",
        scores: { communication: 3, selfAwareness: 1, empathy: 3, initiative: 2, mentalStability: 2 },
      },
      {
        label: "そっとしておく（本人が話したいときに言ってくれる）",
        scores: { communication: 1, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 2 },
      },
      {
        label: "明るい話題を振って気分を変えようとする",
        scores: { communication: 2, selfAwareness: 1, empathy: 1, initiative: 2, mentalStability: 2 },
      },
      {
        label: "気になるけど、なんとなく声をかけられないでいる",
        scores: { communication: 0, selfAwareness: 0, empathy: 1, initiative: 0, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q05",
    text: "自分の気持ち（好意や不満）を相手に伝えるとき、あなたは？",
    category: "communication",
    options: [
      {
        label: "言葉にして、直接伝える",
        scores: { communication: 3, selfAwareness: 3, empathy: 2, initiative: 3, mentalStability: 3 },
      },
      {
        label: "LINEやメッセージで伝える（対面だと照れるので）",
        scores: { communication: 2, selfAwareness: 2, empathy: 1, initiative: 2, mentalStability: 1 },
      },
      {
        label: "遠回しに匂わせる感じで伝える",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "伝えたいけど、タイミングを見つけられないまま時間が経つ",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 0 },
      },
    ],
  },

  // ── 自己理解度 (Q6-Q10) ───────────────────────────────────────────────────
  {
    id: "q06",
    text: "自分の恋愛のクセや傾向について聞かれたら？",
    category: "selfAwareness",
    options: [
      {
        label: "「こういうタイプに惹かれやすくて、こんな行動パターンがある」と説明できる",
        scores: { communication: 1, selfAwareness: 3, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "なんとなくわかるけど、うまく言葉にできない",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "毎回違うからパターンはない気がする",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 1, mentalStability: 1 },
      },
      {
        label: "あまり考えたことがなかった",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 1 },
      },
    ],
  },
  {
    id: "q07",
    text: "過去の恋愛がうまくいかなかったとき、あなたはどう振り返る？",
    category: "selfAwareness",
    options: [
      {
        label: "自分にも原因があったと思って、次に活かそうとする",
        scores: { communication: 1, selfAwareness: 3, empathy: 2, initiative: 1, mentalStability: 3 },
      },
      {
        label: "しばらく引きずるが、時間が経つと忘れる",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 2 },
      },
      {
        label: "相手のせいにして、自分はそこまで悪くなかったと思う",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 2 },
      },
      {
        label: "あまり深く考えず、次に進む",
        scores: { communication: 1, selfAwareness: 1, empathy: 0, initiative: 2, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q08",
    text: "好きな人ができたとき、自分の気持ちに気づくのはどんなとき？",
    category: "selfAwareness",
    options: [
      {
        label: "LINEの返信が来た・来ないときの自分の反応で気づく",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "その人のことを気づいたら考えていると気づく",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "友達に「好きじゃないの？」と言われて初めて気づく",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "「会いたい」と思ったとき、はっきり自覚する",
        scores: { communication: 1, selfAwareness: 3, empathy: 1, initiative: 2, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q09",
    text: "恋愛で自分が一番失敗しやすいパターンは？",
    category: "selfAwareness",
    options: [
      {
        label: "好きになりすぎて、相手のペースに合わせすぎる",
        scores: { communication: 1, selfAwareness: 3, empathy: 2, initiative: 1, mentalStability: 0 },
      },
      {
        label: "気持ちをうまく伝えられずに終わってしまう",
        scores: { communication: 0, selfAwareness: 2, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "相手を追いすぎて引かれる",
        scores: { communication: 0, selfAwareness: 2, empathy: 0, initiative: 2, mentalStability: 0 },
      },
      {
        label: "特に思いつかない・わからない",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q10",
    text: "恋愛中の自分の行動を後から振り返ると？",
    category: "selfAwareness",
    options: [
      {
        label: "「あそこでああすればよかった」と具体的に反省できる",
        scores: { communication: 1, selfAwareness: 3, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "なんとなくうまくいかなかったとは思うが、原因は不明",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "後悔はするが、何度も同じパターンを繰り返す",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 0 },
      },
      {
        label: "あまり引きずらないので、深く考えない",
        scores: { communication: 1, selfAwareness: 1, empathy: 0, initiative: 1, mentalStability: 3 },
      },
    ],
  },

  // ── 相手への理解度 (Q11-Q15) ─────────────────────────────────────────────
  {
    id: "q11",
    text: "久しぶりに会った相手が、なんとなくいつもより元気がない様子だった。あなたは？",
    category: "empathy",
    options: [
      {
        label: "すぐ気づいて「なんか今日元気なさそうだけど、大丈夫？」と聞く",
        scores: { communication: 2, selfAwareness: 1, empathy: 3, initiative: 2, mentalStability: 2 },
      },
      {
        label: "気にはなるが、本人が言うまで様子を見る",
        scores: { communication: 1, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 2 },
      },
      {
        label: "言われるまで特に気づかなかった",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "「今日なんか雰囲気違うね」とやんわり触れる",
        scores: { communication: 2, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q12",
    text: "相手が「別に気にしてないよ」と言っているが、顔色は少し曇っている。あなたは？",
    category: "empathy",
    options: [
      {
        label: "「本当に気にしてない？」ともう一度聞く",
        scores: { communication: 2, selfAwareness: 1, empathy: 3, initiative: 2, mentalStability: 1 },
      },
      {
        label: "言葉通りに受け取って、話題を変える",
        scores: { communication: 1, selfAwareness: 0, empathy: 0, initiative: 1, mentalStability: 2 },
      },
      {
        label: "「気にしてないわけないよね」と直接指摘する",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 2, mentalStability: 1 },
      },
      {
        label: "その場は流して、少し時間を置いてから「さっきのこと、ちゃんと話そう」と言う",
        scores: { communication: 3, selfAwareness: 1, empathy: 3, initiative: 2, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q13",
    text: "相手が楽しそうに話しているとき、あなたは？",
    category: "empathy",
    options: [
      {
        label: "内容より相手の表情や声のトーンをよく見ている",
        scores: { communication: 2, selfAwareness: 1, empathy: 3, initiative: 1, mentalStability: 2 },
      },
      {
        label: "話の内容に集中して聞いている",
        scores: { communication: 2, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 2 },
      },
      {
        label: "自分が話す番を待ちながら聞いている",
        scores: { communication: 1, selfAwareness: 0, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "相手のテンションが伝わってきて、自分も楽しくなってくる",
        scores: { communication: 2, selfAwareness: 0, empathy: 2, initiative: 1, mentalStability: 3 },
      },
    ],
  },
  {
    id: "q14",
    text: "相手が怒ったり傷ついたりしているとき、まず何をしようとする？",
    category: "empathy",
    options: [
      {
        label: "なぜそうなったか原因を一緒に考えようとする",
        scores: { communication: 2, selfAwareness: 1, empathy: 2, initiative: 2, mentalStability: 2 },
      },
      {
        label: "ただそばにいて、話を聞く",
        scores: { communication: 2, selfAwareness: 0, empathy: 3, initiative: 1, mentalStability: 2 },
      },
      {
        label: "「大丈夫だよ」と早く安心させようとする",
        scores: { communication: 1, selfAwareness: 0, empathy: 1, initiative: 2, mentalStability: 2 },
      },
      {
        label: "どうすればいいかわからなくて、戸惑ってしまう",
        scores: { communication: 0, selfAwareness: 0, empathy: 1, initiative: 0, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q15",
    text: "相手の好みや口ぐせ・苦手なものを、会話の中から自然に覚えていますか？",
    category: "empathy",
    options: [
      {
        label: "よく覚えている（好きな食べ物・口ぐせ・苦手なことなど細かいことまで）",
        scores: { communication: 2, selfAwareness: 1, empathy: 3, initiative: 1, mentalStability: 2 },
      },
      {
        label: "大事なことは覚えているが、細かいことは忘れがち",
        scores: { communication: 1, selfAwareness: 1, empathy: 2, initiative: 1, mentalStability: 2 },
      },
      {
        label: "あまり意識して覚えようとしていない",
        scores: { communication: 0, selfAwareness: 0, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "覚えているが、それを活かすタイミングを見つけるのが苦手",
        scores: { communication: 1, selfAwareness: 1, empathy: 2, initiative: 0, mentalStability: 1 },
      },
    ],
  },

  // ── 行動力 (Q16-Q20) ─────────────────────────────────────────────────────
  {
    id: "q16",
    text: "好きな人を食事やお出かけに誘うとき、あなたはどうする？",
    category: "initiative",
    options: [
      {
        label: "「今度一緒にご飯行かない？」とシンプルに誘える",
        scores: { communication: 2, selfAwareness: 2, empathy: 1, initiative: 3, mentalStability: 3 },
      },
      {
        label: "LINEで文章を考えてから誘う（直接だと緊張するので）",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 2, mentalStability: 1 },
      },
      {
        label: "相手が誘ってくれるのをひたすら待つ",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "共通の友達を巻き込んでグループで会う機会を作る",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 2, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q17",
    text: "「好きかも」という気持ちが芽生えてから、どのくらいで行動に移す？",
    category: "initiative",
    options: [
      {
        label: "気持ちが固まったら比較的早く動く（数週間〜1ヶ月以内）",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 3, mentalStability: 2 },
      },
      {
        label: "じっくり確認してから動く（2〜3ヶ月くらい）",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "動けないまま時間が過ぎることが多い",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "タイミングが来たら動く、来なければそのまま",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q18",
    text: "告白やはっきりした意思表示について、あなたはどう思う？",
    category: "initiative",
    options: [
      {
        label: "曖昧なままより、はっきりしたほうが双方にとっていいと思う",
        scores: { communication: 2, selfAwareness: 2, empathy: 2, initiative: 3, mentalStability: 3 },
      },
      {
        label: "タイミングと雰囲気が整ったときにする",
        scores: { communication: 2, selfAwareness: 1, empathy: 2, initiative: 2, mentalStability: 2 },
      },
      {
        label: "できれば相手からしてほしい",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "言葉にしなくても、雰囲気で伝わればいいと思う",
        scores: { communication: 1, selfAwareness: 0, empathy: 1, initiative: 1, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q19",
    text: "関係が進展しないまま時間が経っているとき、あなたは？",
    category: "initiative",
    options: [
      {
        label: "自分から「今の関係どうしたい？」と話し合いを持ちかける",
        scores: { communication: 3, selfAwareness: 2, empathy: 2, initiative: 3, mentalStability: 2 },
      },
      {
        label: "もう少し待ってみる",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "諦めて距離を置く方向で考え始める",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "変化が起きるのを期待しながら、同じ状態を続ける",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 0, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q20",
    text: "好きな人への行動で、後悔することが多いのはどちら？",
    category: "initiative",
    options: [
      {
        label: "勇気を出して動いたけど、結果がよくなかったとき",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 3, mentalStability: 2 },
      },
      {
        label: "動けなかったことで、機会を逃したとき",
        scores: { communication: 0, selfAwareness: 2, empathy: 1, initiative: 0, mentalStability: 1 },
      },
      {
        label: "どちらもほぼ同じくらい",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "あまり後悔しない（どちらの判断も自分なりの理由があるので）",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 2, mentalStability: 3 },
      },
    ],
  },

  // ── メンタル安定度 (Q21-Q25) ─────────────────────────────────────────────
  {
    id: "q21",
    text: "好きな人からLINEの返信が来るのが遅いとき、あなたはどう感じる？",
    category: "mentalStability",
    options: [
      {
        label: "「忙しいのかな」と思って、あまり気にしない",
        scores: { communication: 1, selfAwareness: 2, empathy: 2, initiative: 1, mentalStability: 3 },
      },
      {
        label: "少し気になるが、自分のことに集中できる",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "「嫌われたかも」「何かしたかな」と不安になる",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 0 },
      },
      {
        label: "返信がないと、次のメッセージを送りたくなってしまう",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 1, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q22",
    text: "好きな人が異性の友達と仲よくしているのを見たとき、あなたは？",
    category: "mentalStability",
    options: [
      {
        label: "特に気にならない（信頼しているので）",
        scores: { communication: 2, selfAwareness: 2, empathy: 2, initiative: 1, mentalStability: 3 },
      },
      {
        label: "少し気になるが、心の中で留めておける",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "「自分との関係は大丈夫かな」と不安になってしまう",
        scores: { communication: 0, selfAwareness: 1, empathy: 0, initiative: 0, mentalStability: 1 },
      },
      {
        label: "相手に確認したり、その場に混ざろうとしたりする",
        scores: { communication: 1, selfAwareness: 0, empathy: 0, initiative: 2, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q23",
    text: "恋愛中、相手に求める「自分への時間・連絡頻度」はどのくらい？",
    category: "mentalStability",
    options: [
      {
        label: "毎日連絡がなくても平気。週1〜2回会えれば十分",
        scores: { communication: 2, selfAwareness: 2, empathy: 2, initiative: 1, mentalStability: 3 },
      },
      {
        label: "毎日何かしら連絡は取りたい",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "常にそばにいてほしい、頻繁に確認したい",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 1, mentalStability: 0 },
      },
      {
        label: "相手のペースに合わせるので、特に求めすぎない",
        scores: { communication: 2, selfAwareness: 1, empathy: 3, initiative: 0, mentalStability: 2 },
      },
    ],
  },
  {
    id: "q24",
    text: "気持ちが落ち込んだとき、恋愛（好きな人・恋人）はどんな存在？",
    category: "mentalStability",
    options: [
      {
        label: "大切な存在だが、気持ちの回復は自分でなんとかできる",
        scores: { communication: 2, selfAwareness: 3, empathy: 1, initiative: 1, mentalStability: 3 },
      },
      {
        label: "話を聞いてもらうと楽になる（頼れる存在）",
        scores: { communication: 2, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 2 },
      },
      {
        label: "相手に元気づけてもらうことで立ち直れる",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "全部話して、解決してほしい",
        scores: { communication: 0, selfAwareness: 0, empathy: 0, initiative: 1, mentalStability: 0 },
      },
    ],
  },
  {
    id: "q25",
    text: "恋愛と自分の時間（趣味・友人・仕事）のバランスについて、あなたは？",
    category: "mentalStability",
    options: [
      {
        label: "恋愛も大切だが、自分の生活の軸は持っていたい",
        scores: { communication: 2, selfAwareness: 3, empathy: 2, initiative: 2, mentalStability: 3 },
      },
      {
        label: "恋愛が始まると自然と相手中心になってしまいがち",
        scores: { communication: 0, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 1 },
      },
      {
        label: "恋人最優先。それでいいと思っている",
        scores: { communication: 1, selfAwareness: 1, empathy: 1, initiative: 1, mentalStability: 0 },
      },
      {
        label: "なるべく対等に保ちたいが、うまくいかないことが多い",
        scores: { communication: 1, selfAwareness: 2, empathy: 1, initiative: 1, mentalStability: 1 },
      },
    ],
  },
];
