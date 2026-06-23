// 設計根拠:
// ・人見知り度 → 社交不安尺度 (Liebowitz Social Anxiety Scale) + 人見知り研究
// ・ぼっち耐性 → 孤独親和性 (Affiliation for Solitude) + 内向性 (Big Five / NEO-PI-R)
// ・陰の趣味 → オタク趣味・インドア活動への親和性（国内サブカルチャー研究）
// ・群れ苦手度 → 集団回避傾向（スクールカースト研究・保坂亨 2000）
// ・目立ちたくなさ → 自己呈示欲求尺度 逆転項目 + 「空気になりたい」症候群

export type CategoryKey =
  | "hitomishiri"
  | "bocchi"
  | "hobbies"
  | "groupAversion"
  | "invisible";

export interface Scores {
  hitomishiri: number;
  bocchi: number;
  hobbies: number;
  groupAversion: number;
  invisible: number;
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
  // ── 人見知り度 (Q1-Q5) ────────────────────────────────────────────────────
  {
    id: "iq01",
    text: "初対面の人と話すとき、どんな気持ちになる？",
    category: "hitomishiri",
    options: [
      {
        label: "かなり緊張する。何を話せばいいかわからなくなる",
        scores: { hitomishiri: 3, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "少し緊張するが、話してみれば何とかなる",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "特に緊張しない。普通に話せる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "新しい出会いは楽しみ。むしろわくわくする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq02",
    text: "知らない人ばかりのグループイベントに誘われたら？",
    category: "hitomishiri",
    options: [
      {
        label: "極力断る。行っても楽しめないのがわかっている",
        scores: { hitomishiri: 3, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
      {
        label: "気が重いが、頑張って行くこともある",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "特に気にせず行く",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "楽しみに行く。誰でも仲良くなれる自信がある",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq03",
    text: "店員さんや窓口スタッフに話しかけることは？",
    category: "hitomishiri",
    options: [
      {
        label: "かなり勇気がいる。できればセルフで済ませたい",
        scores: { hitomishiri: 3, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 2 },
      },
      {
        label: "少し気を使うが、問題なくできる",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "全く気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "むしろ積極的に話しかける",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq04",
    text: "新しい人が加わったとき、自分から声をかけることは？",
    category: "hitomishiri",
    options: [
      {
        label: "ほぼない。相手から来てくれるまで待つ",
        scores: { hitomishiri: 3, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "タイミングがあれば声をかける",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "自分から声をかけることが多い",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "積極的に歓迎する。自分がリードして打ち解けようとする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq05",
    text: "電話をかけることに対して、どう感じる？",
    category: "hitomishiri",
    options: [
      {
        label: "かなり苦手。LINEやメールで済むならそうする",
        scores: { hitomishiri: 3, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 2 },
      },
      {
        label: "できるが、少し気が重い",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "特に気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "テキストよりも電話の方が楽なことも多い",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },

  // ── ぼっち耐性 (Q6-Q10) ──────────────────────────────────────────────────
  {
    id: "iq06",
    text: "一人でご飯を食べることは？",
    category: "bocchi",
    options: [
      {
        label: "全然平気。むしろ一人の方が落ち着く",
        scores: { hitomishiri: 0, bocchi: 3, hobbies: 1, groupAversion: 1, invisible: 1 },
      },
      {
        label: "気にしないが、一人のときは早めに終わらせる",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "できれば誰かと一緒がいい",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "一人はさみしい。誰かを誘う",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq07",
    text: "週末に予定が何もないとき、どう感じる？",
    category: "bocchi",
    options: [
      {
        label: "最高。ゆっくりできると思ってむしろテンションが上がる",
        scores: { hitomishiri: 0, bocchi: 3, hobbies: 2, groupAversion: 2, invisible: 1 },
      },
      {
        label: "まあいいか。一人でも充実できる",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 1, groupAversion: 1, invisible: 1 },
      },
      {
        label: "少し暇だが、特に問題ない",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "誰かを誘う。予定がないのは耐えられない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq08",
    text: "一人旅・一人映画館・一人カラオケなどは？",
    category: "bocchi",
    options: [
      {
        label: "普通にする。むしろ好き",
        scores: { hitomishiri: 0, bocchi: 3, hobbies: 1, groupAversion: 1, invisible: 2 },
      },
      {
        label: "できるが、どちらかというと一緒の方が好き",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "あまりしない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "一人では楽しめない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq09",
    text: "人と長時間一緒にいると、疲れを感じる？",
    category: "bocchi",
    options: [
      {
        label: "かなり疲れる。一人の時間でエネルギーを回復する",
        scores: { hitomishiri: 0, bocchi: 3, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "少し疲れることはある",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "あまり感じない",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "人といる方がむしろ元気になる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq10",
    text: "友達からのLINEに対して、どう感じることが多い？",
    category: "bocchi",
    options: [
      {
        label: "内容によっては気が重くなる。返信を後回しにすることがある",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "タイミングを見て返す",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "だいたいすぐ返す",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "既読したらすぐ返す。テンポよいやりとりが好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },

  // ── 陰の趣味 (Q11-Q15) ────────────────────────────────────────────────────
  {
    id: "iq11",
    text: "休日の典型的な過ごし方は？",
    category: "hobbies",
    options: [
      {
        label: "家でゲーム・アニメ・漫画・読書などインドア活動",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 3, groupAversion: 2, invisible: 1 },
      },
      {
        label: "家でのんびりしつつ、たまに外出もする",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 1, groupAversion: 1, invisible: 0 },
      },
      {
        label: "外に出て友達と遊ぶ",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "積極的に色々なイベントや外出に参加する",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq12",
    text: "趣味として近いものは？（最も当てはまるもの）",
    category: "hobbies",
    options: [
      {
        label: "ゲーム・アニメ・漫画・同人・鉄道・音楽鑑賞など",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 3, groupAversion: 1, invisible: 1 },
      },
      {
        label: "読書・映画・料理・プログラミングなどのインドア趣味",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 2, groupAversion: 0, invisible: 0 },
      },
      {
        label: "スポーツ・アウトドアなど外向きな趣味",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "特定の趣味がない or 飲み会・旅行などアウトドア系",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq13",
    text: "「深夜に一人でコンビニに行く」という行動について",
    category: "hobbies",
    options: [
      {
        label: "むしろ好きな時間。静かで人が少なくて落ち着く",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 1, groupAversion: 2, invisible: 2 },
      },
      {
        label: "たまにある",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "夜はあまり出ない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "深夜でも誰かと出かける方が好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq14",
    text: "好きなゲームや作品にハマったとき、どうなる？",
    category: "hobbies",
    options: [
      {
        label: "寝食を忘れてのめり込む。誰かに話したくて仕方なくなる",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 3, groupAversion: 1, invisible: 1 },
      },
      {
        label: "かなりのめり込む",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 2, groupAversion: 0, invisible: 0 },
      },
      {
        label: "楽しむが、そこまでのめり込まない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "のめり込むタイプではない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq15",
    text: "SNSの使い方として近いのは？",
    category: "hobbies",
    options: [
      {
        label: "見る専門（ROM専）。自分からはほとんど発信しない",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 1, groupAversion: 1, invisible: 3 },
      },
      {
        label: "フォローはするが、投稿はたまにしかしない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 2 },
      },
      {
        label: "普通に使う。投稿もする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "積極的に発信・交流する",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },

  // ── 群れ苦手度 (Q16-Q20) ────────────────────────────────────────────────
  {
    id: "iq16",
    text: "大人数の飲み会やパーティーは？",
    category: "groupAversion",
    options: [
      {
        label: "極力行きたくない。行っても楽しめないとわかっている",
        scores: { hitomishiri: 2, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
      {
        label: "気が重いが、参加することもある",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "まあ楽しめる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "大人数の場が好き。テンションが上がる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq17",
    text: "クラスや職場の「みんな一緒」な雰囲気は？",
    category: "groupAversion",
    options: [
      {
        label: "苦手。流されるのが嫌。一人でいる方が自分らしい",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
      {
        label: "合わせるが、あまり好きではない",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "まあ普通。気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "一体感が好き。みんなで盛り上がるのが楽しい",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq18",
    text: "グループLINEの通知が大量に来ているとき、どう感じる？",
    category: "groupAversion",
    options: [
      {
        label: "正直うんざりする。通知オフにしていることもある",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
      {
        label: "少し疲れるが、確認はする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "特に気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "盛り上がって楽しい",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq19",
    text: "グループ作業・共同プロジェクトに取り組むとき、どう感じる？",
    category: "groupAversion",
    options: [
      {
        label: "気を使って疲れる。一人の方が効率いいと思ってしまう",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 1 },
      },
      {
        label: "慣れるまで少し気を使うが、なんとかなる",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "特に気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "みんなで取り組む方が好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq20",
    text: "「スクールカースト」や「陽キャ・陰キャ」の区分けは、自分の生活にあったと思う？",
    category: "groupAversion",
    options: [
      {
        label: "あった。自分は明らかに陰キャ側だった",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 1, groupAversion: 3, invisible: 2 },
      },
      {
        label: "なんとなくあった気がする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "あまり意識しなかった",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "なかった or 自分は陽キャ側だった",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },

  // ── 目立ちたくなさ (Q21-Q25) ────────────────────────────────────────────
  {
    id: "iq21",
    text: "自分に注目が集まる場面（発表・誕生日サプライズなど）は？",
    category: "invisible",
    options: [
      {
        label: "かなり苦手。居心地が悪くて早く終わってほしくなる",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
      {
        label: "少し照れるが、まあ大丈夫",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "特に気にならない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "注目を浴びるのは好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq22",
    text: "自分の服装・髪型などの見た目について",
    category: "invisible",
    options: [
      {
        label: "目立ちたくない。派手なものは避ける",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 3 },
      },
      {
        label: "シンプルが好き。ただ目立ちたくないわけでもない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 2 },
      },
      {
        label: "普通に好きなものを選ぶ",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "おしゃれが好きで、人の目を意識したコーデを楽しむ",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq23",
    text: "大勢の前で自分の意見を発言することは？",
    category: "invisible",
    options: [
      {
        label: "できれば避けたい。当てられると頭が真っ白になる",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
      {
        label: "できるが、進んでする方ではない",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "言いたいことがあれば普通に言える",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "積極的に発言する。むしろ前に出たい",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq24",
    text: "グループの中での自分の立ち位置は？",
    category: "invisible",
    options: [
      {
        label: "空気みたいな存在。いてもいなくても変わらない気がする",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
      {
        label: "大人しいけど、いるのはわかる感じ",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 2 },
      },
      {
        label: "普通。特に意識したことがない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "存在感がある方だと思う",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
  {
    id: "iq25",
    text: "クラスの集合写真や卒業アルバムを見ると、自分は？",
    category: "invisible",
    options: [
      {
        label: "探すのに苦労する位置か、隅の方にいる",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
      {
        label: "普通にいる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "割と目立つところにいる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "中心にいることが多い",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
    ],
  },
];
