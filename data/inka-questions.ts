// 設計根拠:
// ・人見知り度 → Liebowitz Social Anxiety Scale (LSAS) + 人見知り研究（Cheek & Buss 1981）
// ・ぼっち耐性 → 孤独親和性（Burger 1995: Need for Solitude）+ 内向性（Big Five NEO-PI-R）
// ・陰の趣味 → オタク研究・インドア活動親和性（岡田斗司夫）+ 国内サブカルチャー研究
// ・群れ苦手度 → 集団回避傾向（保坂亨 2000・スクールカースト研究）+ 社会的疲弊モデル
// ・目立ちたくなさ → 自己呈示欲求逆転項目 + 「空気になりたい」症候群研究（小此木啓吾）

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
  // ── 人見知り度 (Q1–Q5) ─────────────────────────────────────────────────────
  {
    id: "iq01",
    text: "グループワークのメンバーが決まるとき、あなたは？",
    category: "hitomishiri",
    options: [
      {
        label: "知り合いを見つけて素早く合流する",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "近くの人に「一緒にどうですか」と声をかける",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "目線であちこちにSOSを送り、誰かが来るのを待つ",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "一人余りそうになってから先生に振り分けてもらう",
        scores: { hitomishiri: 3, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 2 },
      },
    ],
  },
  {
    id: "iq02",
    text: "知らない人ばかりの飲み会に誘われた。どう返信する？",
    category: "hitomishiri",
    options: [
      {
        label: "「行く！よろしく！」と即OK",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "「予定確認してから連絡する」と言って、参加者リストを確認する",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "「その日は予定があって〜」と断る（実は何もない）",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "既読して3日後に「ごめん遅くなった、やっぱり難しい」と送る",
        scores: { hitomishiri: 3, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
    ],
  },
  {
    id: "iq03",
    text: "知らない番号から電話がかかってきた。どうする？",
    category: "hitomishiri",
    options: [
      {
        label: "すぐ出る",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "1回無視してから折り返す",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "出ない。Googleで番号を調べてから対応する",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "出ない。連絡はLINEかメールにしてください",
        scores: { hitomishiri: 3, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 2 },
      },
    ],
  },
  {
    id: "iq04",
    text: "授業で突然「隣の人と自己紹介して」と言われた。",
    category: "hitomishiri",
    options: [
      {
        label: "笑顔で「よろしくお願いします！」と手を差し出す",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "少し照れながらも普通にこなせる",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "心拍数が上がりながら、頭の中でセリフをリハーサルする",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "「なんで急に...」と思いながら笑顔を作ってやり過ごす",
        scores: { hitomishiri: 3, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 2 },
      },
    ],
  },
  {
    id: "iq05",
    text: "外で知り合いを見かけたが、相手はまだ気づいていない。",
    category: "hitomishiri",
    options: [
      {
        label: "こちらから声をかける",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "目が合ったら声をかける",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "目線をそらして別のルートを歩く",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "通り過ぎた後、謎の後ろめたさを感じる",
        scores: { hitomishiri: 3, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
    ],
  },

  // ── ぼっち耐性 (Q6–Q10) ────────────────────────────────────────────────────
  {
    id: "iq06",
    text: "大学の学食に1人で入れる？",
    category: "bocchi",
    options: [
      {
        label: "余裕。むしろ気楽",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "入れるが、少し周りの目が気になる",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "できれば誰かと入りたい。1人だと浮いている気がする",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "空きコマは学食を避ける。コンビニで買って人気のない場所で食べる",
        scores: { hitomishiri: 2, bocchi: 3, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
    ],
  },
  {
    id: "iq07",
    text: "何も予定のない土日が丸1日ある。どう過ごす？",
    category: "bocchi",
    options: [
      {
        label: "友達を誘って外に出る",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "家でゲームや映画でまったり。最高の1日",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "SNSを眺めながら「何かしたいが何もしたくない」をループする",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "誰とも連絡せず1日家にいて、それを誰にも言わない",
        scores: { hitomishiri: 1, bocchi: 3, hobbies: 1, groupAversion: 1, invisible: 2 },
      },
    ],
  },
  {
    id: "iq08",
    text: "1人でカラオケに行ったことがある？（または行ける？）",
    category: "bocchi",
    options: [
      {
        label: "よく行く。1人が一番はかどる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "行ったことはある / 行けると思う",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "行けるかもしれないが、考えたことがない",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "「ひとりカラオケ」は自分には縁のない世界",
        scores: { hitomishiri: 0, bocchi: 3, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
    ],
  },
  {
    id: "iq09",
    text: "急に3連休が取れた。1人旅できる？",
    category: "bocchi",
    options: [
      {
        label: "即計画する。1人旅大好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "行けると思う。宿とルートが決まれば動ける",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "全部自分で決めるのが面倒で、結局家にいそう",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "家でいい。旅先でもぼっちになるだけだし",
        scores: { hitomishiri: 1, bocchi: 3, hobbies: 1, groupAversion: 1, invisible: 1 },
      },
    ],
  },
  {
    id: "iq10",
    text: "1人の時間と、人と過ごす時間。どちらが「充電」になる？",
    category: "bocchi",
    options: [
      {
        label: "人と過ごす時間。外に出るほど元気になる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "どちらも同じくらい好き",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "1人の時間が必要。人といると疲れる",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 1, groupAversion: 1, invisible: 1 },
      },
      {
        label: "1人でないと回復しない。人と会った翌日は必ずダウンタイムが必要",
        scores: { hitomishiri: 1, bocchi: 3, hobbies: 1, groupAversion: 2, invisible: 1 },
      },
    ],
  },

  // ── 陰の趣味 (Q11–Q15) ────────────────────────────────────────────────────
  {
    id: "iq11",
    text: "家で1人の夜、何をしていることが多い？",
    category: "hobbies",
    options: [
      {
        label: "誰かとLINEや通話しながら過ごす",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "Netflix・YouTube・アニメを見ている",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "ゲーム・趣味・創作に没頭している",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 2, groupAversion: 0, invisible: 0 },
      },
      {
        label: "「何もしない」がいちばん落ち着く。ボーッとするのが好き",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 3, groupAversion: 1, invisible: 1 },
      },
    ],
  },
  {
    id: "iq12",
    text: "自分の趣味、人に話せる？",
    category: "hobbies",
    options: [
      {
        label: "全部普通に話せる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "大体話せる（少しマニアックなものは隠してる）",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 1 },
      },
      {
        label: "一部は恥ずかしくて話せない",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 2, groupAversion: 0, invisible: 2 },
      },
      {
        label: "趣味が「ウケなさそう」なものばかりで、聞かれたら「特にない」と答える",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 3, groupAversion: 0, invisible: 2 },
      },
    ],
  },
  {
    id: "iq13",
    text: "好きなアニメ・漫画・ゲーム・キャラクターがいる？",
    category: "hobbies",
    options: [
      {
        label: "ない。特定のコンテンツにはまる習慣がない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "ある。でも「推し」というほどではない",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "ある。家ではかなりのめり込んでいる",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 2, groupAversion: 0, invisible: 1 },
      },
      {
        label: "ある。でも外では話さない。バレたら何か言われそうで怖い",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 3, groupAversion: 0, invisible: 2 },
      },
    ],
  },
  {
    id: "iq14",
    text: "夜11時、部屋で1人。充実していると感じる瞬間は？",
    category: "hobbies",
    options: [
      {
        label: "明日の楽しい予定を考えているとき",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "好きなことに集中しているとき",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "静かに好きなものを見ているとき",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 2, groupAversion: 0, invisible: 1 },
      },
      {
        label: "「今日も誰とも話さなかったけどまあいいか」と思えたとき",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 3, groupAversion: 1, invisible: 2 },
      },
    ],
  },
  {
    id: "iq15",
    text: "頑張った日の帰り道、何でリセットする？",
    category: "hobbies",
    options: [
      {
        label: "友達に電話して話す / 誰かに会いに行く",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "好きな音楽を聴きながら帰る",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "何も考えずに動画やアニメを見る",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 1, groupAversion: 0, invisible: 0 },
      },
      {
        label: "誰とも話さず、静かな自分の空間に帰る",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 2, groupAversion: 1, invisible: 1 },
      },
    ],
  },

  // ── 群れ苦手度 (Q16–Q20) ──────────────────────────────────────────────────
  {
    id: "iq16",
    text: "飲み会の帰り際、「もう一軒行こう！」と声がかかった。",
    category: "groupAversion",
    options: [
      {
        label: "「行く行く！」と喜んで合流する",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "気分次第。楽しければ行く",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "「終電がある...」と言って帰る（まだある）",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "1時間前から「どのタイミングで帰れるか」を計算していた",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 1 },
      },
    ],
  },
  {
    id: "iq17",
    text: "人が多い場所（ショッピングモール、祭り等）に行くと？",
    category: "groupAversion",
    options: [
      {
        label: "テンションが上がる。にぎやかなのが好き",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "特に問題ない。用事があれば行ける",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "疲れる。できれば空いている時間に行きたい",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 0 },
      },
      {
        label: "人が多いとわかったら行かなくなった。用事はネットで完結させる",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 1, groupAversion: 3, invisible: 1 },
      },
    ],
  },
  {
    id: "iq18",
    text: "グループのトークで、自分はどんな立ち位置が多い？",
    category: "groupAversion",
    options: [
      {
        label: "会話の中心・発信側にいることが多い",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "合いの手を入れたり、時々発信したりする",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "誰かが面白いことを言ったらリアクションする側",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "既読はついている。発言頻度が極端に少ない",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 2 },
      },
    ],
  },
  {
    id: "iq19",
    text: "気の合わない人と数時間過ごさないといけない状況。",
    category: "groupAversion",
    options: [
      {
        label: "会話を引っ張って場を持たせられる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "必要な会話はできるが、少し疲れる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "苦手だが、何とか乗り切れる",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 1 },
      },
      {
        label: "帰ってからドッと疲れる。消耗した分は必ず回収が必要",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 1 },
      },
    ],
  },
  {
    id: "iq20",
    text: "旅行や帰省のお土産、何人分買う？",
    category: "groupAversion",
    options: [
      {
        label: "友達が多いのでかなりたくさん（10人以上）",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "仲がいい人を中心に5〜10人分",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 0 },
      },
      {
        label: "「誰に渡すかな」と考えて、結果3〜5人分",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 0 },
      },
      {
        label: "そもそもお土産を渡す相手をあまり持っていない",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 0, groupAversion: 3, invisible: 1 },
      },
    ],
  },

  // ── 目立ちたくなさ (Q21–Q25) ──────────────────────────────────────────────
  {
    id: "iq21",
    text: "授業やゼミで発表の当番が回ってきた。",
    category: "invisible",
    options: [
      {
        label: "準備して臨む。発表は普通にできる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "緊張するけど何とかやり切れる",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "数日前から憂鬱になる。当日は心臓バクバク",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "「指名されませんように」と授業中ずっと思っている",
        scores: { hitomishiri: 3, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
    ],
  },
  {
    id: "iq22",
    text: "人前で間違いを指摘されると？",
    category: "invisible",
    options: [
      {
        label: "「ありがとうございます」と素直に受け取れる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "少し恥ずかしいが、普通に対応できる",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "頭が真っ白になって、その後しばらく引きずる",
        scores: { hitomishiri: 2, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "その場から消えたくなる",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
    ],
  },
  {
    id: "iq23",
    text: "誕生日を盛大に祝われると？",
    category: "invisible",
    options: [
      {
        label: "嬉しい。サプライズも大歓迎",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "少し恥ずかしいが、嬉しい",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "恥ずかしい。こじんまりと祝ってほしい",
        scores: { hitomishiri: 1, bocchi: 0, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "誕生日を知られたくない。祝われると申し訳ない気持ちになる",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 3 },
      },
    ],
  },
  {
    id: "iq24",
    text: "「席を自由に選んでください」と言われたら、どこを選ぶ？",
    category: "invisible",
    options: [
      {
        label: "前の方。見やすいし、存在感を出せる",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "真ん中あたり。適度な位置",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 1 },
      },
      {
        label: "後ろよりの端。誰かに見られる面積が少ない",
        scores: { hitomishiri: 1, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 2 },
      },
      {
        label: "一番後ろの端。存在を最小化できる最善の位置",
        scores: { hitomishiri: 2, bocchi: 1, hobbies: 0, groupAversion: 2, invisible: 3 },
      },
    ],
  },
  {
    id: "iq25",
    text: "大学4年間を振り返って、一番「充実した」と思えそうな記憶は？",
    category: "invisible",
    options: [
      {
        label: "友達と笑いながら騒いだ記憶",
        scores: { hitomishiri: 0, bocchi: 0, hobbies: 0, groupAversion: 0, invisible: 0 },
      },
      {
        label: "少人数で深い会話をした記憶",
        scores: { hitomishiri: 0, bocchi: 1, hobbies: 0, groupAversion: 1, invisible: 1 },
      },
      {
        label: "1人で没頭した研究・趣味・創作の記憶",
        scores: { hitomishiri: 0, bocchi: 2, hobbies: 2, groupAversion: 1, invisible: 1 },
      },
      {
        label: "誰にも見られずに、静かにやりたいことをやれた記憶",
        scores: { hitomishiri: 1, bocchi: 2, hobbies: 2, groupAversion: 2, invisible: 3 },
      },
    ],
  },
];
