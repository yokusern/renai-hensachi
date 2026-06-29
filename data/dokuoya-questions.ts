export type DokuoyaKey = "control" | "conditionalLove" | "guiltTrip" | "selfEsteem" | "codependency";

export interface DokuoyaOption {
  label: string;
  scores: Record<DokuoyaKey, number>;
}

export interface DokuoyaQuestion {
  id: string;
  text: string;
  category: DokuoyaKey;
  options: DokuoyaOption[];
}

export const questions: DokuoyaQuestion[] = [
  // ── 過干渉度 (Q1-Q5) ──
  {
    id: "do-01",
    text: "子どもの頃、友達関係に親が介入することがあった？",
    category: "control",
    options: [
      { label: "ない。自由に選ばせてくれた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまに意見を言われた程度", scores: { control: 1, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "「あの子とは仲良くするな」と言われたことがある", scores: { control: 2, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "友人関係を細かく管理・監視されていた", scores: { control: 3, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 1 } },
    ],
  },
  {
    id: "do-02",
    text: "進路（進学・就職）を選ぶとき、親はどうだった？",
    category: "control",
    options: [
      { label: "自分の意思を尊重してくれた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "意見はあったが最終的には任せてくれた", scores: { control: 1, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "かなり強い意向があり、プレッシャーを感じた", scores: { control: 2, conditionalLove: 1, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "事実上、親の意見が進路を決めていた", scores: { control: 3, conditionalLove: 2, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
    ],
  },
  {
    id: "do-03",
    text: "一人でいる時間・個人の空間に対して、親はどうだった？",
    category: "control",
    options: [
      { label: "しっかり確保させてくれた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "特に気にされなかった", scores: { control: 1, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "「一人でいる」ことを必要以上に心配された", scores: { control: 2, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "「プライバシー」という概念が家になかった", scores: { control: 3, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 1 } },
    ],
  },
  {
    id: "do-04",
    text: "門限・外出・連絡に関するルールは？",
    category: "control",
    options: [
      { label: "年齢相応の自由があった", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し厳しかったが理解できる範囲", scores: { control: 1, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "かなり厳しく、同世代より制限があった", scores: { control: 2, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "常に居場所の把握・逐一連絡が必要だった", scores: { control: 3, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 2 } },
    ],
  },
  {
    id: "do-05",
    text: "自分の部屋にプライバシーがあった？",
    category: "control",
    options: [
      { label: "プライバシーはしっかり守られていた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "基本は守られていたが、たまに無断で入ってきた", scores: { control: 1, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "ノックなし・無断で入ることが普通だった", scores: { control: 2, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "「個人の領域」という概念が親にはなかった", scores: { control: 3, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 1 } },
    ],
  },
  // ── 条件付き愛 (Q6-Q10) ──
  {
    id: "do-06",
    text: "テストや成績によって、親の態度は変わった？",
    category: "conditionalLove",
    options: [
      { label: "変わらなかった", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し機嫌が変わることはあった", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "成績が良ければ褒め、悪ければ明確に態度が悪くなった", scores: { control: 0, conditionalLove: 2, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "成績＝自分への愛情という感覚があった", scores: { control: 0, conditionalLove: 3, guiltTrip: 2, selfEsteem: 2, codependency: 0 } },
    ],
  },
  {
    id: "do-07",
    text: "「親に愛されるために頑張らないといけない」と感じたことがある？",
    category: "conditionalLove",
    options: [
      { label: "ない。無条件に愛されていると感じていた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまに感じることがあった", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "よく感じていた", scores: { control: 0, conditionalLove: 2, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "「良い子でいること」が親の愛を保つ条件だと思っていた", scores: { control: 0, conditionalLove: 3, guiltTrip: 2, selfEsteem: 2, codependency: 1 } },
    ],
  },
  {
    id: "do-08",
    text: "感情を出したり泣いたりすることに対して、親はどうだった？",
    category: "conditionalLove",
    options: [
      { label: "感情を受け止めてくれた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し「泣かないで」と言われることがあった", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "泣いたり感情を出すと怒られることがあった", scores: { control: 0, conditionalLove: 2, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "「感情を出すこと＝弱さ・悪いこと」という雰囲気があった", scores: { control: 0, conditionalLove: 3, guiltTrip: 1, selfEsteem: 2, codependency: 0 } },
    ],
  },
  {
    id: "do-09",
    text: "「良い子」「しっかりした子」であることへのプレッシャーを感じたか？",
    category: "conditionalLove",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し感じることがあった", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "よく感じた", scores: { control: 0, conditionalLove: 2, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "「良い子でいなければいけない」が生活の中心にあった", scores: { control: 1, conditionalLove: 3, guiltTrip: 2, selfEsteem: 2, codependency: 1 } },
    ],
  },
  {
    id: "do-10",
    text: "親の機嫌を「読む」スキルが身についている？",
    category: "conditionalLove",
    options: [
      { label: "そういう必要はなかった", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少しある", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 1 } },
      { label: "かなりある。地雷を避けるために必要だった", scores: { control: 1, conditionalLove: 2, guiltTrip: 1, selfEsteem: 0, codependency: 2 } },
      { label: "「機嫌を読む」ことが生存戦略だった時期がある", scores: { control: 1, conditionalLove: 3, guiltTrip: 2, selfEsteem: 1, codependency: 3 } },
    ],
  },
  // ── 罪悪感の植え付け (Q11-Q15) ──
  {
    id: "do-11",
    text: "「育ててやった」「こんなにしてやったのに」という言葉を言われたことがある？",
    category: "guiltTrip",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまに、特に困ったとき", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "よくある", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 1, codependency: 1 } },
      { label: "口癖のように繰り返されていた", scores: { control: 0, conditionalLove: 2, guiltTrip: 3, selfEsteem: 2, codependency: 2 } },
    ],
  },
  {
    id: "do-12",
    text: "親を心配させることへの罪悪感が強い（あった）？",
    category: "guiltTrip",
    options: [
      { label: "普通の範囲", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し強い", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 0 } },
      { label: "かなり強い。親が悲しむ顔が浮かぶと動けなくなる", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 1, codependency: 2 } },
      { label: "「自分が悪いことをすると親に迷惑がかかる」が行動を制限していた", scores: { control: 0, conditionalLove: 2, guiltTrip: 3, selfEsteem: 2, codependency: 3 } },
    ],
  },
  {
    id: "do-13",
    text: "自分がやりたいことを言い出せなかった経験がある？",
    category: "guiltTrip",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまにある", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "よくある。特に親が反対しそうなことは言い出せなかった", scores: { control: 1, conditionalLove: 1, guiltTrip: 2, selfEsteem: 2, codependency: 0 } },
      { label: "「自分のやりたいこと」を表明することへの強い恐怖がある", scores: { control: 1, conditionalLove: 2, guiltTrip: 3, selfEsteem: 3, codependency: 1 } },
    ],
  },
  {
    id: "do-14",
    text: "家族のために「自分を犠牲にした」と感じた経験がある？",
    category: "guiltTrip",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少しある", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 1 } },
      { label: "よくある", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 1, codependency: 2 } },
      { label: "自分を後回しにすることが当たり前の環境だった", scores: { control: 1, conditionalLove: 1, guiltTrip: 3, selfEsteem: 2, codependency: 3 } },
    ],
  },
  {
    id: "do-15",
    text: "親に怒られたとき、自分が全面的に「悪い」という気持ちになりやすかった？",
    category: "guiltTrip",
    options: [
      { label: "ない。状況をフラットに判断できていた", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまに", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "よくある。「自分のせいだ」が先に来る", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 2, codependency: 0 } },
      { label: "何があっても「自分が悪い」になるのが自動的な反応", scores: { control: 0, conditionalLove: 1, guiltTrip: 3, selfEsteem: 3, codependency: 1 } },
    ],
  },
  // ── 自己肯定感の低さ (Q16-Q20) ──
  {
    id: "do-16",
    text: "「自分はダメだ」「自分には価値がない」という気持ちになりやすいか？",
    category: "selfEsteem",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまになる", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "よくなる", scores: { control: 0, conditionalLove: 1, guiltTrip: 1, selfEsteem: 2, codependency: 0 } },
      { label: "「自分はダメだ」がベースの感覚になっている", scores: { control: 0, conditionalLove: 2, guiltTrip: 2, selfEsteem: 3, codependency: 1 } },
    ],
  },
  {
    id: "do-17",
    text: "褒められたとき、素直に受け取れる？",
    category: "selfEsteem",
    options: [
      { label: "受け取れる。ありがとうと言える", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し照れるが受け取れる", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "「本当かな」「お世辞では」と思ってしまう", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 2, codependency: 0 } },
      { label: "「自分が褒められるはずがない」と感じてしまう", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 3, codependency: 0 } },
    ],
  },
  {
    id: "do-18",
    text: "自分の意見を言うとき、どんな気持ちになる？",
    category: "selfEsteem",
    options: [
      { label: "普通に言える", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し緊張することがある", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "「否定されたら嫌だな」という恐怖がある", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 2, codependency: 0 } },
      { label: "意見を言うことへの強い恐怖・遠慮がある", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 3, codependency: 0 } },
    ],
  },
  {
    id: "do-19",
    text: "自分の「好き」「楽しい」「嫌だ」という感情をすぐ認識できる？",
    category: "selfEsteem",
    options: [
      { label: "はっきり分かる", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "だいたいわかる", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 1, codependency: 0 } },
      { label: "自分の感情がよくわからないことがある", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 2, codependency: 1 } },
      { label: "「自分が何を感じているか」がわからないのが普通の感覚", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 3, codependency: 2 } },
    ],
  },
  {
    id: "do-20",
    text: "他人に「迷惑をかけている」という罪悪感が強い？",
    category: "selfEsteem",
    options: [
      { label: "普通の範囲", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し強い", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 0 } },
      { label: "かなり強い", scores: { control: 0, conditionalLove: 0, guiltTrip: 2, selfEsteem: 2, codependency: 0 } },
      { label: "「自分が存在することで迷惑をかけている」という感覚がある", scores: { control: 0, conditionalLove: 1, guiltTrip: 3, selfEsteem: 3, codependency: 1 } },
    ],
  },
  // ── 共依存度 (Q21-Q25) ──
  {
    id: "do-21",
    text: "親の気持ち・状態を「なんとかしなければ」と感じることがある（あった）？",
    category: "codependency",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまに", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 1 } },
      { label: "よくある。親が不安定だと自分も不安になる", scores: { control: 0, conditionalLove: 1, guiltTrip: 1, selfEsteem: 0, codependency: 2 } },
      { label: "親が安定していないと自分が落ち着かない", scores: { control: 0, conditionalLove: 2, guiltTrip: 2, selfEsteem: 1, codependency: 3 } },
    ],
  },
  {
    id: "do-22",
    text: "親から距離を置くことに罪悪感を感じる？",
    category: "codependency",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し感じる", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 0, codependency: 1 } },
      { label: "よく感じる", scores: { control: 0, conditionalLove: 1, guiltTrip: 2, selfEsteem: 0, codependency: 2 } },
      { label: "「親から離れること＝悪いこと」という感覚がある", scores: { control: 1, conditionalLove: 1, guiltTrip: 3, selfEsteem: 1, codependency: 3 } },
    ],
  },
  {
    id: "do-23",
    text: "親の感情に引きずられて自分の気分が左右される？",
    category: "codependency",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまにある", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 1 } },
      { label: "よくある", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 0, codependency: 2 } },
      { label: "親が機嫌悪いと自分も不安・萎縮する", scores: { control: 0, conditionalLove: 1, guiltTrip: 0, selfEsteem: 1, codependency: 3 } },
    ],
  },
  {
    id: "do-24",
    text: "人を助けること・頼られることを「やめられない」感覚がある？",
    category: "codependency",
    options: [
      { label: "ない", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "少し", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 1 } },
      { label: "頼られると断れない・断ることへの罪悪感が強い", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 2 } },
      { label: "誰かの問題を解決することが自分の存在意義になっている感覚がある", scores: { control: 0, conditionalLove: 0, guiltTrip: 2, selfEsteem: 1, codependency: 3 } },
    ],
  },
  {
    id: "do-25",
    text: "今の人間関係で「与えすぎる・頑張りすぎる」ことがある？",
    category: "codependency",
    options: [
      { label: "ない。バランスが取れている", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 0 } },
      { label: "たまにある", scores: { control: 0, conditionalLove: 0, guiltTrip: 0, selfEsteem: 0, codependency: 1 } },
      { label: "よくある", scores: { control: 0, conditionalLove: 0, guiltTrip: 1, selfEsteem: 1, codependency: 2 } },
      { label: "常に相手に合わせすぎて自分のことが後回しになる", scores: { control: 0, conditionalLove: 0, guiltTrip: 2, selfEsteem: 2, codependency: 3 } },
    ],
  },
];
