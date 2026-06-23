// 設計根拠:
// ・表現力 → Social Skills Inventory (Riggio 1986) — Emotional/Social Expressivity
// ・傾聴力 → Active Listening Scale (Bodie et al. 2012)
// ・場の読み → Self-Monitoring Scale (Snyder 1974) + Social Awareness
// ・自己開示力 → Jourard Self-Disclosure Questionnaire + Vulnerability scale
// ・関係維持力 → Relationship Maintenance Behaviors (Stafford & Canary 1991)

export type CategoryKey =
  | "expression"
  | "listening"
  | "awareness"
  | "disclosure"
  | "building";

export interface Scores {
  expression: number;
  listening: number;
  awareness: number;
  disclosure: number;
  building: number;
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

export const questions: Question[] = [
  // ── 表現力 (Q1-Q5) ────────────────────────────────────────────────────────
  {
    id: "cq01",
    text: "「あの映画どうだった？」と友達に聞かれた。どう答える？",
    category: "expression",
    options: [
      {
        label: "どこが良かったか・なぜそう感じたか、具体的に話せる",
        scores: { expression: 3, listening: 1, awareness: 1, disclosure: 2, building: 1 },
      },
      {
        label: "「面白かった！」とシンプルに答える",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "「まあ普通かな…」とぼかしてしまう",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 0 },
      },
      {
        label: "「あなたも見てみて。どう思う？」と相手に振る",
        scores: { expression: 2, listening: 2, awareness: 2, disclosure: 1, building: 2 },
      },
    ],
  },
  {
    id: "cq02",
    text: "自分の考えが相手にうまく伝わらなかったとき、どうする？",
    category: "expression",
    options: [
      {
        label: "別の言い方・例え話に切り替えてもう一度伝える",
        scores: { expression: 3, listening: 2, awareness: 2, disclosure: 2, building: 2 },
      },
      {
        label: "「伝わった？」と確認してから先に進む",
        scores: { expression: 2, listening: 2, awareness: 2, disclosure: 1, building: 2 },
      },
      {
        label: "「まあいいか」とそのまま諦める",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 0 },
      },
      {
        label: "同じ言い方で繰り返し伝えようとする",
        scores: { expression: 1, listening: 0, awareness: 0, disclosure: 1, building: 1 },
      },
    ],
  },
  {
    id: "cq03",
    text: "初対面の人と話すとき、意識することは？",
    category: "expression",
    options: [
      {
        label: "相手が理解しやすい言葉・テンポで話すことを意識する",
        scores: { expression: 3, listening: 2, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "とにかく明るく元気よく話す",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "特に意識しない。自然体でいいと思っている",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 2, building: 1 },
      },
      {
        label: "相手の反応を見ながら、話す量・内容を調整する",
        scores: { expression: 2, listening: 2, awareness: 3, disclosure: 1, building: 2 },
      },
    ],
  },
  {
    id: "cq04",
    text: "プレゼンや意見発表をするとき、あなたは？",
    category: "expression",
    options: [
      {
        label: "ポイントを絞って、論理的に話せる",
        scores: { expression: 3, listening: 1, awareness: 2, disclosure: 2, building: 1 },
      },
      {
        label: "言いたいことはあるのに、話しながらまとまらなくなる",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 1, building: 0 },
      },
      {
        label: "準備すれば問題ない。即興は苦手",
        scores: { expression: 2, listening: 1, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "場の雰囲気に乗って、自然に話せる",
        scores: { expression: 2, listening: 1, awareness: 2, disclosure: 2, building: 2 },
      },
    ],
  },
  {
    id: "cq05",
    text: "「最近どんな気持ち？」と聞かれたとき、どう答える？",
    category: "expression",
    options: [
      {
        label: "今の感情を具体的な言葉で説明できる",
        scores: { expression: 3, listening: 1, awareness: 1, disclosure: 3, building: 2 },
      },
      {
        label: "「まあ普通」「そんな感じ」とだけ返す",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "状況は話せるが、気持ちはぼかしてしまう",
        scores: { expression: 1, listening: 0, awareness: 0, disclosure: 1, building: 1 },
      },
      {
        label: "少し話してから「あなたはどう？」と聞き返す",
        scores: { expression: 2, listening: 2, awareness: 2, disclosure: 2, building: 2 },
      },
    ],
  },

  // ── 傾聴力 (Q6-Q10) ──────────────────────────────────────────────────────
  {
    id: "cq06",
    text: "友達が悩みを相談してきた。どうする？",
    category: "listening",
    options: [
      {
        label: "最後まで話を聞いてから、意見を言う",
        scores: { expression: 1, listening: 3, awareness: 2, disclosure: 1, building: 3 },
      },
      {
        label: "聞きながら解決策を頭の中で考え始める",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "「大変だったね」と共感しながら聞く。解決策は求められたときだけ言う",
        scores: { expression: 2, listening: 3, awareness: 2, disclosure: 1, building: 3 },
      },
      {
        label: "話を聞きながら、似た自分の体験を話したくなる",
        scores: { expression: 1, listening: 1, awareness: 0, disclosure: 2, building: 1 },
      },
    ],
  },
  {
    id: "cq07",
    text: "相手が話しているとき、「自分も話したい」という気持ちになることは？",
    category: "listening",
    options: [
      {
        label: "ほとんどない。相手が話し終わるまで待てる",
        scores: { expression: 1, listening: 3, awareness: 2, disclosure: 1, building: 2 },
      },
      {
        label: "たまにある。きっかけがあると割り込んでしまう",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "よくある。似た話が浮かんだらすぐ言いたくなる",
        scores: { expression: 1, listening: 0, awareness: 0, disclosure: 2, building: 0 },
      },
      {
        label: "意識して抑えているが、内心は早く話したい",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 1, building: 0 },
      },
    ],
  },
  {
    id: "cq08",
    text: "会話のあと、「相手が何を言っていたか」覚えていることが多い？",
    category: "listening",
    options: [
      {
        label: "よく覚えている（細かいことや感情まで）",
        scores: { expression: 1, listening: 3, awareness: 2, disclosure: 1, building: 2 },
      },
      {
        label: "大まかな内容は覚えているが、細かいことは忘れがち",
        scores: { expression: 1, listening: 2, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "会話中は聞いているが、あとですぐ忘れてしまう",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "あまり覚えていない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq09",
    text: "相手の言葉の裏にある「本音」や「気持ち」に気づくことは？",
    category: "listening",
    options: [
      {
        label: "よく気づく。言葉より声のトーン・間から読み取ることが多い",
        scores: { expression: 1, listening: 3, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "気づくことはあるが、確信が持てないことが多い",
        scores: { expression: 1, listening: 2, awareness: 2, disclosure: 1, building: 1 },
      },
      {
        label: "あまり気づかない。言葉通りに受け取りがち",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "気づいても、どう反応すればいいか迷ってしまう",
        scores: { expression: 0, listening: 2, awareness: 2, disclosure: 0, building: 1 },
      },
    ],
  },
  {
    id: "cq10",
    text: "人の話を聞きながら、別のことに意識が飛ぶことはある？",
    category: "listening",
    options: [
      {
        label: "ほとんどない。話にしっかり集中できる",
        scores: { expression: 1, listening: 3, awareness: 1, disclosure: 0, building: 2 },
      },
      {
        label: "たまにある。面白い話には集中できる",
        scores: { expression: 1, listening: 2, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "よくある。長い話は特に集中が続かない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "飛んでいても、質問や相槌でうまくカバーできる",
        scores: { expression: 1, listening: 1, awareness: 2, disclosure: 0, building: 1 },
      },
    ],
  },

  // ── 場の読み (Q11-Q15) ───────────────────────────────────────────────────
  {
    id: "cq11",
    text: "グループの会話で「自分が話すタイミング」はわかる？",
    category: "awareness",
    options: [
      {
        label: "だいたいわかる。流れを見て自然に入れる",
        scores: { expression: 2, listening: 2, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "わかるつもりだが、たまに被ってしまう",
        scores: { expression: 1, listening: 1, awareness: 2, disclosure: 1, building: 1 },
      },
      {
        label: "タイミングがつかめず、話しそびれることが多い",
        scores: { expression: 0, listening: 2, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "「面白いことが言えるか」が気になりすぎて、考えすぎてしまう",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq12",
    text: "初対面のグループに入ったとき、全体の雰囲気を把握するのにどのくらいかかる？",
    category: "awareness",
    options: [
      {
        label: "数分もあれば、誰がどんな人かおおよそわかる",
        scores: { expression: 1, listening: 2, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "1〜2時間くらいあれば",
        scores: { expression: 1, listening: 1, awareness: 2, disclosure: 1, building: 1 },
      },
      {
        label: "かなり時間がかかる、あるいはあまりつかめない",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "雰囲気より、特定の一人に集中して話すことが多い",
        scores: { expression: 1, listening: 2, awareness: 1, disclosure: 1, building: 1 },
      },
    ],
  },
  {
    id: "cq13",
    text: "場の空気が悪くなったとき、あなたはどうする？",
    category: "awareness",
    options: [
      {
        label: "話題を変えたり冗談を挟んで、空気を変えようとする",
        scores: { expression: 2, listening: 1, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "状況を見て、必要なら仲介に入る",
        scores: { expression: 2, listening: 2, awareness: 2, disclosure: 1, building: 3 },
      },
      {
        label: "気づいてはいるが、どうすればいいかわからず静かにしている",
        scores: { expression: 0, listening: 1, awareness: 2, disclosure: 0, building: 0 },
      },
      {
        label: "空気が悪くなっていることに気づかないことが多い",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq14",
    text: "相手の「声のトーン」や「表情」から感情を読み取ることは得意？",
    category: "awareness",
    options: [
      {
        label: "得意。言葉より非言語情報のほうが気になることも多い",
        scores: { expression: 1, listening: 2, awareness: 3, disclosure: 1, building: 2 },
      },
      {
        label: "大きな変化は気づくが、細かいものは見落とすこともある",
        scores: { expression: 1, listening: 1, awareness: 2, disclosure: 1, building: 1 },
      },
      {
        label: "あまり得意ではない。言葉の内容に集中している",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "苦手。気づいても確信が持てない",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq15",
    text: "ウケなかったジョークを言ってしまったとき、どうする？",
    category: "awareness",
    options: [
      {
        label: "すぐ気づいて「まあウケなかったか（笑）」と自分でフォローできる",
        scores: { expression: 3, listening: 1, awareness: 3, disclosure: 2, building: 2 },
      },
      {
        label: "気づいて焦るが、フォローできずそのまま流れる",
        scores: { expression: 0, listening: 1, awareness: 2, disclosure: 0, building: 1 },
      },
      {
        label: "あまり気づかないことが多い",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "引きずって、しばらく発言できなくなる",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 0, building: 0 },
      },
    ],
  },

  // ── 自己開示力 (Q16-Q20) ────────────────────────────────────────────────
  {
    id: "cq16",
    text: "新しく知り合った人に、趣味や好きなものを話すのはいつごろから？",
    category: "disclosure",
    options: [
      {
        label: "最初の会話から自然に話せる",
        scores: { expression: 2, listening: 1, awareness: 1, disclosure: 3, building: 2 },
      },
      {
        label: "2〜3回会って打ち解けてから",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 2, building: 1 },
      },
      {
        label: "相手が先に話してくれたら、自分も話す",
        scores: { expression: 1, listening: 2, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "親しくなるまでは話したくない",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq17",
    text: "自分の「失敗談」や「恥ずかしかった話」を人に話すことはある？",
    category: "disclosure",
    options: [
      {
        label: "笑い話として積極的に話せる",
        scores: { expression: 2, listening: 0, awareness: 1, disclosure: 3, building: 2 },
      },
      {
        label: "親しい人には話せる",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 2, building: 2 },
      },
      {
        label: "話すのは少し恥ずかしいが、できなくはない",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "基本的に話したくない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq18",
    text: "本当に困ったとき、人に助けを求めることができる？",
    category: "disclosure",
    options: [
      {
        label: "自分でできる限りやって、無理なら迷わず頼れる",
        scores: { expression: 2, listening: 1, awareness: 1, disclosure: 3, building: 3 },
      },
      {
        label: "頼りたいが、迷惑をかけると思ってためらう",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "相手から「大丈夫？」と聞かれたら話す",
        scores: { expression: 1, listening: 1, awareness: 1, disclosure: 2, building: 1 },
      },
      {
        label: "基本的に自分一人でなんとかしようとする",
        scores: { expression: 1, listening: 0, awareness: 0, disclosure: 0, building: 1 },
      },
    ],
  },
  {
    id: "cq19",
    text: "自分の苦手なこと・弱い部分を相手に伝えることができる？",
    category: "disclosure",
    options: [
      {
        label: "必要なら素直に伝えられる。弱みを見せることを怖れない",
        scores: { expression: 2, listening: 0, awareness: 1, disclosure: 3, building: 3 },
      },
      {
        label: "信頼できる人には伝えられる",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 2, building: 2 },
      },
      {
        label: "伝えたいが、どう思われるか気になってしまう",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "あまり人には言いたくない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq20",
    text: "「最近どう？」と聞かれたとき、どう答えることが多い？",
    category: "disclosure",
    options: [
      {
        label: "「実は最近〇〇があって…」と具体的な近況を話す",
        scores: { expression: 2, listening: 0, awareness: 1, disclosure: 3, building: 2 },
      },
      {
        label: "「まあ普通かな」と短く返す",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
      {
        label: "良いことは話せるが、悩んでいることは話しにくい",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 1, building: 1 },
      },
      {
        label: "「そっちはどう？」と逆に聞き返す",
        scores: { expression: 1, listening: 2, awareness: 2, disclosure: 1, building: 1 },
      },
    ],
  },

  // ── 関係維持力 (Q21-Q25) ────────────────────────────────────────────────
  {
    id: "cq21",
    text: "しばらく連絡が途絶えた友達がいたとき、どうする？",
    category: "building",
    options: [
      {
        label: "「最近どう？」と自分から連絡する",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 2, building: 3 },
      },
      {
        label: "向こうから連絡が来るまで待つ",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "SNSで近況は見ているが、直接は連絡しない",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "気にはなっているが、「忙しいかな」と思って連絡できない",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq22",
    text: "友達との間でちょっとしたトラブルがあったとき、どうする？",
    category: "building",
    options: [
      {
        label: "早めに「あのこと、ちゃんと話したい」と持ちかける",
        scores: { expression: 2, listening: 1, awareness: 1, disclosure: 2, building: 3 },
      },
      {
        label: "相手から言ってくれるまで様子を見る",
        scores: { expression: 0, listening: 1, awareness: 1, disclosure: 0, building: 1 },
      },
      {
        label: "気まずさを感じながら、時間が解決してくれると待つ",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 0 },
      },
      {
        label: "明るく振る舞って、なかったことにしようとする",
        scores: { expression: 1, listening: 0, awareness: 1, disclosure: 0, building: 1 },
      },
    ],
  },
  {
    id: "cq23",
    text: "仲の良い関係を長く保つために、意識してやっていることはある？",
    category: "building",
    options: [
      {
        label: "相手のことを覚えておいて、折に触れて連絡したり気にかけたりする",
        scores: { expression: 1, listening: 2, awareness: 2, disclosure: 1, building: 3 },
      },
      {
        label: "誘われたら必ず行くようにしている",
        scores: { expression: 0, listening: 0, awareness: 1, disclosure: 0, building: 2 },
      },
      {
        label: "特に意識していないが、自然に続いている関係もある",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 1 },
      },
      {
        label: "特に意識していない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
  {
    id: "cq24",
    text: "久しぶりに会う人に、最初にかける言葉として自然なのはどれ？",
    category: "building",
    options: [
      {
        label: "「最近どうしてた？何か変わった？」と近況を聞く",
        scores: { expression: 1, listening: 2, awareness: 1, disclosure: 1, building: 3 },
      },
      {
        label: "「久しぶり！元気してた？」とだけ言う",
        scores: { expression: 1, listening: 0, awareness: 0, disclosure: 0, building: 1 },
      },
      {
        label: "前回の会話の続きや、相手が話していたことに触れる",
        scores: { expression: 2, listening: 3, awareness: 2, disclosure: 1, building: 3 },
      },
      {
        label: "なんと言えばいいか少し迷って、相手に合わせる",
        scores: { expression: 0, listening: 1, awareness: 2, disclosure: 0, building: 1 },
      },
    ],
  },
  {
    id: "cq25",
    text: "自分の周りに「3年以上付き合っている友達」はどのくらいいる？",
    category: "building",
    options: [
      {
        label: "5人以上いる",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 1, building: 3 },
      },
      {
        label: "2〜4人いる",
        scores: { expression: 0, listening: 1, awareness: 0, disclosure: 1, building: 2 },
      },
      {
        label: "1人いるかどうか",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 1 },
      },
      {
        label: "あまりいない",
        scores: { expression: 0, listening: 0, awareness: 0, disclosure: 0, building: 0 },
      },
    ],
  },
];
