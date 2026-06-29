// 5軸:
// immediate    = 即時報酬依存（待てない・倍速・スキップ癖）
// shortVideo   = 短尺中毒（ショート動画無限スクロール）
// multitask    = マルチタスク脳（一つに集中できない）
// boredom      = 退屈耐性のなさ（無刺激に耐えられない）
// rewardReset  = 報酬リセット力不足（刺激なしで満足できない ＝ 高いほど重症）
//
// 高スコア = ドパガキ傾向が強い
// 15問 × 5軸（3問 / 軸）

export type DopaKey = "immediate" | "shortVideo" | "multitask" | "boredom" | "rewardReset";

export interface DopaScores {
  immediate: number;
  shortVideo: number;
  multitask: number;
  boredom: number;
  rewardReset: number;
}

export interface DopaOption {
  label: string;
  scores: DopaScores;
}

export interface DopaQuestion {
  id: string;
  text: string;
  category: DopaKey;
  options: DopaOption[];
}

export const questions: DopaQuestion[] = [
  // ── 即時報酬依存 Q1–Q3 ──────────────────────────────────────────────────────

  {
    id: "dg01",
    text: "動画を見るとき、再生速度はどうしてる？",
    category: "immediate",
    options: [
      {
        label: "等倍でじっくり見る",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "1.5倍速にしがち",
        scores: { immediate: 1, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 0 },
      },
      {
        label: "2倍速＋興味ないとこスキップ",
        scores: { immediate: 2, shortVideo: 1, multitask: 1, boredom: 2, rewardReset: 1 },
      },
      {
        label: "2倍速でも飽きて別のアプリ開いてる",
        scores: { immediate: 3, shortVideo: 2, multitask: 3, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg02",
    text: "欲しいものが翌日配送だと分かったとき",
    category: "immediate",
    options: [
      {
        label: "翌日でも全然大丈夫",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "少し微妙だが普通に注文する",
        scores: { immediate: 1, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "今日中に届かないか調べる",
        scores: { immediate: 2, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 1 },
      },
      {
        label: "即日じゃないなら買う気が失せる",
        scores: { immediate: 3, shortVideo: 0, multitask: 0, boredom: 2, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg03",
    text: "検索して答えが1秒以上出てこないとき",
    category: "immediate",
    options: [
      {
        label: "普通に待てる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "少しイライラするが我慢する",
        scores: { immediate: 1, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 0 },
      },
      {
        label: "リロードするか別タブで開き直す",
        scores: { immediate: 2, shortVideo: 0, multitask: 2, boredom: 2, rewardReset: 1 },
      },
      {
        label: "もう別アプリで調べてる",
        scores: { immediate: 3, shortVideo: 0, multitask: 2, boredom: 3, rewardReset: 1 },
      },
    ],
  },

  // ── 短尺中毒 Q4–Q6 ─────────────────────────────────────────────────────────

  {
    id: "dg04",
    text: "TikTok / Reels / YouTubeショートを開いたとき",
    category: "shortVideo",
    options: [
      {
        label: "見たい動画だけ探してすぐ閉じる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "気づいたら30分経ってた",
        scores: { immediate: 1, shortVideo: 2, multitask: 0, boredom: 1, rewardReset: 1 },
      },
      {
        label: "毎回1時間以上スクロールしてる",
        scores: { immediate: 2, shortVideo: 3, multitask: 0, boredom: 2, rewardReset: 2 },
      },
      {
        label: "開いた瞬間から「無限」状態。止め方がわからない",
        scores: { immediate: 2, shortVideo: 3, multitask: 1, boredom: 3, rewardReset: 3 },
      },
    ],
  },
  {
    id: "dg05",
    text: "10分以上の動画を最後まで見ることが",
    category: "shortVideo",
    options: [
      {
        label: "普通にできる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "途中でながら見になる",
        scores: { immediate: 1, shortVideo: 1, multitask: 2, boredom: 1, rewardReset: 0 },
      },
      {
        label: "半分くらいで別動画を探し始める",
        scores: { immediate: 2, shortVideo: 2, multitask: 0, boredom: 2, rewardReset: 1 },
      },
      {
        label: "10分動画を最後まで見た記憶がない",
        scores: { immediate: 3, shortVideo: 3, multitask: 0, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg06",
    text: "YouTubeのスキップ行動",
    category: "shortVideo",
    options: [
      {
        label: "スキップほとんどしない",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "広告だけスキップ。本編は普通に見る",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "5秒進むボタンを連打してハイライトだけ見る",
        scores: { immediate: 2, shortVideo: 2, multitask: 0, boredom: 2, rewardReset: 1 },
      },
      {
        label: "5秒連打＋倍速でも飽きて、次の動画のサムネだけ見て終わる",
        scores: { immediate: 3, shortVideo: 3, multitask: 0, boredom: 3, rewardReset: 2 },
      },
    ],
  },

  // ── マルチタスク脳 Q7–Q9 ────────────────────────────────────────────────────

  {
    id: "dg07",
    text: "課題・仕事に連続して集中できる時間は？",
    category: "multitask",
    options: [
      {
        label: "2時間は余裕",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "30分が限界。少し休憩が必要",
        scores: { immediate: 0, shortVideo: 0, multitask: 1, boredom: 1, rewardReset: 0 },
      },
      {
        label: "15分ごとに違うことが気になる",
        scores: { immediate: 2, shortVideo: 0, multitask: 2, boredom: 2, rewardReset: 1 },
      },
      {
        label: "5分も経たないうちにSNSかYouTubeを開いてる",
        scores: { immediate: 2, shortVideo: 2, multitask: 3, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg08",
    text: "作業するときのBGMやながら見は？",
    category: "multitask",
    options: [
      {
        label: "集中するときは基本無音",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "音楽だけかけて作業する",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "動画流しながらでないと集中できない",
        scores: { immediate: 1, shortVideo: 1, multitask: 2, boredom: 2, rewardReset: 1 },
      },
      {
        label: "動画＋スマホ＋作業を同時進行しないと落ち着かない",
        scores: { immediate: 2, shortVideo: 2, multitask: 3, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg09",
    text: "長めの文章（500字以上）を読んでいると",
    category: "multitask",
    options: [
      {
        label: "最後まで集中して読める",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "ときどき読み返しながら読める",
        scores: { immediate: 0, shortVideo: 0, multitask: 1, boredom: 0, rewardReset: 0 },
      },
      {
        label: "2〜3行でスクロールしたくなる",
        scores: { immediate: 2, shortVideo: 1, multitask: 2, boredom: 2, rewardReset: 1 },
      },
      {
        label: "最初の1行で「長い」と感じて閉じる",
        scores: { immediate: 3, shortVideo: 2, multitask: 3, boredom: 3, rewardReset: 2 },
      },
    ],
  },

  // ── 退屈耐性のなさ Q10–Q12 ─────────────────────────────────────────────────

  {
    id: "dg10",
    text: "信号待ち（約30秒）のとき",
    category: "boredom",
    options: [
      {
        label: "景色を見たり考え事をして待てる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "少し落ち着かないが待てる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 0 },
      },
      {
        label: "反射的にスマホを取り出す",
        scores: { immediate: 2, shortVideo: 1, multitask: 0, boredom: 2, rewardReset: 1 },
      },
      {
        label: "信号が変わったことに気づかないくらいスマホに集中してる",
        scores: { immediate: 2, shortVideo: 2, multitask: 1, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg11",
    text: "トイレ中にスマホを持っていないとき",
    category: "boredom",
    options: [
      {
        label: "考え事するので全然平気",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "少し退屈。でも取りに行かない",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 0 },
      },
      {
        label: "なんとなく落ち着かない",
        scores: { immediate: 1, shortVideo: 0, multitask: 0, boredom: 2, rewardReset: 1 },
      },
      {
        label: "取りに行く。またはトイレを超特急で終わらせる",
        scores: { immediate: 2, shortVideo: 1, multitask: 0, boredom: 3, rewardReset: 2 },
      },
    ],
  },
  {
    id: "dg12",
    text: "「暇だ」と感じた瞬間、最初にすることは？",
    category: "boredom",
    options: [
      {
        label: "散歩か読書か、ぼーっとする",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "音楽を聴く",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 0 },
      },
      {
        label: "反射的にSNSかYouTubeを開く",
        scores: { immediate: 2, shortVideo: 1, multitask: 0, boredom: 2, rewardReset: 1 },
      },
      {
        label: "「暇」が0.5秒以上続いたことがない（常にスマホで何かしてる）",
        scores: { immediate: 3, shortVideo: 2, multitask: 2, boredom: 3, rewardReset: 3 },
      },
    ],
  },

  // ── 報酬リセット力不足 Q13–Q15 ─────────────────────────────────────────────

  {
    id: "dg13",
    text: "スマホを別の部屋に置いて1時間作業することは",
    category: "rewardReset",
    options: [
      {
        label: "できる。むしろ快適",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "できるが少し気になる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 1 },
      },
      {
        label: "30分超えると不安になって取りに行く",
        scores: { immediate: 1, shortVideo: 0, multitask: 0, boredom: 2, rewardReset: 2 },
      },
      {
        label: "考えただけでストレス。実際には無理",
        scores: { immediate: 2, shortVideo: 0, multitask: 0, boredom: 3, rewardReset: 3 },
      },
    ],
  },
  {
    id: "dg14",
    text: "特に予定のない休日に「何もしない」でいられるか",
    category: "rewardReset",
    options: [
      {
        label: "全然OK。ぼーっとするのが好き",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "30分くらいはいられる",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 1, rewardReset: 1 },
      },
      {
        label: "10分経つと「何かしなきゃ」という気持ちになる",
        scores: { immediate: 1, shortVideo: 1, multitask: 1, boredom: 2, rewardReset: 2 },
      },
      {
        label: "1分も無理。常に何か刺激がないと死にそうになる",
        scores: { immediate: 2, shortVideo: 2, multitask: 2, boredom: 3, rewardReset: 3 },
      },
    ],
  },
  {
    id: "dg15",
    text: "「SNS・YouTube完全断ち」を3日間やるとしたら",
    category: "rewardReset",
    options: [
      {
        label: "余裕。むしろやりたい",
        scores: { immediate: 0, shortVideo: 0, multitask: 0, boredom: 0, rewardReset: 0 },
      },
      {
        label: "きついけど頑張ればできる",
        scores: { immediate: 0, shortVideo: 1, multitask: 0, boredom: 1, rewardReset: 1 },
      },
      {
        label: "3日間は現実的じゃない気がする",
        scores: { immediate: 2, shortVideo: 2, multitask: 1, boredom: 2, rewardReset: 2 },
      },
      {
        label: "1日でも精神的に無理",
        scores: { immediate: 3, shortVideo: 3, multitask: 2, boredom: 3, rewardReset: 3 },
      },
    ],
  },
];
