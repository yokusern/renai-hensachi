// 設計根拠:
// ・回避力 → Pure Procrastination Scale (Steel 2010) コアアイテム
// ・決断力 → Decisional Procrastination Scale (Mann 1982) + 不決断傾向研究
// ・楽観バイアス → Planning Fallacy (Kahneman & Tversky 1979) + 時間的楽観主義
// ・自己管理力 → Self-Regulation Failure Model (Baumeister 1998) + 誘惑耐性研究
// ・完璧主義 → Perfectionism-Procrastination Link (Slaney 2001 + Frost 1990)
//
// 高スコア = 先延ばし傾向が強い（逆転スコアなし）
// 偏差値計算: totalNorm * 0.56 + 22（inka/jiatama等と同一式）

export type CategoryKey =
  | "avoidance"
  | "decisiveness"
  | "optimism"
  | "selfControl"
  | "perfectionism";

export interface Scores {
  avoidance: number;
  decisiveness: number;
  optimism: number;
  selfControl: number;
  perfectionism: number;
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
  // ── 回避力 (Q1–Q5) ──────────────────────────────────────────────────────────
  {
    id: "sn01",
    text: "明日が締切のレポート、今夜どこにいる？",
    category: "avoidance",
    options: [
      {
        label: "図書館で仕上げている（当然）",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "家でやっているが、進捗30%でYouTubeが開いてしまった",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "「明日の朝4時からやれば余裕」と思って寝ようとしている",
        scores: { avoidance: 2, decisiveness: 0, optimism: 3, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "締切を先生に確認し直している（本当は知っている）",
        scores: { avoidance: 3, decisiveness: 1, optimism: 2, selfControl: 0, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn02",
    text: "「あとでやろうと思っていたこと」が今何個ある？",
    category: "avoidance",
    options: [
      {
        label: "0個。やることはすぐやる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "1〜3個（把握はしている）",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "4〜10個（把握はしている）",
        scores: { avoidance: 2, decisiveness: 1, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "数えたくない（把握もできていない）",
        scores: { avoidance: 3, decisiveness: 1, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn03",
    text: "バイトのシフト提出の連絡、いつ送る？",
    category: "avoidance",
    options: [
      {
        label: "言われた瞬間にすぐ送る",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "締切2日前に送る",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "締切当日の朝に送る",
        scores: { avoidance: 2, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "送り忘れて催促されてから送る",
        scores: { avoidance: 3, decisiveness: 0, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn04",
    text: "「部屋の掃除をしよう」と思ってから実際に始めるまで、どのくらい？",
    category: "avoidance",
    options: [
      {
        label: "その日中",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "数日〜1週間",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "数週間〜1ヶ月",
        scores: { avoidance: 2, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "誰かが来ることになって初めてやる",
        scores: { avoidance: 3, decisiveness: 0, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn05",
    text: "やるべきことが頭にちらついているとき、どうなる？",
    category: "avoidance",
    options: [
      {
        label: "気になるから早く終わらせる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "「あとでやればいい」と思いながら別のことをする",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "罪悪感を感じながらも後回しにする",
        scores: { avoidance: 2, decisiveness: 0, optimism: 0, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "「やらない理由」を探し始める",
        scores: { avoidance: 3, decisiveness: 0, optimism: 1, selfControl: 2, perfectionism: 0 },
      },
    ],
  },

  // ── 決断力 (Q6–Q10) ─────────────────────────────────────────────────────────
  {
    id: "sn06",
    text: "「どれにしようかな」で迷っているとき、何をする？",
    category: "decisiveness",
    options: [
      {
        label: "直感で決める。迷っても大差ない",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "評価軸を作って比較する",
        scores: { avoidance: 0, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "詳しい人に聞くまで決断を保留する",
        scores: { avoidance: 1, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "「後で決めよう」と画面を閉じて、また開くループを繰り返す",
        scores: { avoidance: 2, decisiveness: 3, optimism: 1, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn07",
    text: "やったことのない飲食店、入る？",
    category: "decisiveness",
    options: [
      {
        label: "とりあえず入ってみる。失敗しても経験だ",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "Googleマップで星と口コミをサッと確認してから入る",
        scores: { avoidance: 0, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "口コミをしっかり読んで「行く価値があるか」確認する",
        scores: { avoidance: 1, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "確証が持てずに通り過ぎて、いつものチェーンに入る",
        scores: { avoidance: 2, decisiveness: 3, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
    ],
  },
  {
    id: "sn08",
    text: "欲しいものがあるとき、いつ買う？",
    category: "decisiveness",
    options: [
      {
        label: "必要だと思ったら即買い",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "数日考えて、やっぱり必要ならポチる",
        scores: { avoidance: 0, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "何度もカートに入れたり出したりしてしばらく経ってから買う",
        scores: { avoidance: 1, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "「もう少し安くなるかも」と思いセールを待ち続けて結局買わない",
        scores: { avoidance: 2, decisiveness: 3, optimism: 1, selfControl: 0, perfectionism: 1 },
      },
    ],
  },
  {
    id: "sn09",
    text: "友人への返信、どのくらいで返す？",
    category: "decisiveness",
    options: [
      {
        label: "見たらすぐ返す",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "内容によるが、基本その日中",
        scores: { avoidance: 0, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "返信の内容を考えすぎて後回しになる",
        scores: { avoidance: 1, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "「重要じゃない連絡は保留でいい」と思って忘れる",
        scores: { avoidance: 2, decisiveness: 3, optimism: 1, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn10",
    text: "「やろうと思っていたこと」を思い出したとき、何をする？",
    category: "decisiveness",
    options: [
      {
        label: "すぐやる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "メモして後でやる（ちゃんとやる）",
        scores: { avoidance: 0, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "メモして後でやる（半分くらいしかやらない）",
        scores: { avoidance: 1, decisiveness: 2, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "「ああ、そういえばそれがあった」と思いながら何もしない",
        scores: { avoidance: 3, decisiveness: 3, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
    ],
  },

  // ── 楽観バイアス (Q11–Q15) ──────────────────────────────────────────────────
  {
    id: "sn11",
    text: "試験勉強、いつ始める？",
    category: "optimism",
    options: [
      {
        label: "3週間前から計画的に",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "1週間前からエンジンかかる",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "3日前から焦り始める",
        scores: { avoidance: 2, decisiveness: 0, optimism: 2, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "前日夜から「追い込みは俺の得意技」と言い聞かせながら始める",
        scores: { avoidance: 2, decisiveness: 0, optimism: 3, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn12",
    text: "「30分で終わる」と思った作業、実際には？",
    category: "optimism",
    options: [
      {
        label: "大体30分で終わる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "1〜2時間かかることが多い",
        scores: { avoidance: 0, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "倍以上かかることが多い",
        scores: { avoidance: 0, decisiveness: 0, optimism: 2, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "最後まで終わらなかったことがある",
        scores: { avoidance: 1, decisiveness: 0, optimism: 3, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn13",
    text: "「急いでいないから後でいい」と思って後回しにしたら、緊急になったことがある？",
    category: "optimism",
    options: [
      {
        label: "ない。優先度管理をしている",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "たまにある",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "よくある",
        scores: { avoidance: 2, decisiveness: 0, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "「急いでいないこと」が急になるのが常態化している",
        scores: { avoidance: 3, decisiveness: 1, optimism: 3, selfControl: 1, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn14",
    text: "夏休みの課題・レポート、どこで終わらせた？",
    category: "optimism",
    options: [
      {
        label: "夏休み序盤",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "中盤",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "最後の1週間",
        scores: { avoidance: 2, decisiveness: 0, optimism: 2, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "最後の2日間（提出ギリギリ / 断念した年もある）",
        scores: { avoidance: 3, decisiveness: 0, optimism: 3, selfControl: 2, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn15",
    text: "「これくらいの量、余裕でしょ」と思ったら裏切られた経験は？",
    category: "optimism",
    options: [
      {
        label: "ほぼない。見積もりが正確",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "たまにある",
        scores: { avoidance: 0, decisiveness: 0, optimism: 1, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "よくある",
        scores: { avoidance: 1, decisiveness: 0, optimism: 2, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "「余裕」と口に出した瞬間に呪われているレベル",
        scores: { avoidance: 2, decisiveness: 0, optimism: 3, selfControl: 1, perfectionism: 0 },
      },
    ],
  },

  // ── 自己管理力 (Q16–Q20) ────────────────────────────────────────────────────
  {
    id: "sn16",
    text: "「勉強するぞ」と思ったとき、最初にすること",
    category: "selfControl",
    options: [
      {
        label: "教材を開く",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "机を整理してから始める",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 1, perfectionism: 1 },
      },
      {
        label: "コーヒーを入れて→スマホを置いて→音楽を選んで…（30分後に本番）",
        scores: { avoidance: 1, decisiveness: 1, optimism: 1, selfControl: 2, perfectionism: 1 },
      },
      {
        label: "「あとでまとめてチェック」しようとしてXを1時間見ていた",
        scores: { avoidance: 2, decisiveness: 0, optimism: 1, selfControl: 3, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn17",
    text: "スマホを置いて集中しようとしたとき、どうなる？",
    category: "selfControl",
    options: [
      {
        label: "問題なく集中できる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "少し気になるが、やり始めれば大丈夫",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "10〜20分おきに確認したくなる",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "「通知が来てないか不安」で5分に1回スマホを見ている",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 3, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn18",
    text: "やるべきことの代わりに「関係ないこと」をやっていた経験は？",
    category: "selfControl",
    options: [
      {
        label: "ない。無駄なことはやらない",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "たまにある（机の整理とか）",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 1, perfectionism: 1 },
      },
      {
        label: "よくある（動画見たり、別の調べ物をしたり）",
        scores: { avoidance: 2, decisiveness: 0, optimism: 0, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "「本来やるべきことに比べたらこれは生産的」と謎の正当化をする",
        scores: { avoidance: 3, decisiveness: 0, optimism: 1, selfControl: 3, perfectionism: 1 },
      },
    ],
  },
  {
    id: "sn19",
    text: "「明日の自分に任せよう」と思ったことは？",
    category: "selfControl",
    options: [
      {
        label: "ない。自分でケリをつける",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "たまにある",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "よくある",
        scores: { avoidance: 2, decisiveness: 1, optimism: 2, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "明日の自分も同じことを明後日の自分に任せる",
        scores: { avoidance: 3, decisiveness: 1, optimism: 3, selfControl: 3, perfectionism: 0 },
      },
    ],
  },
  {
    id: "sn20",
    text: "ゲームや動画のやめ時、自分でコントロールできる？",
    category: "selfControl",
    options: [
      {
        label: "できる。決めた時間でやめられる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "大体できる。少しオーバーすることはある",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 1, perfectionism: 0 },
      },
      {
        label: "「あと1本だけ」「あと1話だけ」が数回続く",
        scores: { avoidance: 1, decisiveness: 0, optimism: 1, selfControl: 2, perfectionism: 0 },
      },
      {
        label: "気づいたら3時間経っていた",
        scores: { avoidance: 2, decisiveness: 0, optimism: 2, selfControl: 3, perfectionism: 0 },
      },
    ],
  },

  // ── 完璧主義 (Q21–Q25) ──────────────────────────────────────────────────────
  {
    id: "sn21",
    text: "レポートや文書を提出する前、何度見直す？",
    category: "perfectionism",
    options: [
      {
        label: "1〜2回。大体合っている",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "3〜4回",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "5回以上見直すが、まだ不安",
        scores: { avoidance: 1, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "「完璧にできるまで出さない」と思って締切を過ぎたことがある",
        scores: { avoidance: 2, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 3 },
      },
    ],
  },
  {
    id: "sn22",
    text: "「なんとなく始める」ができる？",
    category: "perfectionism",
    options: [
      {
        label: "できる。動きながら考える派",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "大体できる。ざっくり計画があれば動ける",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "「準備が整ってから」でないと動けない",
        scores: { avoidance: 1, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "完璧な計画が立つまで動けず、時間切れになったことがある",
        scores: { avoidance: 2, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 3 },
      },
    ],
  },
  {
    id: "sn23",
    text: "完成度60%でとりあえず出すことができる？",
    category: "perfectionism",
    options: [
      {
        label: "できる。完璧を求めて遅れるよりいい",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "状況による。重要度が低ければできる",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "苦手。60%では人に見せたくない",
        scores: { avoidance: 1, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "できない。60%のものを出すくらいなら出さない方がいい",
        scores: { avoidance: 2, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 3 },
      },
    ],
  },
  {
    id: "sn24",
    text: "「うまくできるか不安だから」という理由で先延ばしにしたことがある？",
    category: "perfectionism",
    options: [
      {
        label: "ない。やってみないとわからない",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "たまにある",
        scores: { avoidance: 1, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "よくある",
        scores: { avoidance: 2, decisiveness: 1, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "「準備が足りない」が永遠に続いている",
        scores: { avoidance: 3, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 3 },
      },
    ],
  },
  {
    id: "sn25",
    text: "新しいことを始めるとき、どのくらい調べてから動く？",
    category: "perfectionism",
    options: [
      {
        label: "少し調べて動く。動きながら学ぶ",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 0 },
      },
      {
        label: "基本的なことを理解してから動く",
        scores: { avoidance: 0, decisiveness: 0, optimism: 0, selfControl: 0, perfectionism: 1 },
      },
      {
        label: "「これで十分」という確証が持てるまで調べてしまう",
        scores: { avoidance: 1, decisiveness: 2, optimism: 0, selfControl: 0, perfectionism: 2 },
      },
      {
        label: "調べることが目的になって、始めることがゴールでなくなった経験がある",
        scores: { avoidance: 2, decisiveness: 2, optimism: 0, selfControl: 1, perfectionism: 3 },
      },
    ],
  },
];
