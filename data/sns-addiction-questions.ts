// 設計根拠:
// ・通知依存 → Bergen Social Media Addiction Scale (Andreassen et al., 2012)
// ・承認欲求 → Social Media Disorder Scale (van den Eijnden et al., 2016)
// ・FOMO → Fear of Missing Out Scale (Przybylski et al., 2013)
// ・時間溶解 → Problematic Internet Use (Davis, 2001) + Smartphone Addiction Scale (Kwon et al., 2013)
// ・離脱不安 → Smartphone Addiction Scale (Kwon et al., 2013) 離脱下位尺度
//
// 高スコア = SNS中毒傾向が強い
// 偏差値計算: totalNorm * 0.56 + 22（他テストと同一式）

export type CategoryKey =
  | "notification"
  | "validation"
  | "fomo"
  | "timeDissolve"
  | "withdrawalAnxiety";

export interface Scores {
  notification: number;
  validation: number;
  fomo: number;
  timeDissolve: number;
  withdrawalAnxiety: number;
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
  // ── 通知依存 (Q1–Q5) ────────────────────────────────────────────────────────

  {
    id: "sa01",
    text: "朝起きて最初にすることは？",
    category: "notification",
    options: [
      {
        label: "カーテンを開ける",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "時計を見る",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "X / Instagramを開く",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "通知を全部消化するまで布団から出ない",
        scores: { notification: 3, validation: 2, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 2 },
      },
    ],
  },

  {
    id: "sa02",
    text: "スマホの通知音が鳴ったとき、どうする？",
    category: "notification",
    options: [
      {
        label: "後で確認する。今は集中中",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "一区切りしたら見る",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "気になるので3分以内に確認する",
        scores: { notification: 2, validation: 1, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 1 },
      },
      {
        label: "0.3秒で手が伸びる（体が反応する）",
        scores: { notification: 3, validation: 1, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 2 },
      },
    ],
  },

