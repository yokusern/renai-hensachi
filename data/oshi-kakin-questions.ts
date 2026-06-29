export type OshiKey = "spending" | "expedition" | "collection" | "evangelism" | "depth";

export interface OshiOption {
  label: string;
  scores: Record<OshiKey, number>;
}

export interface OshiQuestion {
  id: string;
  text: string;
  category: OshiKey;
  options: OshiOption[];
}

export const questions: OshiQuestion[] = [
  // ── 課金額 (Q1-Q5) ──
  {
    id: "ok-01",
    text: "推しへの月間課金・グッズ購入の総額は？",
    category: "spending",
    options: [
      { label: "ほぼ0円（課金はしない）", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "1,000〜5,000円程度", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "1〜3万円", scores: { spending: 2, expedition: 0, collection: 1, evangelism: 0, depth: 1 } },
      { label: "5万円以上（いつの間にか…）", scores: { spending: 3, expedition: 0, collection: 2, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-02",
    text: "ガチャ・コラボカフェ・期間限定グッズを前に、どう動く？",
    category: "spending",
    options: [
      { label: "特に気にならない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "気になるが財布と相談する", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "「今だけだから」と買ってしまう", scores: { spending: 2, expedition: 0, collection: 1, evangelism: 0, depth: 1 } },
      { label: "「推しのためなら」と気づいたらカートに入っていた", scores: { spending: 3, expedition: 0, collection: 2, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-03",
    text: "ライブ・現場のチケット、1公演いくらまで出せる？",
    category: "spending",
    options: [
      { label: "定価チケット代のみ", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "少し高めのS席なら", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "転売でも2〜3倍なら", scores: { spending: 2, expedition: 1, collection: 0, evangelism: 0, depth: 1 } },
      { label: "値段を見ずに取れたら即購入", scores: { spending: 3, expedition: 2, collection: 0, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-04",
    text: "推し活の予算はどう決めている？",
    category: "spending",
    options: [
      { label: "余剰費から少し", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "「推し活費」として月に予算を決めている", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "予算はあるが推し関連は予算外になりがち", scores: { spending: 2, expedition: 0, collection: 0, evangelism: 0, depth: 2 } },
      { label: "「推しのためなら」という軸しかなく予算の概念が薄い", scores: { spending: 3, expedition: 0, collection: 0, evangelism: 0, depth: 3 } },
    ],
  },
  {
    id: "ok-05",
    text: "財布の中を見て推しへの支出を振り返ると",
    category: "spending",
    options: [
      { label: "特に問題ない額", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "少し使いすぎたかなと思うことがある", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "かなり使っているが後悔はない", scores: { spending: 2, expedition: 0, collection: 0, evangelism: 0, depth: 2 } },
      { label: "金額を真剣に計算したくない", scores: { spending: 3, expedition: 0, collection: 0, evangelism: 0, depth: 3 } },
    ],
  },
  // ── 遠征力 (Q6-Q10) ──
  {
    id: "ok-06",
    text: "ライブ・現場への遠征、どこまで行く？",
    category: "expedition",
    options: [
      { label: "地元だけ。遠征はしない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "日帰りできる範囲", scores: { spending: 0, expedition: 1, collection: 0, evangelism: 0, depth: 0 } },
      { label: "新幹線・飛行機を使った遠征も行く", scores: { spending: 1, expedition: 2, collection: 0, evangelism: 0, depth: 1 } },
      { label: "国内全都市フォロー＋海外遠征もあり", scores: { spending: 2, expedition: 3, collection: 0, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-07",
    text: "ツアー・連続公演があったとき、何公演入る？",
    category: "expedition",
    options: [
      { label: "地元の1〜2公演", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "2〜3公演", scores: { spending: 0, expedition: 1, collection: 0, evangelism: 0, depth: 0 } },
      { label: "4〜7公演", scores: { spending: 1, expedition: 2, collection: 0, evangelism: 0, depth: 1 } },
      { label: "「全通」か「できるだけ」が基本設定", scores: { spending: 2, expedition: 3, collection: 0, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-08",
    text: "遠征のためにどこまで工夫する？",
    category: "expedition",
    options: [
      { label: "遠征自体あまりしない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "安い交通手段・宿を探す程度", scores: { spending: 0, expedition: 1, collection: 0, evangelism: 0, depth: 0 } },
      { label: "複数公演をまとめてスケジュールを組む", scores: { spending: 1, expedition: 2, collection: 0, evangelism: 0, depth: 1 } },
      { label: "年間の遠征スケジュールがカレンダーに書き込まれている", scores: { spending: 2, expedition: 3, collection: 0, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-09",
    text: "平日に遠征が入ったとき、どうする？",
    category: "expedition",
    options: [
      { label: "諦める", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "有給を検討する", scores: { spending: 0, expedition: 1, collection: 0, evangelism: 0, depth: 0 } },
      { label: "有給を確実に取る", scores: { spending: 0, expedition: 2, collection: 0, evangelism: 0, depth: 1 } },
      { label: "「推しのためなら有給は当然」という認識がある", scores: { spending: 0, expedition: 3, collection: 0, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-10",
    text: "遠征の交通費・宿泊費は1公演いくらかかっている？",
    category: "expedition",
    options: [
      { label: "交通費ほぼゼロ（地元のみ）", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "1〜3万円", scores: { spending: 1, expedition: 1, collection: 0, evangelism: 0, depth: 0 } },
      { label: "3〜8万円", scores: { spending: 2, expedition: 2, collection: 0, evangelism: 0, depth: 0 } },
      { label: "8万円以上（でも行く）", scores: { spending: 3, expedition: 3, collection: 0, evangelism: 0, depth: 1 } },
    ],
  },
  // ── グッズ収集度 (Q11-Q15) ──
  {
    id: "ok-11",
    text: "グッズの収納・管理はどうなっている？",
    category: "collection",
    options: [
      { label: "買わないかほぼ持っていない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "少し集めているが棚に収まっている", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 0 } },
      { label: "部屋の一角がグッズコーナー化している", scores: { spending: 1, expedition: 0, collection: 2, evangelism: 0, depth: 1 } },
      { label: "「コレクション部屋」が存在するか収納に困っている", scores: { spending: 2, expedition: 0, collection: 3, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-12",
    text: "CD・BDなどを複数形態で買うことがある？",
    category: "collection",
    options: [
      { label: "ない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "特に好きなものだけ", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 0 } },
      { label: "通常盤＋限定盤は基本買う", scores: { spending: 1, expedition: 0, collection: 2, evangelism: 0, depth: 1 } },
      { label: "「全形態制覇」が基本方針", scores: { spending: 2, expedition: 0, collection: 3, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-13",
    text: "ランダムグッズ（ブラインドパック）を前にすると？",
    category: "collection",
    options: [
      { label: "買わない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "1個だけ試す", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 0 } },
      { label: "推しが出るまで買う", scores: { spending: 2, expedition: 0, collection: 2, evangelism: 0, depth: 1 } },
      { label: "全種コンプリートするまで買う", scores: { spending: 3, expedition: 0, collection: 3, evangelism: 0, depth: 1 } },
    ],
  },
  {
    id: "ok-14",
    text: "フォトカード・ブロマイドの枚数は？",
    category: "collection",
    options: [
      { label: "ほとんどない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "数枚〜数十枚", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 0 } },
      { label: "数百枚ある", scores: { spending: 1, expedition: 0, collection: 2, evangelism: 0, depth: 1 } },
      { label: "数えていない（数える気が起きない量）", scores: { spending: 2, expedition: 0, collection: 3, evangelism: 0, depth: 2 } },
    ],
  },
  {
    id: "ok-15",
    text: "推しグッズを捨てる・売ることができる？",
    category: "collection",
    options: [
      { label: "使わないものは整理する", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "かなり考えるが手放せるものもある", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 1 } },
      { label: "基本手放せない", scores: { spending: 0, expedition: 0, collection: 2, evangelism: 0, depth: 2 } },
      { label: "「推しを捨てる感覚」になるので絶対無理", scores: { spending: 0, expedition: 0, collection: 3, evangelism: 0, depth: 3 } },
    ],
  },
  // ── 布教力 (Q16-Q20) ──
  {
    id: "ok-16",
    text: "推しのことを話したいとき、どうする？",
    category: "evangelism",
    options: [
      { label: "聞いてくれる人がいたら話す", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "好きな人にはアクティブに話す", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 0 } },
      { label: "未開拓の相手にも「知ってほしくて」話す", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 1 } },
      { label: "全方位に「この人の良さ」を伝えることを使命と感じている", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 3, depth: 2 } },
    ],
  },
  {
    id: "ok-17",
    text: "友達を推しのファンにした経験は？",
    category: "evangelism",
    options: [
      { label: "ない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "自然な流れで好きになった人がいる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 0 } },
      { label: "積極的に薦めて沼に落とした人がいる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 1 } },
      { label: "沼落とし成功人数をカウントしている", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 3, depth: 2 } },
    ],
  },
  {
    id: "ok-18",
    text: "SNSでの推しについての発信は？",
    category: "evangelism",
    options: [
      { label: "ほぼしない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "感想を時々投稿する", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 0 } },
      { label: "定期的に発信している（スクショ・感想・考察など）", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 1 } },
      { label: "毎日何かしら発信していて推し布教アカウントになっている", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 3, depth: 2 } },
    ],
  },
  {
    id: "ok-19",
    text: "推しが出演する媒体・配信を友達に積極的に勧めることがある？",
    category: "evangelism",
    options: [
      { label: "聞かれたら教える程度", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "話の流れで勧めることはある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 0 } },
      { label: "「見てみて！」と積極的に送ることがある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 1 } },
      { label: "未視聴の知人に継続的にプッシュしている", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 3, depth: 1 } },
    ],
  },
  {
    id: "ok-20",
    text: "「この人を推しのファンにしたい」と思った相手がいる？",
    category: "evangelism",
    options: [
      { label: "ない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "一人くらいはいる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 0 } },
      { label: "複数人いる（実際に動いたこともある）", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 1 } },
      { label: "「推しのファン数を増やすこと」が自分の使命の一部に感じる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 3, depth: 2 } },
    ],
  },
  // ── 沼の深さ (Q21-Q25) ──
  {
    id: "ok-21",
    text: "推しへの気持ちを「趣味」と言えるか？",
    category: "depth",
    options: [
      { label: "普通に趣味の一つ", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "大きな趣味ではある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 1 } },
      { label: "「趣味」は少し小さすぎる気がする", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 2 } },
      { label: "推しは「趣味」ではなく「生きがい」「人生の軸」", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 3 } },
    ],
  },
  {
    id: "ok-22",
    text: "推し活をやめたとしたら、どうなると思う？",
    category: "depth",
    options: [
      { label: "別の趣味に移るだけ", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "しばらくロスになるが立ち直れる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 1 } },
      { label: "相当なダメージ。立ち直るのに時間がかかる", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 2 } },
      { label: "想像したくない。「やめる」という選択肢が実感できない", scores: { spending: 0, expedition: 0, collection: 1, evangelism: 0, depth: 3 } },
    ],
  },
  {
    id: "ok-23",
    text: "推しの誕生日や記念日は",
    category: "depth",
    options: [
      { label: "特に何もしない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "ちょっとしたお祝いをする", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 1 } },
      { label: "毎年ちゃんとお祝いのアクションをする", scores: { spending: 1, expedition: 0, collection: 0, evangelism: 1, depth: 2 } },
      { label: "その日のために数ヶ月前から計画を立てる", scores: { spending: 2, expedition: 0, collection: 0, evangelism: 2, depth: 3 } },
    ],
  },
  {
    id: "ok-24",
    text: "推しを知らない人と話していると",
    category: "depth",
    options: [
      { label: "普通に別の話をする", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "推しの話をしたくなることはある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 1 } },
      { label: "「推しって知ってる？」と振ることがある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 1, depth: 2 } },
      { label: "なぜ知らないのか不思議に感じる・教えずにいられない", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 2, depth: 3 } },
    ],
  },
  {
    id: "ok-25",
    text: "推しが活動休止・解散（/降板）したら？",
    category: "depth",
    options: [
      { label: "悲しいが他の推しを探す", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 0 } },
      { label: "かなり落ち込む", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 1 } },
      { label: "しばらく他のことが手につかなくなる", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 2 } },
      { label: "人生設計が崩れる感覚がある", scores: { spending: 0, expedition: 0, collection: 0, evangelism: 0, depth: 3 } },
    ],
  },
];