  {
    id: "sa03",
    text: "未読バッジ（アプリの赤い数字）が残っていると？",
    category: "notification",
    options: [
      {
        label: "全く気にならない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "余裕のあるときにまとめて消す",
        scores: { notification: 1, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "気になるが我慢できる",
        scores: { notification: 2, validation: 1, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "全部ゼロにしないと落ち着かない",
        scores: { notification: 3, validation: 2, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
    ],
  },

  {
    id: "sa04",
    text: "スマホを別の部屋に置いたまま1時間作業できる？",
    category: "notification",
    options: [
      {
        label: "余裕。よくやってる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "できる。少し気になる程度",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "「確認するだけ」と言い訳して何度か見に行く",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
      {
        label: "10分が限界。何か来てる気がして集中できない",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa05",
    text: "通知を1日オフにして過ごしたことがある？",
    category: "notification",
    options: [
      {
        label: "普通にやる。むしろ快適",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "たまにやる",
        scores: { notification: 1, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "一度試したが不安で途中でオンに戻した",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 2 },
      },
      {
        label: "考えたこともない。通知は空気みたいなもの",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 1, withdrawalAnxiety: 3 },
      },
    ],
  },

  // ── 承認欲求 (Q6–Q10) ───────────────────────────────────────────────────────

  {
    id: "sa06",
    text: "投稿した後の最初の1時間、いいね確認は何回する？",
    category: "validation",
    options: [
      {
        label: "見ない。どうせ後でわかる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "1〜2回",
        scores: { notification: 1, validation: 1, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "5〜10回",
        scores: { notification: 2, validation: 2, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "通知が来るたびに確認。画面を何度も開いてる",
        scores: { notification: 3, validation: 3, fomo: 1, timeDissolve: 2, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa07",
    text: "いいねやインプレッションが少なかったとき、気分は？",
    category: "validation",
    options: [
      {
        label: "全然気にならない。見せたい人に見せた",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "少し残念だが、すぐ忘れる",
        scores: { notification: 0, validation: 1, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "削除するか迷う",
        scores: { notification: 1, validation: 2, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "その日ずっと引きずる / 既に削除したことがある",
        scores: { notification: 1, validation: 3, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
    ],
  },

  {
    id: "sa08",
    text: "フォロワー数を最後に確認したのはいつ？",
    category: "validation",
    options: [
      {
        label: "数ヶ月前。気にしていない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "先週くらい",
        scores: { notification: 0, validation: 1, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "昨日",
        scores: { notification: 1, validation: 2, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "今日（定期チェックしている）",
        scores: { notification: 2, validation: 3, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
    ],
  },

  {
    id: "sa09",
    text: "「いいね0件」の投稿をそのまま残せる？",
    category: "validation",
    options: [
      {
        label: "普通に残せる。反応は関係ない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "残せるが、少し気になる",
        scores: { notification: 0, validation: 1, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "数日後に削除するかもしれない",
        scores: { notification: 1, validation: 2, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "無反応が恥ずかしくてすぐ消す / 下書きのまま投稿できない",
        scores: { notification: 1, validation: 3, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa10",
    text: "フォロワー1000人のアカウントと10人のアカウント、意見の重みは？",
    category: "validation",
    options: [
      {
        label: "全く関係ない。内容で判断する",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "気にしないようにしているが、少し影響される",
        scores: { notification: 0, validation: 1, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "フォロワーが多いほうが信憑性を感じてしまう",
        scores: { notification: 0, validation: 2, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "フォロワーが少ない人の発言は信用しにくい",
        scores: { notification: 0, validation: 3, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
    ],
  },

  // ── FOMO（見逃し恐怖）(Q11–Q15) ────────────────────────────────────────────

  {
    id: "sa11",
    text: "TLを見ないまま6時間が経ったとき、どう感じる？",
    category: "fomo",
    options: [
      {
        label: "何も感じない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "気になるが、後でまとめて見ればいい",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "何か重要なことを見逃した気がして焦る",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
      {
        label: "「話題に乗り遅れた？」と不安で、すぐ遡る",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa12",
    text: "友達が「昨日のあのバズった動画さ〜」と言ってきた。知らなかったら？",
    category: "fomo",
    options: [
      {
        label: "「見てないや」で流せる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "後で検索しようと思う",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "「なんで知らなかったんだろう」と少し焦る",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "「乗り遅れた感」が気になって、その場でスマホを開く",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa13",
    text: "トレンドを調べ始めたら、気づいたら何時間も経っていた経験は？",
    category: "fomo",
    options: [
      {
        label: "ない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "たまにある",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "よくある",
        scores: { notification: 1, validation: 0, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 0 },
      },
      {
        label: "毎日のようにある",
        scores: { notification: 1, validation: 1, fomo: 3, timeDissolve: 3, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa14",
    text: "SNSを見ていないと「何か損している」気がするか？",
    category: "fomo",
    options: [
      {
        label: "ない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "ないとは言い切れない",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "そう感じることがよくある",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 1 },
      },
      {
        label: "SNSを見ることで「世界とつながっている」安心感がある",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
    ],
  },

  {
    id: "sa15",
    text: "「今日はSNSを見ない」と決めてから実際に守れた？",
    category: "fomo",
    options: [
      {
        label: "普通に守れる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "大体守れる（少しチラ見はした）",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "昼には諦めていた",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
      {
        label: "その日は「決めた」こと自体を忘れていた",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 3, withdrawalAnxiety: 2 },
      },
    ],
  },

  // ── 時間溶解 (Q16–Q20) ──────────────────────────────────────────────────────

  {
    id: "sa16",
    text: "「5分だけSNS見る」が実際にどうなった？",
    category: "timeDissolve",
    options: [
      {
        label: "5分で終わる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "10〜20分になることがある",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "気づいたら1時間",
        scores: { notification: 1, validation: 0, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 0 },
      },
      {
        label: "「5分」は自分の中の方便だとわかっている",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 3, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa17",
    text: "夜「もう寝よう」と思ってからスマホをしまうまで、どのくらいかかる？",
    category: "timeDissolve",
    options: [
      {
        label: "5分以内",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "30分くらい",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "1時間以上かかることがある",
        scores: { notification: 1, validation: 0, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 1 },
      },
      {
        label: "「寝よう」と思った瞬間が、1時間後の自分の出発点になっている",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 3, withdrawalAnxiety: 2 },
      },
    ],
  },

  {
    id: "sa18",
    text: "「10分休憩でSNS見る」→戻るのにどのくらいかかった？",
    category: "timeDissolve",
    options: [
      {
        label: "10分以内に戻れる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "20〜30分になることがある",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "1時間になることがよくある",
        scores: { notification: 1, validation: 0, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 0 },
      },
      {
        label: "「休憩」が本番で、作業が「休憩」になっている",
        scores: { notification: 1, validation: 1, fomo: 3, timeDissolve: 3, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa19",
    text: "「やばい、時間がない」と思いつつもSNSが止められなかった経験は？",
    category: "timeDissolve",
    options: [
      {
        label: "ない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "たまにある",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 0 },
      },
      {
        label: "よくある",
        scores: { notification: 1, validation: 1, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 1 },
      },
      {
        label: "そのパターンが自分の日常",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 3, withdrawalAnxiety: 1 },
      },
    ],
  },

  {
    id: "sa20",
    text: "「何もせず15分ぼーっとする」ことができる？",
    category: "timeDissolve",
    options: [
      {
        label: "普通にできる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "できるが、手が伸びそうになる",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 1, withdrawalAnxiety: 1 },
      },
      {
        label: "5分くらいで無意識にスマホを開いている",
        scores: { notification: 2, validation: 0, fomo: 2, timeDissolve: 2, withdrawalAnxiety: 2 },
      },
      {
        label: "「何もしない」という状態が怖い",
        scores: { notification: 2, validation: 1, fomo: 3, timeDissolve: 3, withdrawalAnxiety: 3 },
      },
    ],
  },

  // ── 離脱不安 (Q21–Q25) ──────────────────────────────────────────────────────

  {
    id: "sa21",
    text: "スマホを家に忘れて1日外出することになったら？",
    category: "withdrawalAnxiety",
    options: [
      {
        label: "「不便だけどなんとかなる」で切り替えられる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "少し気になるが大丈夫",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "不安が続く。重要な連絡を見逃すかもと思う",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 2 },
      },
      {
        label: "最悪の気分。取りに帰ることを真剣に考える",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 1, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa22",
    text: "旅行で3日間Wi-Fiなし環境になるとしたら？",
    category: "withdrawalAnxiety",
    options: [
      {
        label: "ちょうどいいデジタルデトックスになる",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "少し不便だが楽しめる",
        scores: { notification: 0, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "「帰ったら何件たまってるんだろう」が気になる",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 2 },
      },
      {
        label: "モバイルデータを最優先で確保する / その旅行先は選ばない",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 1, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa23",
    text: "充電が10%を切ったとき、気持ちは？",
    category: "withdrawalAnxiety",
    options: [
      {
        label: "充電器を探すけど焦りはない",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "少し焦るが大丈夫",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "強めの焦りを感じる。使用を制限し始める",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 0, withdrawalAnxiety: 2 },
      },
      {
        label: "「電池が死ぬ」に近い感覚で全力でコンセントを探す",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 1, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa24",
    text: "「今日はスマホなし」を宣言されたら（緊急連絡用の手段は別途あり）？",
    category: "withdrawalAnxiety",
    options: [
      {
        label: "全然OK。むしろ清々しそう",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "まあ大丈夫。慣れれば平気そう",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "1日は耐えられるが、かなりキツい",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
      {
        label: "現実的に難しい理由をすぐ3つ思いつく",
        scores: { notification: 3, validation: 2, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 3 },
      },
    ],
  },

  {
    id: "sa25",
    text: "最後に「SNSをチェックせずに2時間連続で過ごした」のはいつ？",
    category: "withdrawalAnxiety",
    options: [
      {
        label: "今週（普通にある）",
        scores: { notification: 0, validation: 0, fomo: 0, timeDissolve: 0, withdrawalAnxiety: 0 },
      },
      {
        label: "先週くらい",
        scores: { notification: 1, validation: 0, fomo: 1, timeDissolve: 0, withdrawalAnxiety: 1 },
      },
      {
        label: "1ヶ月以上前",
        scores: { notification: 2, validation: 1, fomo: 2, timeDissolve: 1, withdrawalAnxiety: 2 },
      },
      {
        label: "記憶にない",
        scores: { notification: 3, validation: 1, fomo: 3, timeDissolve: 2, withdrawalAnxiety: 3 },
      },
    ],
  },
];
